/**
 * Copyright (c) 2024 DSR Corporation, Denver, Colorado.
 * https://www.dsr-corporation.com
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
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
  size: number
}

export const QRCodeView: React.FC<Props> = ({ value, size }) => {
  const [isInvalidQR, setIsInvalidQR] = useState(false)

  const onQRGenerationError = () => {
    setIsInvalidQR(true)
  }

  return (
    <View style={styles.container}>
      <QRCode ecl="L" value={value} size={size} onError={onQRGenerationError} />
      {isInvalidQR && <Text style={styles.errorMessage}>{'QR generation error'}</Text>}
    </View>
  )
}
