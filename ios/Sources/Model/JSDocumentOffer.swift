// Copyright (c) 2024 DSR Corporation, Denver, Colorado.
// https://www.dsr-corporation.com
// SPDX-License-Identifier: Apache-2.0

struct JSDocumentOffer {
    let issuerName: String
    let offeredDocuments: [JSOfferedDocument]
}

struct JSOfferedDocument {
    let name: String
    let docType: String
}
