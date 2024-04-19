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
