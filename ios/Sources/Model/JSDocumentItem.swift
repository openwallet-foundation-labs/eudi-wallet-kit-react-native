struct JSDocumentItem {
    let namespace: String
    let elementIdentifier: String
}

extension JSDocumentItem {
    init(fromJson json: JSONDictionary) throws {
        guard let namespace = json["namespace"] as? String else {
            throw RuntimeError.error("Cannot parse 'namespace' field")
        }
        
        guard let elementIdentifier = json["elementIdentifier"] as? String else {
            throw RuntimeError.error("Cannot parse 'elementIdentifier' field")
        }
        
        self.init(namespace: namespace, elementIdentifier: elementIdentifier)
    }
}
