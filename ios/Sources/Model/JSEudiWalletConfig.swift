struct JSEudiWalletConfig {
    let trustedReaderCertificates: [Data]
    let userAuthenticationRequired: Bool
    let openId4VpConfig: JSOpenId4VpConfig?
    let openId4VciConfig: JSOpenId4VciConfig?
}

extension JSEudiWalletConfig {
    init(fromJson json: JSONDictionary) throws {
        let trustedReaderCertificatesPem = json["trustedReaderCertificates"] as? [String]
        let trustedReaderCertificates = try trustedReaderCertificatesPem?.map {
            try parseCertDataFromPem(certPem: $0)
        } ?? [Data]()
        
        let openId4VpConfigJson = json["openId4VpConfig"] as? JSONDictionary
        let openId4VpConfig = openId4VpConfigJson != nil ? try JSOpenId4VpConfig(fromJson: openId4VpConfigJson!) : nil
        
        
        let openId4VciConfigJson = json["openId4VciConfig"] as? JSONDictionary
        let openId4VciConfig = openId4VciConfigJson != nil ? try JSOpenId4VciConfig(fromJson: openId4VciConfigJson!) : nil
        
        self.init(
            trustedReaderCertificates: trustedReaderCertificates,
            userAuthenticationRequired: json["userAuthenticationRequired"] as? Bool ?? true,
            openId4VpConfig: openId4VpConfig,
            openId4VciConfig: openId4VciConfig
        )
    }
}
