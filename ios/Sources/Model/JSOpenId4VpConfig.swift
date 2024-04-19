struct JSOpenId4VpConfig {
    let scheme: String?
    let encryptionAlgorithms: [String]?
    let encryptionMethods: [String]?
    let clientIdSchemes: [JSClientIdScheme]?
}

extension JSOpenId4VpConfig {
    init(fromJson json: JSONDictionary) throws {
        let clientIdSchemesJson = json["clientIdSchemes"] as? [JSONDictionary]
        let clientIdSchemes = try clientIdSchemesJson?.map { try JSClientIdScheme(fromJson: $0) }
        
        self.init(
            scheme: json["scheme"] as? String,
            encryptionAlgorithms: json["encryptionAlgorithms"] as? [String],
            encryptionMethods: json["encryptionMethods"] as? [String],
            clientIdSchemes: clientIdSchemes
        )
    }
}


