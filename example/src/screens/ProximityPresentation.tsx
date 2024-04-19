import type { MainTabStackParams, Screens } from '../navigation/types'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

import { EudiWallet, TransferEventType } from 'eudi-wallet-kit-react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { QRCodeView } from '../components/views'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 30,
    textAlign: 'center',
  },
  primaryHeaderText: {
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
    color: 'black',
  },
  secondaryHeaderText: {
    fontWeight: 'normal',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 8,
    color: 'black',
  },
  qrContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginTop: 16,
  },
  nfcOptionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
})

const useQRSizesForWindow = () => {
  const { width } = useWindowDimensions()
  const qrContainerSize = width - 20
  const qrSize = qrContainerSize - 20

  return { qrSize, qrContainerSize }
}

type Props = NativeStackScreenProps<MainTabStackParams, Screens.ProximityPresentation>

export const ProximityPresentation: React.FC<Props> = () => {
  const [qrCodeContent, setQrCodeContent] = useState<string | null>(null)

  useEffect(() => {
    const listenerId = EudiWallet.addTransferEventListener((event) => {
      if (event.type === TransferEventType.QrEngagementReady) {
        setQrCodeContent(event.qrCodeContent)
      }
    })

    EudiWallet.startProximityPresentation()

    return () => {
      EudiWallet.removeTransferEventListener(listenerId)
      EudiWallet.stopPresentation()
    }
  }, [])

  const { qrSize, qrContainerSize } = useQRSizesForWindow()
  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.primaryHeaderText}>Show QR or Tap</Text>
          <Text style={styles.secondaryHeaderText}>
            Show this QR code to access the necessary information for sharing
          </Text>
        </View>
        <View style={{ height: qrContainerSize, width: qrContainerSize, ...styles.qrContainer }}>
          {qrCodeContent && <QRCodeView value={qrCodeContent} size={qrSize} />}
        </View>
        <View style={{ marginTop: 16, alignItems: 'center' }}>
          <Text style={styles.secondaryHeaderText}>Or use the NFC</Text>
          <Icon style={{ marginTop: 8 }} name={'nfc'} color={'black'} size={64} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
