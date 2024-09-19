/**
 * Copyright (c) 2024 DSR Corporation, Denver, Colorado.
 * https://www.dsr-corporation.com
 * SPDX-License-Identifier: Apache-2.0
 */

import { AppRegistry } from 'react-native'

import { name as appName } from './app.json'
import { App } from './src/App'

AppRegistry.registerComponent(appName, () => App)
