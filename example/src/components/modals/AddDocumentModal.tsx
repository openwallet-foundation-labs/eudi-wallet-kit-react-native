import { EudiWallet } from 'eudi-wallet-kit-react-native'
import React, { useCallback, useState } from 'react'
import { Button, Modal, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { IconButton } from '../buttons'

const styles = StyleSheet.create({
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    paddingTop: 40,
  },
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  closeButton: {
    color: 'black',
    backgroundColor: 'transparent',
  },
  headerButtonContainer: {
    paddingTop: 16,
  },
  buttonContainer: {
    paddingTop: 24,
  },
})

interface Props {
  isVisible: boolean
  onCancel: () => void
}

export const AddDocumentModal: React.FC<Props> = ({ isVisible, onCancel }) => {
  const [inProgress, setInProgress] = useState(false)

  const addDocument = async (docType: string) => {
    setInProgress(true)
    try {
      await EudiWallet.issueDocument(docType)
    } finally {
      setInProgress(false)
    }
  }

  return (
    <Modal visible={isVisible} animationType="fade" onRequestClose={onCancel}>
      <SafeAreaView style={styles.headerButtonContainer}>
        <IconButton iconName={'close'} onPress={onCancel} />
      </SafeAreaView>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Add document</Text>
          <Text>Select a document to add in your EUDI wallet</Text>
        </View>
        <View style={{ marginTop: 24 }}>
          <View style={styles.buttonContainer}>
            <Button
              title={'National ID'}
              onPress={() => addDocument('eu.europa.ec.eudiw.pid.1')}
              disabled={inProgress}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title={'Driving licence'}
              onPress={() => addDocument('org.iso.18013.5.1.mDL')}
              disabled={inProgress}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

export const useAddDocumentModal = () => {
  const [isVisible, setIsVisible] = useState(false)

  const show = useCallback(() => {
    setIsVisible(true)
  }, [])

  const hide = useCallback(() => {
    setIsVisible(false)
  }, [])

  return { isVisible, show, hide }
}
