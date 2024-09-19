/**
 * Copyright (c) 2024 DSR Corporation, Denver, Colorado.
 * https://www.dsr-corporation.com
 * SPDX-License-Identifier: Apache-2.0
 */

export enum BLETransferMode {
  BLE_SERVER_PERIPHERAL_MODE = 1 << 0,
  BLE_CLIENT_CENTRAL_MODE = 1 << 1,
}

export interface BLEConfig {
  transferMode: BLETransferMode
  clearCacheAfterTransfer?: boolean
}
