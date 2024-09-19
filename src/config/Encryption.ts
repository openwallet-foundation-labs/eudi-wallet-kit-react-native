/**
 * Copyright (c) 2024 DSR Corporation, Denver, Colorado.
 * https://www.dsr-corporation.com
 * SPDX-License-Identifier: Apache-2.0
 */

export enum EncryptionAlgorithm {
  ECDH_ES = 'ECDH-ES',
  ECDH_ES_A128KW = 'ECDH-ES+A128KW',
  ECDH_ES_A192KW = 'ECDH-ES+A192KW',
  ECDH_ES_A256KW = 'ECDH-ES+A256KW',
  ECDH_1PU = 'ECDH-1PU',
  ECDH_1PU_A128KW = 'ECDH-1PU+A128KW',
  ECDH_1PU_A192KW = 'ECDH-1PU+A192KW',
  ECDH_1PU_A256KW = 'ECDH-1PU+A256KW',
}

export enum EncryptionMethod {
  A128CBC_HS256 = 'A128CBC-HS256',
  A192CBC_HS384 = 'A192CBC-HS384',
  A256CBC_HS512 = 'A256CBC-HS512',
  A128GCM = 'A128GCM',
  A192GCM = 'A192GCM',
  A256GCM = 'A256GCM',
}
