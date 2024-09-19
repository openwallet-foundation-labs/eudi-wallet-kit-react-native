// Copyright (c) 2024 DSR Corporation, Denver, Colorado.
// https://www.dsr-corporation.com
// SPDX-License-Identifier: Apache-2.0

struct CertUtils {
    static func parseCertDataFromPem(certPem: String) throws -> Data {
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
}
