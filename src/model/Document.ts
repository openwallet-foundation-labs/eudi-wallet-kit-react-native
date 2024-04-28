type DocumentData = Record<string, any>

export interface Document {
  id: string
  docType: string
  name: string
  createdAt?: number
  requiresUserAuth?: boolean
  namespaces: Record<string, string[]>
  namespacedData: Record<string, DocumentData>
}
