import EudiWalletKit
import Foundation
import Combine

final class PresentationSessionCoordinator {
    private let _session: PresentationSession
    private let _flowType: FlowType
    
    private var _cancellables = Set<AnyCancellable>()
    
    public init(session: PresentationSession, onSuccess: @escaping () -> Void) {
        self._session = session
        self._flowType = session.presentationService.flow
        
        self._session.$status
            .sink { status in
                switch status {
                case .connected:
                    ProxyEventsModule.sendEvent(event: JSTransferEvent.Connected)
                case .disconnected:
                    ProxyEventsModule.sendEvent(event: JSTransferEvent.Disconnected)
                case .qrEngagementReady:
                    Task {
                        await self.onQREngagementReady()
                    }
                case .requestReceived:
                    Task {
                        await self.onRequestReceived()
                    }
                case .responseSent:
                    ProxyEventsModule.sendEvent(event: JSTransferEvent.ResponseSent)
                    onSuccess()
                case .error:
                    let errorMessage = session.uiError?.errorDescription ?? "Unknown presentation error"
                    ProxyEventsModule.sendEvent(event: JSTransferEvent.Error(errorMessage: errorMessage))
                default:
                    ()
                }
            }
            .store(in: &_cancellables)
    }
    
    public func initialize() async {
        if(self._flowType == .ble) {
            await self._session.startQrEngagement()
        }
        _ = await self._session.receiveRequest()
    }
    
    public func sendResponse(disclosedDocuments: [JSDisclosedDocument], onSuccess: ((URL?) -> Void)?, onCancel: (() -> Void)?) async {
        let itemsToSend = disclosedDocuments.reduce(into: RequestItems()) { items, document in
            items[document.documentId] = document.getNamespacedItems()
        }
        await self._session.sendResponse(userAccepted: true, itemsToSend: itemsToSend)
    }
    
    private func onQREngagementReady() async {
        if(self._flowType != .ble) { return }
        
        guard let deviceEngagement = self._session.deviceEngagement else {
            let errorMessage = self._session.uiError?.errorDescription ?? "Failed to generate QR code"
            ProxyEventsModule.sendEvent(event: JSTransferEvent.Error(errorMessage: errorMessage))
            return
        }
        
        ProxyEventsModule.sendEvent(event: JSTransferEvent.QrEngagementReady(qrCodeContent: deviceEngagement))
    }
    
    private func onRequestReceived() async {
        guard self._session.disclosedDocuments.isEmpty == false else {
            let errorMessage = self._session.uiError?.errorDescription ?? "Cannot find requested documents"
            ProxyEventsModule.sendEvent(event: JSTransferEvent.Error(errorMessage: errorMessage))
            return
        }
        
        let readerAuth = JSReaderAuth(fromPresentationSession: self._session)
        
        let requestedDocuments = self._session.disclosedDocuments.map {
            JSRequestedDocument(fromDocModel: $0, withReaderAuth: readerAuth)
        }
        
        ProxyEventsModule.sendEvent(event: JSTransferEvent.RequestReceived(requestedDocuments: requestedDocuments))
    }
}
