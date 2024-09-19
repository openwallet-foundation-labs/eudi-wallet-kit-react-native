/**
 * Copyright (c) 2024 DSR Corporation, Denver, Colorado.
 * https://www.dsr-corporation.com
 * SPDX-License-Identifier: Apache-2.0
 */

const path = require('path')
const pak = require('../package.json')

module.exports = {
  dependencies: {
    [pak.name]: {
      root: path.join(__dirname, '..'),
    },
    'react-native-vector-icons': {
      platforms: {
        ios: null,
      },
    },
  },
}