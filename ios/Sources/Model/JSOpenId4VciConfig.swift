struct JSOpenId4VciConfig {
    let issuerUrl: String?
    let clientId: String?
    let authFlowRedirectUri: String?
}

extension JSOpenId4VciConfig {
    init(fromJson json: JSONDictionary) throws {
        self.init(
            issuerUrl: json["issuerUrl"] as? String,
            clientId: json["clientId"] as? String,
            authFlowRedirectUri: json["authFlowRedirectUri"] as? String
        )
    }
}

