import Foundation

enum JSTransferEvent {
    case Connecting
    case Connected
    case Disconnected
    case QrEngagementReady(qrCodeContent: String)
    case RequestReceived(requestedDocuments: [JSRequestedDocument])
    case ResponseSent
    case Error(errorMessage: String)
    case Redirect
    
    var type: String {
        let enumCaseName = Mirror(reflecting: self).children.first?.label ?? "\(self)"
        return "Transfer\(enumCaseName)"
    }
    
    var asProxyEventPayload: JSONDictionary {
        var payload: JSONDictionary = ["type": self.type]
        
        switch self {
        case let .QrEngagementReady(qrCodeContent):
            payload.updateValue(qrCodeContent, forKey: "qrCodeContent")
        case let .RequestReceived(requestedDocuments):
            // TODO: Improve error handling
            payload.updateValue(requestedDocuments.map { try? $0.toDictionary() }, forKey: "requestedDocuments")
        case let .Error(errorMessage):
            payload.updateValue(errorMessage, forKey: "errorMessage")
        default:
            break
        }
        
        return payload
    }
}
