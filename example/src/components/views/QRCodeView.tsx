import { Buffer } from '@craftzdog/react-native-buffer'
import React, { useState } from 'react'
import { StyleSheet, View, Text, Platform, Image } from 'react-native'
import QRCode from 'react-native-qrcode-svg'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginVertical: 20,
    backgroundColor: 'white',
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
  },
})

function getBase64Uri(base64Url: string): string {
  // iOS native lib returns image data as Base64URL that needs to be converted
  // See https://stackoverflow.com/questions/55389211/string-based-data-encoding-base64-vs-base64url
  const base64String = Buffer.from(base64Url, 'base64').toString('base64')
  return `data:image/png;base64,${base64String}`
}

interface Props {
  value: string
  size: number
}

export const QRCodeView: React.FC<Props> = ({ value, size }) => {
  const [isInvalidQR, setIsInvalidQR] = useState(false)

  const onQRGenerationError = () => {
    setIsInvalidQR(true)
  }

  return (
    <View style={styles.container}>
      {
        // TODO: Remove this after Android/iOS QR content inconsistency fixed
        Platform.OS === 'ios' ? (
          <Image source={{ uri: getBase64Uri(value) }} width={size} height={size} resizeMode="contain" />
        ) : (
          <QRCode ecl="L" value={value} size={size} onError={onQRGenerationError} />
        )
      }
      {isInvalidQR && <Text style={styles.errorMessage}>{'QR generation error'}</Text>}
    </View>
  )
}
