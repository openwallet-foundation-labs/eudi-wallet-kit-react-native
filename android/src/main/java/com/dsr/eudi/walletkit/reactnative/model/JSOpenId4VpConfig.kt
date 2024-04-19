package com.dsr.eudi.walletkit.reactnative.model

import com.dsr.eudi.walletkit.reactnative.utils.parseEncryptionAlgorithm
import com.dsr.eudi.walletkit.reactnative.utils.parseEncryptionMethod
import eu.europa.ec.eudi.wallet.transfer.openid4vp.OpenId4VpConfig

data class JSOpenId4VpConfig(
  val scheme: String?,
  val encryptionAlgorithms: List<String>,
  val encryptionMethods: List<String>,
  val clientIdSchemes: List<JSClientIdScheme>,
) {
  fun toOpenId4VpConfig(): OpenId4VpConfig {
    var configBuilder = OpenId4VpConfig.Builder()
      .withEncryptionAlgorithms(encryptionAlgorithms.map { parseEncryptionAlgorithm(it) })
      .withEncryptionMethods(encryptionMethods.map{ parseEncryptionMethod(it) })
      .withClientIdSchemes(clientIdSchemes.map { it.toClientIdScheme() })

    if (scheme !== null) {
      configBuilder = configBuilder.withScheme(scheme)
    }

    return configBuilder.build()
  }
}
