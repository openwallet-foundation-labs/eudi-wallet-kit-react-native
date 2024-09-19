/**
 * Copyright (c) 2024 DSR Corporation, Denver, Colorado.
 * https://www.dsr-corporation.com
 * SPDX-License-Identifier: Apache-2.0
 */

import type { TransferEvent, TransferEventListener } from './TransferEvent'

export * from './TransferEvent'

export type EudiWalletEvent = TransferEvent

export type EudiWalletEventListener = TransferEventListener
