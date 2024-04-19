export interface DocumentItem {
  namespace: string
  elementIdentifier: string
}

export interface ReaderAuth {
  readerCommonName: string
  readerSignIsValid: boolean
  readerCertificateIsTrusted: boolean

  // Android only
  readerAuthBase64?: string
  readerCertificateChain?: string[]
}

export interface DocumentRequest {
  docType: string
  requestItems: DocumentItem[]
  readerAuth: ReaderAuth
}
