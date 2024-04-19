import EudiWalletKit
import Foundation
import Combine
import os

@objc(EudiWalletModule)
final class WalletModule: NSObject {
    private let _logger = Logger(subsystem: Bundle.main.bundleIdentifier!, category: "EudiWalletModule")
    
    private var _walletInstance: EudiWallet = EudiWallet.standard
    private var _activePresentation: PresentationSessionCoordinator?
    
    @objc(initialize:withResolver:withRejecter:)
    func initialize(_ configJson: NSDictionary,
                    resolve: @escaping RCTPromiseResolveBlock,
                    reject: @escaping RCTPromiseRejectBlock) {
        let configJson = configJson as! JSONDictionary
        
        Task {
            do {
                let config = try JSEudiWalletConfig(fromJson: configJson)
                
                let preregisteredClientIdScheme = config.openId4VpConfig?.clientIdSchemes?.first(where: { $0.type == "Preregistered" })
                let verifierApiUrl = preregisteredClientIdScheme?.preregisteredVerifiers?.first?.verifierApi
                
                self._walletInstance = EudiWallet(
                    storageType: StorageType.keyChain,
                    trustedReaderCertificates: config.trustedReaderCertificates,
                    userAuthenticationRequired: config.userAuthenticationRequired,
                    verifierApiUri: verifierApiUrl,
                    openID4VciIssuerUrl: config.openId4VciConfig?.issuerUrl,
                    openID4VciClientId: config.openId4VciConfig?.clientId,
                    openID4VciRedirectUri: config.openId4VciConfig?.redirectUri
                )
                try await self._walletInstance.loadDocuments()
                
                resolve(nil)
            }
            catch {
                reject("Error on initializing EUDI wallet", error.localizedDescription, error)
            }
        }
    }
    
    @objc(withResolver:withRejecter:)
    func getDocuments(resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        var result = [JSDocument]()
        
        let documentIds = self._walletInstance.storage.documentIds
        let storedModels = self._walletInstance.storage.mdocModels
        
        for (index, storedModel) in storedModels.enumerated() {
            guard let documentId = documentIds[index]
            else {
                self._logger.warning("Document ID for loaded model is null, skipping item...")
                continue
            }
            
            guard let model = storedModel
            else {
                self._logger.warning("Loaded model is null (documentId = \(documentId), skipping item...")
                continue
            }
            
            result.append(JSDocument(id: documentId, mdocModel: model))
        }
        
        resolve(result)
    }
    
    @objc(getDocumentById:withResolver:withRejecter:)
    func getDocumentById(
        _ documentId: NSString,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            let documentId = documentId as String
            
            guard let documentIndex = self._walletInstance.storage.documentIds.firstIndex(of: documentId)
            else {
                self._logger.warning("Cannot find document index to delete (documentId = \(documentId)), returning empty result...")
                resolve(nil)
                return
            }
            
            guard let model = self._walletInstance.storage.getDocumentModel(index: documentIndex)
            else {
                resolve(nil)
                return
            }
            
            resolve(JSDocument(id: documentId, mdocModel: model))
        }
    
    @objc(deleteDocumentById:withResolver:withRejecter:)
    func deleteDocumentById(
        _ documentId: NSString,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            let documentId = documentId as String
            
            Task {
                do {
                    guard let documentIndex = self._walletInstance.storage.documentIds.firstIndex(of: documentId)
                    else {
                        self._logger.warning("Cannot find document index to delete (documentId = \(documentId), skipping...")
                        resolve(nil)
                        return
                    }
                    
                    try await self._walletInstance.storage.deleteDocument(index: documentIndex)
                    resolve(nil)
                }
                catch {
                    reject("Error on deleting document by id", error.localizedDescription, error)
                }
            }
        }
    
    @objc(issueDocument:withResolver:withRejecter:)
    func issueDocument(
        _ docType: NSString,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            let docType = docType as String
            
            Task {
                do {
                    let issuedDocument = try await self._walletInstance.issueDocument(docType: docType)
                    resolve(issuedDocument.id)
                }
                catch {
                    reject("Error on issuing document with type \(docType)", error.localizedDescription, error)
                }
            }
        }
    
    // TODO: Same-device use case (deeplink)
    @objc(startRemotePresentation:)
    func startRemotePresentation(_ url: NSString) {
        self.stopPresentation()
        
        let url = url as String
        let data = url.data(using: .utf8) ?? Data()
        
        let session = self._walletInstance.beginPresentation(flow: .openid4vp(qrCode: data))
        
        let presentationSessionCoordinator = PresentationSessionCoordinator(session: session, onSuccess: {
            self.stopPresentation()
        })
        self._activePresentation = presentationSessionCoordinator
        
        Task {
            await self._activePresentation!.initialize()
        }
    }
    
    @objc(startProximityPresentation)
    func startProximityPresentation() {
        self.stopPresentation()
        
        let session = self._walletInstance.beginPresentation(flow: .ble)
        
        let presentationSessionCoordinator = PresentationSessionCoordinator(session: session, onSuccess: {
            self.stopPresentation()
        })
        self._activePresentation = presentationSessionCoordinator
        
        Task {
            await self._activePresentation!.initialize()
        }
    }
    
    @objc(sendResponse:withResolver:withRejecter:)
    func sendResponse(
        _ disclosedDocumentsData: NSArray,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock)
    {
        let disclosedDocumentsJson = disclosedDocumentsData as! [JSONDictionary]
        
        Task {
            do {
                let disclosedDocuments = try disclosedDocumentsJson.map { try JSDisclosedDocument(fromJson: $0) }
                
                guard self._activePresentation != nil
                else { throw RuntimeError.error("There is no active presentation session") }
                
                await self._activePresentation!.sendResponse(disclosedDocuments: disclosedDocuments, onSuccess: nil, onCancel: nil)
            }
            catch {
                reject("Error on sending presentation response", error.localizedDescription, error)
            }
        }
    }
    
    @objc(stopPresentation)
    func stopPresentation() {
        self._activePresentation = nil
    }
    
    @objc(loadSampleData:withResolver:withRejecter:)
    func loadSampleData(
        _ sampleDataFile: NSString?,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock)
    {
        let sampleDataFiles = sampleDataFile != nil ? [sampleDataFile! as String] : nil
        
        Task {
            do {
                try await self._walletInstance.loadSampleData(sampleDataFiles: sampleDataFiles)
                resolve(nil)
            }
            catch {
                reject("Error on loading sample data", error.localizedDescription, error)
            }
        }
    }
}
