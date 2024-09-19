/*
 * Copyright (c) 2024 DSR Corporation, Denver, Colorado.
 * https://www.dsr-corporation.com
 * SPDX-License-Identifier: Apache-2.0
 */

package com.dsr.eudi.walletkit.reactnative.utils

import android.util.Base64
import java.security.cert.CertificateFactory
import java.security.cert.X509Certificate

object CertUtils {
  fun createX509CertificateFromPem(certPem: String): X509Certificate {
    val certFactory = CertificateFactory.getInstance("X.509")
    return certFactory.generateCertificate(certPem.byteInputStream()) as X509Certificate
  }

  fun encodeX509CertificateToPem(cert: X509Certificate): String {
    val certBase64 = Base64.encodeToString(cert.encoded, Base64.DEFAULT)
    return buildString {
      append("-----BEGIN CERTIFICATE-----\n")
      // Chunk Base64 to 64-char lines
      append(certBase64.replace("(.{64})", "$1\n"))
      append("\n-----END CERTIFICATE-----\n")
    }
  }
}
