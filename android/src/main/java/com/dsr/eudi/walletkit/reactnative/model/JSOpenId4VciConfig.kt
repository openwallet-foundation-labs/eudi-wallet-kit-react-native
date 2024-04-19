package com.dsr.eudi.walletkit.reactnative.model

import eu.europa.ec.eudi.wallet.document.issue.openid4vci.OpenId4VciConfig

data class JSOpenId4VciConfig(val issuerUrl: String, val clientId: String) {
  fun toOpenId4VciConfig(): OpenId4VciConfig {
    return OpenId4VciConfig.Builder()
      .withIssuerUrl(this.issuerUrl)
      .withClientId(this.clientId)
      .build()
  }
}
