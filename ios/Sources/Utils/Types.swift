// Copyright (c) 2024 DSR Corporation, Denver, Colorado.
// https://www.dsr-corporation.com
// SPDX-License-Identifier: Apache-2.0

import Foundation

typealias JSONDictionary = [String: Any?]

enum RuntimeError: Error {
    case error(_ msg: String)
}
