import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { requestBlePermissions } from '../BleHelpers'
import { Home, ProximityPresentation, Scan } from '../screens'

import { DocumentsStack } from './DocumentsStack'
import { type MainTabStackParams, Screens, Stacks } from './types'

const TAB_ICON_SIZE = 32

const Tab = createBottomTabNavigator<MainTabStackParams>()

export const MainTabStack: React.FC = () => {
  return (
    <Tab.Navigator initialRouteName={Screens.Home} screenOptions={{ unmountOnBlur: true, headerShown: false }}>
      <Tab.Screen
        name={Screens.Home}
        component={Home}
        options={{
          headerShown: true,
          tabBarIcon: ({ focused, color }) => (
            <Icon name={focused ? 'home' : 'home-outline'} color={color} size={TAB_ICON_SIZE} />
          ),
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name={Screens.Scan}
        component={Scan}
        options={{
          tabBarIcon: ({ color }) => <Icon name={'qrcode-scan'} color={color} size={TAB_ICON_SIZE} />,
          tabBarLabel: 'Scan',
        }}
      />
      <Tab.Screen
        name={Screens.ProximityPresentation}
        component={ProximityPresentation}
        options={{
          tabBarIcon: ({ color }) => <Icon name={'bluetooth-transfer'} color={color} size={TAB_ICON_SIZE} />,
          tabBarLabel: 'Show QR/Tap',
        }}
        listeners={({ navigation }) => ({
          tabPress: async (event) => {
            event.preventDefault()

            const isBleEnabled = await requestBlePermissions()
            if (!isBleEnabled) return

            navigation.navigate(Stacks.MainTabStack, { screen: Screens.ProximityPresentation })
          },
        })}
      />
      <Tab.Screen
        name={Stacks.DocumentsStack}
        component={DocumentsStack}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon name={focused ? 'file-document' : 'file-document-outline'} color={color} size={TAB_ICON_SIZE} />
          ),
          tabBarLabel: 'Documents',
        }}
      />
    </Tab.Navigator>
  )
}
