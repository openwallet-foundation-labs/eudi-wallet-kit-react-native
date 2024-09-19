// Copyright (c) 2024 DSR Corporation, Denver, Colorado.
// https://www.dsr-corporation.com
// SPDX-License-Identifier: Apache-2.0

import EudiWalletKit
import Foundation

struct JSRequestedDocument: Codable {
    let documentId: String
    let docType: String
    let docName: String
    let userAuthentication: Bool
    let docRequest: JSDocumentRequest
}

extension JSRequestedDocument {
    init(fromDocModel model: DocElementsViewModel, withReaderAuth readerAuth: JSReaderAuth) {
        self.init(
            documentId: model.id,
            docType: model.docType,
            docName: model.docType,
            userAuthentication: true,
            docRequest: JSDocumentRequest(
                docType: model.docType,
                requestItems: model.elements.map {
                    JSDocumentItem(namespace: $0.nameSpace, elementIdentifier: $0.elementIdentifier)
                },
                readerAuth: readerAuth
            )
        )
    }
}
