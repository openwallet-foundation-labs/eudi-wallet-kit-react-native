/*
 * Copyright (c) 2024 DSR Corporation, Denver, Colorado.
 * https://www.dsr-corporation.com
 * SPDX-License-Identifier: Apache-2.0
 */

package com.dsr.eudi.walletkit.reactnative.model

import eu.europa.ec.eudi.iso18013.transfer.TransferEvent

sealed interface JSTransferEvent {
  val type: String

  companion object {
    fun fromTransferEvent(event: TransferEvent): JSTransferEvent {
      return when(event) {
        is TransferEvent.Connecting -> JSTransferEvent.Connecting
        is TransferEvent.Connected -> JSTransferEvent.Connected
        is TransferEvent.Disconnected -> JSTransferEvent.Disconnected
        is TransferEvent.Error -> JSTransferEvent.Error(event.error.message ?: "Unknown error")
        is TransferEvent.QrEngagementReady -> JSTransferEvent.QrEngagementReady(event.qrCode.content)
        is TransferEvent.RequestReceived -> JSTransferEvent.RequestReceived(event.requestedDocumentData.documents.map { JSRequestedDocument.fromRequestDocument(it) })
        is TransferEvent.ResponseSent -> JSTransferEvent.ResponseSent
        is TransferEvent.Redirect -> JSTransferEvent.Redirect(event.redirectUri.toString())
      }
    }
  }

  object Connecting: JSTransferEvent {
    override val type: String = "TransferConnecting"
  }

  object Connected: JSTransferEvent {
    override val type: String = "TransferConnected"
  }

  object Disconnected: JSTransferEvent {
    override val type: String = "TransferDisconnected"
  }

  data class Error(val errorMessage: String): JSTransferEvent {
    override val type: String = "TransferError"
  }

  data class QrEngagementReady(val qrCodeContent: String): JSTransferEvent {
    override val type: String = "TransferQrEngagementReady"
  }

  data class RequestReceived(val requestedDocuments: List<JSRequestedDocument>): JSTransferEvent {
    override val type: String = "TransferRequestReceived"
  }

  object ResponseSent: JSTransferEvent {
    override val type: String = "TransferResponseSent"
  }

  data class Redirect(val redirectUri: String): JSTransferEvent {
    override val type: String = "TransferRedirect"
  }
}
