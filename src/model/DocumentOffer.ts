export interface DocumentOffer {
  issuerName: string
  offeredDocuments: OfferedDocument[]
}

export interface OfferedDocument {
  name: string
  docType: string
}
