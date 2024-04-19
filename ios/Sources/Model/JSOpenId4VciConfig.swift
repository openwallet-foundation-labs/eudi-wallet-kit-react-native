struct JSOpenId4VciConfig {
    let issuerUrl: String?
    let clientId: String?
    let redirectUri: String?
}

extension JSOpenId4VciConfig {
    init(fromJson json: JSONDictionary) throws {
        self.init(
            issuerUrl: json["issuerUrl"] as? String,
            clientId: json["clientId"] as? String,
            redirectUri: json["redirectUri"] as? String
        )
    }
}

