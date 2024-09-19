/*
 * Copyright (c) 2024 DSR Corporation, Denver, Colorado.
 * https://www.dsr-corporation.com
 * SPDX-License-Identifier: Apache-2.0
 */

package com.dsr.eudi.walletkit.reactnative.model

import eu.europa.ec.eudi.wallet.transfer.openid4vp.ClientIdScheme
import eu.europa.ec.eudi.wallet.transfer.openid4vp.PreregisteredVerifier

data class JSClientIdScheme(val type: String, val preregisteredVerifiers: List<PreregisteredVerifier>) {
  fun toClientIdScheme(): ClientIdScheme {
    return when (this.type) {
      "Preregistered" -> ClientIdScheme.Preregistered(this.preregisteredVerifiers)
      "X509SanDns" -> ClientIdScheme.X509SanDns
      "X509SanUri" -> ClientIdScheme.X509SanUri
      else -> throw Error("Unsupported ClientIdScheme type: ${this.type}")
    }
  }
}
