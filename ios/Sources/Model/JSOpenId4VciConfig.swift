// Copyright (c) 2024 DSR Corporation, Denver, Colorado.
// https://www.dsr-corporation.com
// SPDX-License-Identifier: Apache-2.0

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

