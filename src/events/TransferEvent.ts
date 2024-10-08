/**
 * Copyright (c) 2024 DSR Corporation, Denver, Colorado.
 * https://www.dsr-corporation.com
 * SPDX-License-Identifier: Apache-2.0
 */

import type { RequestedDocument } from '../model'

export enum TransferEventType {
  Connecting = 'TransferConnecting',
  Connected = 'TransferConnected',
  Disconnected = 'TransferDisconnected',
  Error = 'TransferError',
  QrEngagementReady = 'TransferQrEngagementReady',
  RequestReceived = 'TransferRequestReceived',
  ResponseSent = 'TransferResponseSent',
  Redirect = 'TransferRedirect',
}

export interface TransferConnectingEvent {
  type: TransferEventType.Connecting
}

export interface TransferConnectedEvent {
  type: TransferEventType.Connected
}

export interface TransferDisconnectedEvent {
  type: TransferEventType.Disconnected
}

export interface TransferErrorEvent {
  type: TransferEventType.Error
  errorMessage: string
}

export interface TransferQrEngagementReadyEvent {
  type: TransferEventType.QrEngagementReady
  qrCodeContent: string
}

export interface TransferRequestReceivedEvent {
  type: TransferEventType.RequestReceived
  requestedDocuments: RequestedDocument[]
}

export interface TransferResponseSentEvent {
  type: TransferEventType.ResponseSent
}

export interface TransferRedirectEvent {
  type: TransferEventType.Redirect
  redirectUri: string
}

export type TransferEvent =
  | TransferConnectedEvent
  | TransferConnectingEvent
  | TransferDisconnectedEvent
  | TransferErrorEvent
  | TransferQrEngagementReadyEvent
  | TransferRequestReceivedEvent
  | TransferResponseSentEvent
  | TransferRedirectEvent

export type TransferEventListener = (event: TransferEvent) => void
