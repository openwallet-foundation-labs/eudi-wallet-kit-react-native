import React, { useState } from 'react'
import { StyleSheet, View, Text, useWindowDimensions } from 'react-native'
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

interface Props {
  value: string
  size?: number
}

export const QRCodeView: React.FC<Props> = ({ value, size }) => {
  const { width } = useWindowDimensions()

  const [isInvalidQR, setIsInvalidQR] = useState(false)

  const onQRGenerationError = () => {
    setIsInvalidQR(true)
  }

  const defaultQRSize = width - 80
  return (
    <View style={styles.container}>
      {<QRCode ecl="L" value={value} size={size ?? defaultQRSize} onError={onQRGenerationError} />}
      {isInvalidQR && <Text style={styles.errorMessage}>{'QR generation error'}</Text>}
    </View>
  )
}
