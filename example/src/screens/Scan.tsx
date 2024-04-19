import type { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { useNavigation } from '@react-navigation/native'
import { EudiWallet } from 'eudi-wallet-kit-react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Alert, Linking, View, StyleSheet, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useCameraPermission } from 'react-native-vision-camera'

import { QRScannerCamera } from '../components/misc'
import { LoadingModal } from '../components/modals'
import { type MainTabStackParams, Screens } from '../navigation/types'
import { InvalidDataError } from '../types/errors'

const styles = StyleSheet.create({
  cameraContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  viewFinder: {
    width: 250,
    height: 250,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'white',
  },
  viewFinderContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContainer: {
    marginHorizontal: 40,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: 30,
  },
  icon: {
    color: 'white',
    padding: 4,
  },
  textStyle: {
    color: 'white',
    marginHorizontal: 10,
    textAlign: 'center',
  },
})

export const Scan: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<MainTabStackParams>>()

  const { hasPermission, requestPermission } = useCameraPermission()

  const [error, setError] = useState<InvalidDataError | null>(null)

  useEffect(() => {
    if (hasPermission) return

    requestPermission().then((permissionGranted) => {
      if (permissionGranted) return

      Alert.alert(
        'Camera permission required',
        'To use scanner feature, please enable permissions in device settings',
        [
          { text: 'Open Settings', onPress: () => Linking.openSettings() },
          { text: 'Close', style: 'cancel' },
        ],
        { cancelable: true },
      )

      navigation.navigate(Screens.Home)
    })
  }, [hasPermission, requestPermission, navigation])

  const handleCodeScan = useCallback(
    async (value: string) => {
      setError(null)
      try {
        const message = value
        console.log('Received QR code message:', message)

        EudiWallet.startRemotePresentation(message)

        navigation.navigate(Screens.Home)
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error)
        const invalidDataError = new InvalidDataError(errorMessage, value)
        setError(invalidDataError)
      }
    },
    [navigation],
  )

  if (!hasPermission) return <LoadingModal />
  return (
    <View style={{ flex: 1 }}>
      <QRScannerCamera containerStyle={styles.cameraContainer} handleCodeScan={handleCodeScan} error={error} />
      <View style={{ flex: 1 }}>
        <View style={styles.messageContainer}>
          {error ? (
            <>
              <Icon style={styles.icon} name="cancel" size={40} />
              <Text style={styles.textStyle}>{error.message}</Text>
            </>
          ) : (
            <>
              <Icon style={styles.icon} name="qrcode-scan" size={40} />
              <Text style={styles.textStyle}>{'Will scan automatically'}</Text>
            </>
          )}
        </View>
        <View style={styles.viewFinderContainer}>
          <View style={styles.viewFinder} />
        </View>
      </View>
    </View>
  )
}
