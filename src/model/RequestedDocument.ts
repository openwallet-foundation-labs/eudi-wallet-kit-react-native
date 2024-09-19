/**
 * Copyright (c) 2024 DSR Corporation, Denver, Colorado.
 * https://www.dsr-corporation.com
 * SPDX-License-Identifier: Apache-2.0
 */

import type { DocumentRequest } from './DocumentRequest'

export interface RequestedDocument {
  documentId: string
  docType: string
  docName: string
  userAuthentication: boolean
  docRequest: DocumentRequest
}
