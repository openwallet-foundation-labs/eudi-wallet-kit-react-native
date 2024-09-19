/**
 * Copyright (c) 2024 DSR Corporation, Denver, Colorado.
 * https://www.dsr-corporation.com
 * SPDX-License-Identifier: Apache-2.0
 */

export class InvalidDataError extends Error {
  public data: unknown

  public constructor(message?: string, data?: unknown) {
    super(message)
    this.data = data
  }
}
