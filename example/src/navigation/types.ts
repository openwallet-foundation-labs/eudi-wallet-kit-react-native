/**
 * Copyright (c) 2024 DSR Corporation, Denver, Colorado.
 * https://www.dsr-corporation.com
 * SPDX-License-Identifier: Apache-2.0
 */

import type { NavigatorScreenParams } from '@react-navigation/native'

export enum Screens {
  Home = 'Home',
  Scan = 'Scan',
  ProximityPresentation = 'ProximityPresentation',
  Documents = 'Documents',
}

export enum Stacks {
  RootStack = 'RootStack',
  MainTabStack = 'MainTabStack',
  DocumentsStack = 'DocumentsStack',
}

export type DocumentsStackParams = {
  [Screens.Documents]: undefined
}

export type MainTabStackParams = {
  [Screens.Home]: undefined
  [Screens.Scan]: undefined
  [Screens.ProximityPresentation]: undefined
  [Stacks.DocumentsStack]: NavigatorScreenParams<DocumentsStackParams>
}

export type RootStackParams = {
  [Stacks.MainTabStack]: NavigatorScreenParams<MainTabStackParams>
}
