/*
 * Copyright (c) 2024 DSR Corporation, Denver, Colorado.
 * https://www.dsr-corporation.com
 * SPDX-License-Identifier: Apache-2.0
 */

package com.dsr.eudi.walletkit.reactnative.model

import eu.europa.ec.eudi.wallet.issue.openid4vci.OpenId4VciManager

data class JSOpenId4VciConfig(val issuerUrl: String, val clientId: String, val authFlowRedirectUri: String) {
  fun toOpenId4VciConfig(): OpenId4VciManager.Config {
    return OpenId4VciManager.Config.Builder()
      .withIssuerUrl(this.issuerUrl)
      .withClientId(this.clientId)
      .withAuthFlowRedirectionURI(this.authFlowRedirectUri)
      .useStrongBoxIfSupported(true)
      .useDPoP(true)
      .build()
  }
}
