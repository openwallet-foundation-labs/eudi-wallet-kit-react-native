struct JSDocumentOffer {
    let issuerName: String
    let offeredDocuments: [JSOfferedDocument]
}

struct JSOfferedDocument {
    let name: String
    let docType: String
}
