/**
 * Copyright (c) 2024 DSR Corporation, Denver, Colorado.
 * https://www.dsr-corporation.com
 * SPDX-License-Identifier: Apache-2.0
 */

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
