/**
 * Copyright (c) 2024 DSR Corporation, Denver, Colorado.
 * https://www.dsr-corporation.com
 * SPDX-License-Identifier: Apache-2.0
 */

import { useIsFocused } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { Vibration, useWindowDimensions, type ViewStyle } from 'react-native'
import { Camera, type Code, useCameraDevice, useCameraFormat, useCodeScanner } from 'react-native-vision-camera'

import { InvalidDataError } from '../../types/errors'

interface Props {
  containerStyle?: ViewStyle
  handleCodeScan: (value: string) => Promise<void>
  error?: InvalidDataError | null
  torchActive?: boolean
  enableCameraOnError?: boolean
}

export const QRScannerCamera: React.FC<Props> = ({
  containerStyle,
  handleCodeScan,
  error,
  torchActive,
  enableCameraOnError = true,
}) => {
  const device = useCameraDevice('back')

  const [invalidQRCodes, setInvalidQRCodes] = useState<string[]>([])
  const [isCameraActive, setIsCameraActive] = useState(true)

  const isFocused = useIsFocused()

  useEffect(() => {
    if (!isFocused) return
    setIsCameraActive(true)
  }, [isFocused])

  const onCodeScanned = useCallback(
    (codes: Code[]) => {
      const value = codes[0]?.value
      if (!value || invalidQRCodes.includes(value)) return

      if (error?.data === value) {
        setInvalidQRCodes((invalidCodes) => [...invalidCodes, value])
        if (enableCameraOnError) {
          return setIsCameraActive(true)
        }
      }

      if (isCameraActive) {
        Vibration.vibrate()
        handleCodeScan(value)
        setIsCameraActive(false)
      }
    },
    [invalidQRCodes, error?.data, isCameraActive, enableCameraOnError, handleCodeScan],
  )

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned,
  })

  const screenAspectRatio = useWindowDimensions().scale
  const format = useCameraFormat(device, [
    { fps: 20 },
    { videoAspectRatio: screenAspectRatio },
    { videoResolution: 'max' },
    { photoAspectRatio: screenAspectRatio },
    { photoResolution: 'max' },
  ])

  if (!device) return null
  return (
    <Camera
      style={containerStyle}
      device={device}
      torch={torchActive ? 'on' : 'off'}
      isActive={isCameraActive}
      codeScanner={codeScanner}
      format={format}
    />
  )
}
