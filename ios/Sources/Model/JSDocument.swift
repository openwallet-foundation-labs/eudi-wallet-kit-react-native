import MdocDataModel18013
import Foundation


struct JSDocument {
    let id: String
    let docType: String
    let name: String
    let createdAt: Int?
    let namespaces: [String]
    let namespacedData: [String: Any]
    
    init(id: String, mdocModel: MdocDecodable) {
        self.id = id
        self.docType = mdocModel.docType
        self.name = mdocModel.title
        // TODO: Find a way to resolve createdAt timestamp
        self.createdAt = nil
        self.namespaces = mdocModel.nameSpaces ?? [String]()
        self.namespacedData = mdocModel.toJson(base64: false)
    }
}
