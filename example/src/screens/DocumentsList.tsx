import { EudiWallet, type Document } from '@openwallet-foundation/eudi-wallet-kit-react-native'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

import { LoadingModal } from '../components/modals'

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'white',
    margin: 4,
  },
  itemText: {
    color: 'black',
  },
})

export const DocumentsList: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [documents, setDocuments] = useState<Document[]>([])

  useEffect(() => {
    EudiWallet.getDocuments().then((result) => {
      setDocuments(result)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) return <LoadingModal />
  return (
    <View>
      <FlatList
        data={documents}
        renderItem={({ item: document, index }) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <Text style={styles.itemText}>{document.docType}</Text>
            </View>
          )
        }}
      />
    </View>
  )
}
