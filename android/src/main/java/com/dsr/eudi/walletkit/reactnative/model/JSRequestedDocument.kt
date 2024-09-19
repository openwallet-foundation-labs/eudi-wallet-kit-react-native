/*
 * Copyright (c) 2024 DSR Corporation, Denver, Colorado.
 * https://www.dsr-corporation.com
 * SPDX-License-Identifier: Apache-2.0
 */

package com.dsr.eudi.walletkit.reactnative.model

import eu.europa.ec.eudi.iso18013.transfer.RequestDocument

data class JSRequestedDocument(
  val documentId: String,
  val docType: String,
  val docName: String,
  val userAuthentication: Boolean,
  val docRequest: JSDocumentRequest
)
{
  companion object {
    fun fromRequestDocument(requestDocument: RequestDocument): JSRequestedDocument {
      return JSRequestedDocument(
        requestDocument.documentId,
        requestDocument.docType,
        requestDocument.docName,
        requestDocument.userAuthentication,
        JSDocumentRequest.fromDocRequest(requestDocument.docRequest)
      )
    }
  }

  fun toRequestDocument(): RequestDocument {
    return RequestDocument(
      documentId,
      docType,
      docName,
      userAuthentication,
      docRequest.toDocRequest()
    )
  }
}
