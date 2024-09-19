/**
 * Copyright (c) 2024 DSR Corporation, Denver, Colorado.
 * https://www.dsr-corporation.com
 * SPDX-License-Identifier: Apache-2.0
 */

import type { DocumentItem, DocumentRequest } from './DocumentRequest'

export interface DisclosedDocument {
  documentId: string
  docType: string
  selectedDocItems: DocumentItem[]
  docRequest: DocumentRequest
}
