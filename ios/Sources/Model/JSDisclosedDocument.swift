import EudiWalletKit
import Foundation

struct JSDisclosedDocument: Codable {
    let documentId: String
    let docType: String
    let selectedDocItems: [JSDocumentItem]
    let docRequest: JSDocumentRequest
    
    func getNamespacedItems() -> [String: [String]] {
        var namespacedItems = [String: [String]]()
        
        selectedDocItems.forEach {
            var namespaceIdentifiers = namespacedItems[$0.namespace] ?? []
            namespaceIdentifiers.append($0.elementIdentifier)
            namespacedItems.updateValue(namespaceIdentifiers, forKey: $0.namespace)
        }
        
        return namespacedItems
    }
}

extension JSDisclosedDocument {
    init(fromJson json: JSONDictionary) throws {
        guard let documentId = json["documentId"] as? String else {
            throw RuntimeError.error("Cannot parse 'documentId' field")
        }
        
        guard let docType = json["docType"] as? String else {
            throw RuntimeError.error("Cannot parse 'docType' field")
        }
        
        guard let selectedDocItemsJson = json["selectedDocItems"] as? [JSONDictionary] else {
            throw RuntimeError.error("Cannot parse 'selectedDocItems' field")
        }
        let selectedDocItems = try selectedDocItemsJson.map { try JSDocumentItem(fromJson: $0) }
        
        guard let docRequestJson = json["docRequest"] as? JSONDictionary else {
            throw RuntimeError.error("Cannot parse 'docRequest' field")
        }
        let docRequest = try JSDocumentRequest(fromJson: docRequestJson)
        
        self.init(
            documentId: documentId,
            docType: docType,
            selectedDocItems: selectedDocItems,
            docRequest: docRequest
        )
    }
}
