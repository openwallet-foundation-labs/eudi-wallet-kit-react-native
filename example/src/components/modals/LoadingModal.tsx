/**
 * Copyright (c) 2024 DSR Corporation, Denver, Colorado.
 * https://www.dsr-corporation.com
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react'
import { ActivityIndicator, Modal, StyleSheet, useWindowDimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const useStyles = () => {
  const { height } = useWindowDimensions()
  return StyleSheet.create({
    view: {
      minHeight: height,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
}

export const LoadingModal: React.FC = () => {
  const styles = useStyles()

  return (
    <Modal visible transparent>
      <SafeAreaView style={styles.view}>
        <ActivityIndicator size={32} />
      </SafeAreaView>
    </Modal>
  )
}
