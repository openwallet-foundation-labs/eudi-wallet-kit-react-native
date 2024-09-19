/**
 * Copyright (c) 2024 DSR Corporation, Denver, Colorado.
 * https://www.dsr-corporation.com
 * SPDX-License-Identifier: Apache-2.0
 */

import { EudiWallet } from '@openwallet-foundation/eudi-wallet-kit-react-native'
import React from 'react'
import { Button, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { AddDocumentModal, useAddDocumentModal } from '../components/modals'

export const Home: React.FC = () => {
  const {
    isVisible: isAddDocumentModalVisible,
    show: showAddDocumentModal,
    hide: hideAddDocumentModal,
  } = useAddDocumentModal()

  const loadSampleData = () => {
    EudiWallet.loadSampleData('eudi_sample_data')
  }

  return (
    <>
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Welcome to React Native EUDI wallet</Text>
        <View style={{ marginTop: 16 }}>
          <Button title={'Add document'} onPress={showAddDocumentModal} />
        </View>
        <View style={{ marginTop: 16 }}>
          <Button title={'Load sample data'} onPress={loadSampleData} />
        </View>
      </SafeAreaView>
      <AddDocumentModal isVisible={isAddDocumentModalVisible} onCancel={hideAddDocumentModal} />
    </>
  )
}
