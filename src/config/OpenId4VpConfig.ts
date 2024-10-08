/**
 * Copyright (c) 2024 DSR Corporation, Denver, Colorado.
 * https://www.dsr-corporation.com
 * SPDX-License-Identifier: Apache-2.0
 */

import type { EncryptionMethod } from './Encryption'

import { EncryptionAlgorithm } from './Encryption'

interface PreregisteredVerifierConfig {
  clientId: string
  verifierApi: string
  legalName: string
}

export enum ClientIdSchemeType {
  Preregistered = 'Preregistered',
  X509SanDns = 'X509SanDns',
  X509SanUri = 'X509SanUri',
}

interface PreregisteredClientIdScheme {
  type: ClientIdSchemeType.Preregistered
  preregisteredVerifiers: PreregisteredVerifierConfig[]
}

interface X509SanDnsClientIdScheme {
  type: ClientIdSchemeType.X509SanDns
}

interface X509SanUriClientIdScheme {
  type: ClientIdSchemeType.X509SanUri
}

type ClientIdScheme = PreregisteredClientIdScheme | X509SanDnsClientIdScheme | X509SanUriClientIdScheme

export interface OpenId4VpConfig {
  scheme: string
  encryptionAlgorithms: EncryptionAlgorithm[]
  encryptionMethods: EncryptionMethod[]
  clientIdSchemes: ClientIdScheme[]
}
