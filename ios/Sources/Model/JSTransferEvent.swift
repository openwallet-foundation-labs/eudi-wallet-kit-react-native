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
    
    var asProxyEventPayload: JSONDictionary {
        var payload: JSONDictionary = ["type": "Transfer\(String(reflecting: self))"]
        
        switch self {
        case let .QrEngagementReady(qrCodeContent):
            payload.updateValue(qrCodeContent, forKey: "qrCodeContent")
        case let .RequestReceived(requestedDocuments):
            payload.updateValue(requestedDocuments, forKey: "requestedDocuments")
        case let .Error(errorMessage):
            payload.updateValue(errorMessage, forKey: "errorMessage")
        default:
            break
        }
        
        return payload
    }
}
