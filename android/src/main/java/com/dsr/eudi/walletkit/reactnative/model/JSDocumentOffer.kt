package com.dsr.eudi.walletkit.reactnative.model

import eu.europa.ec.eudi.wallet.issue.openid4vci.Offer

data class JSDocumentOffer(val issuerName: String, val offeredDocuments: List<JSOfferedDocument>)
{
  companion object {
    fun fromDocumentOffer(offer: Offer): JSDocumentOffer {
      val offeredDocuments = offer.offeredDocuments.map { JSOfferedDocument(it.name, it.docType) }

      return JSDocumentOffer(
        offer.issuerName,
        offeredDocuments
      )
    }
  }
}

data class JSOfferedDocument(val name: String, val docType: String)
