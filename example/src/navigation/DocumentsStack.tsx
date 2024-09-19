/**
 * Copyright (c) 2024 DSR Corporation, Denver, Colorado.
 * https://www.dsr-corporation.com
 * SPDX-License-Identifier: Apache-2.0
 */

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import { DocumentsList } from '../screens'

import { type DocumentsStackParams, Screens } from './types'

const Stack = createNativeStackNavigator<DocumentsStackParams>()

// TODO: Add document details screen
export const DocumentsStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName={Screens.Documents}>
      <Stack.Screen
        name={Screens.Documents}
        component={DocumentsList}
        options={() => ({
          title: 'My documents',
        })}
      />
    </Stack.Navigator>
  )
}
