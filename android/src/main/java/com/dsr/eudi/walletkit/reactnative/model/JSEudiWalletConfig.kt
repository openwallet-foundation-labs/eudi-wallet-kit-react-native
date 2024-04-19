package com.dsr.eudi.walletkit.reactnative.model

import eu.europa.ec.eudi.wallet.EudiWalletConfig

data class JSEudiWalletConfig(
  val documentsStorageDir: String?,
  val useHardwareToStoreKeys: Boolean?,
  val userAuthenticationRequired: Boolean?,
  val userAuthenticationTimeOut: Double?,
  val verifyMsoPublicKey: Boolean?,
  val trustedReaderCertificates: List<String>?,
  val openId4VpConfig: JSOpenId4VpConfig?,
  val openId4VciConfig: JSOpenId4VciConfig?,
  val bleConfig: JSBLEConfig?
)

data class JSBLEConfig(
  @EudiWalletConfig.BleTransferMode
  val transferMode: Int,
  val clearCacheAfterTransfer: Boolean
)
