import type { DocumentItem, DocumentRequest } from './DocumentRequest'

export interface DisclosedDocument {
  documentId: string
  docType: string
  selectedDocItems: DocumentItem[]
  docRequest: DocumentRequest
}
