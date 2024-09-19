/**
 * Copyright (c) 2024 DSR Corporation, Denver, Colorado.
 * https://www.dsr-corporation.com
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DocumentOffer {
  issuerName: string
  offeredDocuments: OfferedDocument[]
}

export interface OfferedDocument {
  name: string
  docType: string
}
