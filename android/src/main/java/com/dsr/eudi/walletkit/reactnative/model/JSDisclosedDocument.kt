package com.dsr.eudi.walletkit.reactnative.model

import eu.europa.ec.eudi.iso18013.transfer.DisclosedDocument
import eu.europa.ec.eudi.iso18013.transfer.DocItem

data class JSDisclosedDocument(
  val documentId: String,
  val docType: String,
  val selectedDocItems: List<DocItem>,
  val docRequest: JSDocumentRequest
) {
  fun toDisclosedDocument(): DisclosedDocument {
    return DisclosedDocument(
      documentId,
      docType,
      selectedDocItems,
      docRequest.toDocRequest()
    )
  }
}
