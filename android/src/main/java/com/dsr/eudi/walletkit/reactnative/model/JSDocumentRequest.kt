/*
 * Copyright (c) 2024 DSR Corporation, Denver, Colorado.
 * https://www.dsr-corporation.com
 * SPDX-License-Identifier: Apache-2.0
 */

package com.dsr.eudi.walletkit.reactnative.model

import android.util.Base64
import com.dsr.eudi.walletkit.reactnative.utils.CertUtils
import eu.europa.ec.eudi.iso18013.transfer.DocItem
import eu.europa.ec.eudi.iso18013.transfer.DocRequest
import eu.europa.ec.eudi.iso18013.transfer.ReaderAuth

data class JSDocumentRequest(val docType: String, val requestItems: List<DocItem>, val readerAuth: JSReaderAuth?) {
  companion object {
    fun fromDocRequest(docRequest: DocRequest): JSDocumentRequest {
      return JSDocumentRequest(
        docRequest.docType,
        docRequest.requestItems,
        docRequest.readerAuth?.let { JSReaderAuth.fromReaderAuth(it) }
      )
    }
  }
  fun toDocRequest(): DocRequest {
    return DocRequest(
      docType,
      requestItems,
      readerAuth?.toReaderAuth()
    )
  }
}

data class JSReaderAuth(
  val readerCommonName: String,
  val readerAuthBase64: String,
  val readerSignIsValid: Boolean,
  val readerCertificateIsTrusted: Boolean,
  val readerCertificateChain: List<String>
) {
  companion object {
    fun fromReaderAuth(readerAuth: ReaderAuth): JSReaderAuth {
      val readerAuthBase64 = Base64.encodeToString(readerAuth.readerAuth, Base64.DEFAULT)
      val readerCertificateChain = readerAuth.readerCertificateChain.map { CertUtils.encodeX509CertificateToPem(it) }

      return JSReaderAuth(
        readerAuth.readerCommonName,
        readerAuthBase64,
        readerAuth.readerSignIsValid,
        readerAuth.readerCertificatedIsTrusted,
        readerCertificateChain
      )
    }
  }

  fun toReaderAuth(): ReaderAuth {
    val readerAuth = Base64.decode(readerAuthBase64, Base64.DEFAULT)
    val readerCertificateChain = readerCertificateChain.map { CertUtils.createX509CertificateFromPem(it) }

    return ReaderAuth(
      readerAuth,
      readerSignIsValid,
      readerCertificateChain,
      readerCertificateIsTrusted,
      readerCommonName
    )
  }
}
