/*
 * Copyright (c) 2024 DSR Corporation, Denver, Colorado.
 * https://www.dsr-corporation.com
 * SPDX-License-Identifier: Apache-2.0
 */

package com.dsr.eudi.walletkit.reactnative.utils

import eu.europa.ec.eudi.wallet.transfer.openid4vp.EncryptionAlgorithm
import eu.europa.ec.eudi.wallet.transfer.openid4vp.EncryptionMethod

fun parseEncryptionAlgorithm(alg: String): EncryptionAlgorithm {
  return when (alg) {
    "ECDH-ES" -> EncryptionAlgorithm.ECDH_ES
    "ECDH-ES+A128KW" -> EncryptionAlgorithm.ECDH_ES_A128KW
    "ECDH-ES+A192KW" -> EncryptionAlgorithm.ECDH_ES_A192KW
    "ECDH-ES+A256KW" -> EncryptionAlgorithm.ECDH_ES_A256KW
    "ECDH-1PU" -> EncryptionAlgorithm.ECDH_1PU
    "ECDH-1PU+A128KW" -> EncryptionAlgorithm.ECDH_1PU_A128KW
    "ECDH-1PU+A192KW" -> EncryptionAlgorithm.ECDH_1PU_A192KW
    "ECDH-1PU+A256KW" -> EncryptionAlgorithm.ECDH_1PU_A256KW
    else -> throw Error("Unsupported encryption algorithm: $alg")
  }
}

fun parseEncryptionMethod(method: String): EncryptionMethod {
  return when (method) {
    "A128CBC-HS256" -> EncryptionMethod.A128CBC_HS256
    "A192CBC-HS384" -> EncryptionMethod.A192CBC_HS384
    "A256CBC-HS512" -> EncryptionMethod.A256CBC_HS512
    "A128GCM" -> EncryptionMethod.A128GCM
    "A192GCM" -> EncryptionMethod.A192GCM
    "A256GCM" -> EncryptionMethod.A256GCM
    else -> throw Error("Unsupported encryption method: $method")
  }
}
