// Copyright (c) 2024 DSR Corporation, Denver, Colorado.
// https://www.dsr-corporation.com
// SPDX-License-Identifier: Apache-2.0

struct JSPreregisteredVerifier {
    let clientId: String?
    let verifierApi: String?
    let legalName: String?
}

extension JSPreregisteredVerifier {
    init(fromJson json: JSONDictionary) throws {
        self.init(
            clientId: json["clientId"] as? String, 
            verifierApi: json["verifierApi"] as? String,
            legalName: json["legalName"] as? String
        )
    }
}

struct JSClientIdScheme {
    let type: String
    let preregisteredVerifiers: [JSPreregisteredVerifier]?
}

extension JSClientIdScheme {
    init(fromJson json: JSONDictionary) throws {
        guard let type = json["type"] as? String else {
            throw RuntimeError.error("Cannot parse 'type' field")
        }
        
        var preregisteredVerifiers: [JSPreregisteredVerifier]?
        
        if(type == "Preregistered") {
            guard let preregisteredVerifiersJson = json["preregisteredVerifiers"] as? [JSONDictionary]
            else {
                throw RuntimeError.error("Cannot parse 'preregisteredVerifiers' field")
            }
            
            preregisteredVerifiers = try preregisteredVerifiersJson.map { try JSPreregisteredVerifier(fromJson: $0) }
        }
        
        self.init(
            type: type, 
            preregisteredVerifiers: preregisteredVerifiers
        )
    }
}
