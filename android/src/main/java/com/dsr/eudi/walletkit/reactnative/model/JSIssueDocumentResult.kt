/*
 * Copyright (c) 2024 DSR Corporation, Denver, Colorado.
 * https://www.dsr-corporation.com
 * SPDX-License-Identifier: Apache-2.0
 */

package com.dsr.eudi.walletkit.reactnative.model

data class JSIssueDocumentResult(
  val totalCount: Int,
  val issuedCount: Int,
  val issuedDocumentIds: List<String>
)
