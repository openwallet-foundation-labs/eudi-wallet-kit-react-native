/**
 * Copyright (c) 2024 DSR Corporation, Denver, Colorado.
 * https://www.dsr-corporation.com
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  type DisclosedDocument,
  EudiWallet,
  TransferEventType,
} from '@openwallet-foundation/eudi-wallet-kit-react-native'
import { useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator, type NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { Alert, Linking } from 'react-native'

import { LoadingModal } from '../components/modals'
import { walletConfig } from '../config'

import { MainTabStack } from './MainTabStack'
import { type RootStackParams, Screens, Stacks } from './types'

const Stack = createNativeStackNavigator<RootStackParams>()

export const RootStack: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>()

  const [isWalletInitialized, setIsWalletInitialized] = useState(false)

  useEffect(() => {
    EudiWallet.initialize(walletConfig).then(() => setIsWalletInitialized(true))
  }, [])

  useEffect(() => {
    if (!isWalletInitialized) return

    Linking.addEventListener('url', async ({ url }) => {
      if (url.includes('authorize')) {
        EudiWallet.resumeOpenId4VciWithAuthorization(url)
      }
    })

    return () => Linking.removeAllListeners('url')
  }, [isWalletInitialized])

  useEffect(() => {
    if (!isWalletInitialized) return

    const listenerId = EudiWallet.addTransferEventListener((event) => {
      console.log(`Received transfer event with type: ${event.type}`)

      if (event.type === TransferEventType.RequestReceived) {
        const requestedDocs = event.requestedDocuments

        const onConfirm = async () => {
          const disclosedDocs: DisclosedDocument[] = requestedDocs.map((requestedDoc) => ({
            docType: requestedDoc.docType,
            documentId: requestedDoc.documentId,
            docRequest: requestedDoc.docRequest,
            selectedDocItems: requestedDoc.docRequest.requestItems,
          }))

          await EudiWallet.sendResponse(disclosedDocs)

          navigation.navigate(Stacks.MainTabStack, { screen: Screens.Home })
        }

        const requestedDocTypes = requestedDocs.map((requestedDoc) => requestedDoc.docType)
        const verifierName = requestedDocs[0]?.docRequest.readerAuth?.readerCommonName ?? 'Unknown verifier'

        Alert.alert(
          'Confirm data share',
          `Do you want to share your data from ${requestedDocTypes.join(', ')} document(s) with ${verifierName}?`,
          [
            {
              text: 'Confirm',
              onPress: onConfirm,
            },
            {
              text: 'Close',
              style: 'cancel',
              onPress: () => navigation.navigate(Stacks.MainTabStack, { screen: Screens.Home }),
            },
          ],
        )
      } else if (event.type === TransferEventType.Error) {
        Alert.alert(`Error on presentation transfer: ${event.errorMessage}`)
      }
    })

    return () => EudiWallet.removeTransferEventListener(listenerId)
  }, [navigation, isWalletInitialized])

  if (!isWalletInitialized) return <LoadingModal />
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Stacks.MainTabStack} component={MainTabStack} />
    </Stack.Navigator>
  )
}
