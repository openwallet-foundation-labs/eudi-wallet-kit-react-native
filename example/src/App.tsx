/**
 * Copyright (c) 2024 DSR Corporation, Denver, Colorado.
 * https://www.dsr-corporation.com
 * SPDX-License-Identifier: Apache-2.0
 */

import { NavigationContainer } from '@react-navigation/native'
import * as React from 'react'
import { StatusBar } from 'react-native'

import { RootStack } from './navigation'

export const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar />
      <RootStack />
    </NavigationContainer>
  )
}
