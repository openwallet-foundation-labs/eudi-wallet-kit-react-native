import type { EudiWalletConfig } from './config'
import type { TransferEventListener } from './events'
import type { DisclosedDocument, Document, DocumentOffer, IssueDocumentResult } from './model'

import { NativeModules, Platform } from 'react-native'

import { EudiWalletEventManager } from './EudiWalletEventManager'

const { EudiWalletModule } = NativeModules

export abstract class EudiWallet {
  public static isInitialized: boolean = false

  public static async initialize(config: EudiWalletConfig): Promise<void> {
    await EudiWalletModule.initialize(config)
    EudiWalletEventManager.start()
    this.isInitialized = true
  }

  public static getDocuments(): Promise<Document[]> {
    return EudiWalletModule.getDocuments()
  }

  public static getDocumentById(documentId: string): Promise<Document> {
    return EudiWalletModule.getDocumentById(documentId)
  }

  public static deleteDocumentById(documentId: string): Promise<void> {
    return EudiWalletModule.deleteDocumentById(documentId)
  }

  public static issueDocumentByDocType(docType: string): Promise<IssueDocumentResult> {
    return EudiWalletModule.issueDocumentByDocType(docType)
  }

  public static issueDocumentByOfferUri(offerUri: string): Promise<IssueDocumentResult> {
    return EudiWalletModule.issueDocumentByOfferUri(offerUri)
  }

  public static resolveDocumentOffer(offerUri: string): Promise<DocumentOffer> {
    return EudiWalletModule.resolveDocumentOffer(offerUri)
  }

  public static resumeOpenId4VciWithAuthorization(uri: string) {
    EudiWalletModule.resumeOpenId4VciWithAuthorization(uri)
  }

  public static startRemotePresentation(url: string) {
    EudiWalletModule.startRemotePresentation(url)
  }

  public static startProximityPresentation() {
    EudiWalletModule.startProximityPresentation()
  }

  public static sendResponse(disclosedDocuments: DisclosedDocument[]): Promise<void> {
    return EudiWalletModule.sendResponse(disclosedDocuments)
  }

  public static stopPresentation(
    sendSessionTerminationMessage: boolean = true,
    useTransportSpecificSessionTermination: boolean = false,
  ): void {
    if (Platform.OS === 'android') {
      EudiWalletModule.stopPresentation(sendSessionTerminationMessage, useTransportSpecificSessionTermination)
    } else {
      EudiWalletModule.stopPresentation()
    }
  }

  public static async loadSampleData(sampleDataFile?: string): Promise<void> {
    await EudiWalletModule.loadSampleData(sampleDataFile)
  }

  public static addTransferEventListener(eventListener: TransferEventListener): string {
    return EudiWalletEventManager.addEventListener(eventListener)
  }

  public static removeTransferEventListener(listenerId: string): void {
    EudiWalletEventManager.removeEventListener(listenerId)
  }
}
