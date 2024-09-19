// Copyright (c) 2024 DSR Corporation, Denver, Colorado.
// https://www.dsr-corporation.com
// SPDX-License-Identifier: Apache-2.0

import EudiWalletKit
import Foundation

struct JSDocumentRequest: Codable {
    let docType: String
    let requestItems: [JSDocumentItem]
    let readerAuth: JSReaderAuth
}

extension JSDocumentRequest {
    init(fromJson json: JSONDictionary) throws {
        guard let docType = json["docType"] as? String else {
            throw RuntimeError.error("Cannot parse 'docType' field")
        }
        
        guard let requestItemsJson = json["requestItems"] as? [JSONDictionary] else {
            throw RuntimeError.error("Cannot parse 'requestItems' field")
        }
        let requestItems = try requestItemsJson.map { try JSDocumentItem(fromJson: $0) }
        
        guard let readerAuthJson = json["readerAuth"] as? JSONDictionary else {
            throw RuntimeError.error("Cannot parse 'readerAuth' field")
        }
        let readerAuth = try JSReaderAuth(fromJson: readerAuthJson)
        
        self.init(
            docType: docType,
            requestItems: requestItems,
            readerAuth: readerAuth
        )
    }
}

struct JSReaderAuth: Codable {
    let readerCommonName: String
    let readerSignIsValid: Bool
    let readerCertificateIsTrusted: Bool
}

extension JSReaderAuth {
    init(fromJson json: JSONDictionary) throws {
        guard let readerCommonName = json["readerCommonName"] as? String else {
            throw RuntimeError.error("Cannot parse 'readerCommonName' field")
        }
        
        guard let readerSignIsValid = json["readerSignIsValid"] as? Bool else {
            throw RuntimeError.error("Cannot parse 'readerSignIsValid' field")
        }
        
        guard let readerCertificateIsTrusted = json["readerCertificateIsTrusted"] as? Bool else {
            throw RuntimeError.error("Cannot parse 'readerCertificateIsTrusted' field")
        }
        
        self.init(
            readerCommonName: readerCommonName,
            readerSignIsValid: readerSignIsValid,
            readerCertificateIsTrusted: readerCertificateIsTrusted
        )
    }
    
    init(fromPresentationSession session: PresentationSession) {
        self.init(
            readerCommonName: session.readerCertIssuer ?? "Unknown verifier",
            readerSignIsValid: session.readerCertIssuerValid ?? false,
            readerCertificateIsTrusted: session.readerCertIssuerValid ?? false
        )
    }
}
