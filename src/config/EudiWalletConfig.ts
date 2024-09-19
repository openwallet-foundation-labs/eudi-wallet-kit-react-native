/**
 * Copyright (c) 2024 DSR Corporation, Denver, Colorado.
 * https://www.dsr-corporation.com
 * SPDX-License-Identifier: Apache-2.0
 */

import type { BLEConfig } from './BLEConfig'
import type { OpenId4VciConfig } from './OpenId4VciConfig'
import type { OpenId4VpConfig } from './OpenId4VpConfig'

export interface EudiWalletConfig {
  trustedReaderCertificates?: string[]
  userAuthenticationRequired?: boolean
  openId4VpConfig?: OpenId4VpConfig
  openId4VciConfig?: OpenId4VciConfig

  // For Android only
  documentsStorageDir?: string
  useHardwareToStoreKeys?: boolean
  userAuthenticationTimeOut?: number
  verifyMsoPublicKey?: boolean
  bleConfig?: BLEConfig
}
