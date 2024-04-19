typealias JSONDictionary = [String: Any?]

enum RuntimeError: Error {
    case error(_ msg: String)
}

func parseCertDataFromPem(certPem: String) throws -> Data {
    let certBase64 = certPem
        .split(separator: "\n")
        .dropFirst()
        .dropLast()
        .joined()
    
    guard let certData = Data(base64Encoded: String(certBase64)) else {
        throw RuntimeError.error("Cannot parse cert data from PEM")
    }
    
    return certData
}
