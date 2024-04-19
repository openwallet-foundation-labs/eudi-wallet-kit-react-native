import type { DocumentRequest } from './DocumentRequest'

export interface RequestedDocument {
  documentId: string
  docType: string
  docName: string
  userAuthentication: boolean
  docRequest: DocumentRequest
}
