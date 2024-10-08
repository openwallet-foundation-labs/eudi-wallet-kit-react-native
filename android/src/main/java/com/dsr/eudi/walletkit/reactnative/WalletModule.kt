/*
 * Copyright (c) 2024 DSR Corporation, Denver, Colorado.
 * https://www.dsr-corporation.com
 * SPDX-License-Identifier: Apache-2.0
 */

package com.dsr.eudi.walletkit.reactnative

import androidx.activity.ComponentActivity
import androidx.biometric.BiometricPrompt
import androidx.fragment.app.FragmentActivity
import com.dsr.eudi.walletkit.reactnative.biometry.UserAuthenticationType
import com.dsr.eudi.walletkit.reactnative.biometry.showBiometricPrompt
import com.dsr.eudi.walletkit.reactnative.model.JSDisclosedDocument
import com.dsr.eudi.walletkit.reactnative.model.JSDocument
import com.dsr.eudi.walletkit.reactnative.model.JSDocumentOffer
import com.dsr.eudi.walletkit.reactnative.model.JSEudiWalletConfig
import com.dsr.eudi.walletkit.reactnative.model.JSIssueDocumentResult
import com.dsr.eudi.walletkit.reactnative.model.JSTransferEvent
import com.dsr.eudi.walletkit.reactnative.utils.CertUtils
import com.dsr.eudi.walletkit.reactnative.utils.JsonUtils
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import eu.europa.ec.eudi.iso18013.transfer.DisclosedDocuments
import eu.europa.ec.eudi.iso18013.transfer.ResponseResult
import eu.europa.ec.eudi.iso18013.transfer.TransferEvent
import eu.europa.ec.eudi.iso18013.transfer.response.DeviceResponse
import eu.europa.ec.eudi.iso18013.transfer.response.Response
import eu.europa.ec.eudi.wallet.EudiWallet
import eu.europa.ec.eudi.wallet.EudiWalletConfig
import eu.europa.ec.eudi.wallet.document.DeleteDocumentResult
import eu.europa.ec.eudi.wallet.issue.openid4vci.IssueEvent
import eu.europa.ec.eudi.wallet.issue.openid4vci.Offer
import eu.europa.ec.eudi.wallet.issue.openid4vci.OfferResult
import eu.europa.ec.eudi.wallet.issue.openid4vci.OpenId4VciManager
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import java.io.File
import kotlin.io.encoding.Base64
import kotlin.io.encoding.ExperimentalEncodingApi
import kotlin.io.encoding.decodingWith

private const val MODULE_NAME = "EudiWalletModule"

@ReactModule(name = MODULE_NAME)
class WalletModule(private val reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName() = MODULE_NAME

  private val scope = CoroutineScope(Dispatchers.Default)

  @ReactMethod
  fun initialize(configMap: ReadableMap, promise: Promise) {
    scope.launch {
      try {
        val config = JsonUtils.convertMapToObject(configMap.toHashMap(), JSEudiWalletConfig::class.java)

        val configBuilder = EudiWalletConfig.Builder(reactContext)
          .encryptDocumentsInStorage(true)

        configBuilder.apply {
          config.documentsStorageDir?.let { documentsStorageDir(File(it)) }
          config.useHardwareToStoreKeys?.let { useHardwareToStoreKeys(it) }
          config.userAuthenticationRequired?.let { userAuthenticationRequired(it) }
          config.userAuthenticationTimeOut?.let { userAuthenticationTimeOut(it.toLong()) }
          config.verifyMsoPublicKey?.let { verifyMsoPublicKey(it) }
          config.openId4VciConfig?.let { openId4VciConfig(openId4VciConfig = it.toOpenId4VciConfig()) }
          config.openId4VpConfig?.let { openId4VpConfig(it.toOpenId4VpConfig()) }
          config.trustedReaderCertificates?.let {
            val trustedCerts = it.map { encodedCert -> CertUtils.createX509CertificateFromPem(encodedCert) }
            trustedReaderCertificates(trustedCerts)
          }
          config.bleConfig?.let {
            bleTransferMode(it.transferMode)
            bleClearCacheEnabled(it.clearCacheAfterTransfer)
          }
        }

        EudiWallet.init(reactContext, configBuilder.build())
        this@WalletModule.addTransferEventListener()

        promise.resolve(null)
      }
      catch (error: Throwable) {
        promise.reject(
          MODULE_NAME,
          "Error on initializing EUDI wallet: ${error.message}",
          error
        )
      }
    }
  }

  @ReactMethod
  fun getDocuments(promise: Promise) {
    scope.launch {
      try {
        val documentsList = EudiWallet.getDocuments()

        val resultArray = Arguments.createArray().apply {
          documentsList.forEach {
            val documentMap = JsonUtils.convertObjectToMap(JSDocument.fromDocument(it))
            pushMap(documentMap)
          }
        }

        promise.resolve(resultArray)
      }
      catch (error: Throwable) {
        promise.reject(
          MODULE_NAME,
          "Error on getting documents: ${error.message}",
          error
        )
      }
    }
  }

  @ReactMethod
  fun getDocumentById(documentId: String, promise: Promise) {
    scope.launch {
      try {
        val document = EudiWallet.getDocumentById(documentId)
        val resultMap = if(document != null) JsonUtils.convertObjectToMap(JSDocument.fromDocument(document)) else null
        promise.resolve(resultMap)
      }
      catch (error: Throwable) {
        promise.reject(
          MODULE_NAME,
          "Error on getting document by id: ${error.message}",
          error
        )
      }
    }
  }

  @ReactMethod
  fun deleteDocumentById(documentId: String, promise: Promise) {
    scope.launch {
      try {
        when(val result = EudiWallet.deleteDocumentById(documentId)) {
          is DeleteDocumentResult.Success -> {
            promise.resolve(null)
          }
          is DeleteDocumentResult.Failure -> {
            val error = result.throwable
            promise.reject(MODULE_NAME, "Document deletion failed: ${error.message}", error)
          }
        }
      }
      catch (error: Throwable) {
        promise.reject(
          MODULE_NAME,
          "Error on deleting document by id: ${error.message}",
          error
        )
      }
    }
  }

  @ReactMethod
  fun issueDocumentByDocType(docType: String, promise: Promise) {
    scope.launch {
      try {
        val issueDocumentEventListener = this@WalletModule.createIssueDocumentEventListener(promise)
        EudiWallet.issueDocumentByDocType(docType, null, onEvent = issueDocumentEventListener)
      }
      catch (error: Throwable) {
        promise.reject(
          MODULE_NAME,
          "Error on issuing document: ${error.message}",
          error
        )
      }
    }
  }

  @ReactMethod
  fun issueDocumentByOfferUri(offerUri: String, promise: Promise) {
    scope.launch {
      try {
        val issueDocumentEventListener = this@WalletModule.createIssueDocumentEventListener(promise)
        EudiWallet.issueDocumentByOfferUri(offerUri, null, onEvent = issueDocumentEventListener)
      }
      catch (error: Throwable) {
        promise.reject(
          MODULE_NAME,
          "Error on issuing document: ${error.message}",
          error
        )
      }
    }
  }

  @ReactMethod
  fun resolveDocumentOffer(offerUri: String, promise: Promise) {
    scope.launch {
      try {
        val handleSuccess = { offer: Offer ->
          val resultMap = JsonUtils.convertObjectToMap(JSDocumentOffer.fromDocumentOffer(offer))
          promise.resolve(resultMap)
        }

        val handleError = { error: Throwable ->
          val errorMessage = error.localizedMessage ?: "Unknown error"
          promise.reject(MODULE_NAME, "Error on resolving document offer: $errorMessage")
        }

        EudiWallet.resolveDocumentOffer(offerUri, null, onResult = { result ->
          when(result) {
            is OfferResult.Success -> handleSuccess(result.offer)
            is OfferResult.Failure -> handleError(result.error)
          }
        })
      }
      catch (error: Throwable) {
        promise.reject(
          MODULE_NAME,
          "Error on resolving document offer with URI ${offerUri}: ${error.message}",
          error
        )
      }
    }
  }

  @ReactMethod
  fun resumeOpenId4VciWithAuthorization(uri: String) {
    EudiWallet.resumeOpenId4VciWithAuthorization(uri)
  }

  @ReactMethod
  fun startRemotePresentation(url: String) {
    EudiWallet.resolveRequestUri(url)
  }

  @ReactMethod
  fun startProximityPresentation() {
    EudiWallet.startQrEngagement()
    EudiWallet.enableNFCEngagement(reactContext.currentActivity as ComponentActivity)
  }

  @ReactMethod
  fun sendResponse(disclosedDocumentsData: ReadableArray, promise: Promise) {
    scope.launch {
      try {
        val disclosedDocumentsList = disclosedDocumentsData.toArrayList().map {
          JsonUtils.convertMapToObject(it as HashMap<String, Any>, JSDisclosedDocument::class.java).toDisclosedDocument()
        }
        val disclosedDocuments = DisclosedDocuments(disclosedDocumentsList)

        val handleSuccess = { response: Response ->
          when(response) {
            is DeviceResponse -> {
              promise.resolve(null)
            }
          }
        }

        val handleError = { error: Throwable ->
          val errorMessage = error.localizedMessage ?: "Unknown error"
          promise.reject(MODULE_NAME, "Error on sending presentation response: $errorMessage")
        }

        when(val result = EudiWallet.sendResponse(disclosedDocuments)) {
          is ResponseResult.Success -> handleSuccess(result.response)
          is ResponseResult.Failure -> handleError(result.throwable)
          is ResponseResult.UserAuthRequired -> {

            val onAuthSuccess = {
              when(val retryResult = EudiWallet.sendResponse(disclosedDocuments)) {
                is ResponseResult.Success -> handleSuccess(retryResult.response)
                is ResponseResult.Failure -> handleError(retryResult.throwable)
                // We don't want to repeat user auth on retry
                is ResponseResult.UserAuthRequired -> handleError(Error("User authentication was re-requested after success"))
              }
            }

            authenticateWithBiometry(
              result.cryptoObject,
              onSuccess = onAuthSuccess,
              onCanceled = { handleError(Error("Cancelled by user")) },
              onError = handleError
            )
          }
        }
      }
      catch (error: Throwable) {
        promise.reject(
          MODULE_NAME,
          "Error on sending presentation response: ${error.message}",
          error
        )
      }
    }
  }

  @ReactMethod
  fun stopPresentation(sendSessionTerminationMessage: Boolean, useTransportSpecificSessionTermination: Boolean) {
    scope.launch {
      EudiWallet.stopPresentation(sendSessionTerminationMessage, useTransportSpecificSessionTermination)
      EudiWallet.disableNFCEngagement(reactContext.currentActivity as ComponentActivity)
    }
  }

  @OptIn(ExperimentalEncodingApi::class)
  @ReactMethod
  fun loadSampleData(sampleDataFile: String = "eudi_sample_data", promise: Promise) {
    scope.launch {
      try {
        val sampleResId = reactContext.resources.getIdentifier(sampleDataFile, "raw", reactContext.packageName)

        reactContext.resources.openRawResource(sampleResId).use {
          val sampleData =  it.decodingWith(Base64.Mime).readBytes()
          EudiWallet.loadSampleData(sampleData)
        }

        promise.resolve(null)
      }
      catch (error: Throwable) {
        promise.reject(
          MODULE_NAME,
          "Error on loading sample data: ${error.message}",
          error
        )
      }
    }
  }

  private fun addTransferEventListener() {
    val proxyEventsModule =
      reactContext.getNativeModule(ProxyEventsModule::class.java)
        ?: throw Error("Error on adding transfer event listener: ProxyEventsModule is not defined")

    val eventListener = TransferEvent.Listener { event: TransferEvent ->
      proxyEventsModule.sendEvent(JSTransferEvent.fromTransferEvent(event))
    }

    EudiWallet.addTransferEventListener(eventListener)
  }

  private fun createIssueDocumentEventListener(promise: Promise): OpenId4VciManager.OnIssueEvent {
    var documentCount = 0

    val handleSuccess = { documentIds: List<String> ->
      val result = JSIssueDocumentResult(
        totalCount = documentCount,
        issuedCount = documentIds.size,
        issuedDocumentIds = documentIds
      )
      val resultMap = JsonUtils.convertObjectToMap(result)
      promise.resolve(resultMap)
    }

    val handleError = { error: Throwable ->
      val errorMessage = error.localizedMessage ?: "Unknown error"
      promise.reject(MODULE_NAME, "Error on issuing document: $errorMessage")
    }

    return OpenId4VciManager.OnIssueEvent { event: IssueEvent ->
      when (event) {
        is IssueEvent.Started -> { documentCount = event.total }
        is IssueEvent.Finished -> handleSuccess(event.issuedDocuments)
        is IssueEvent.Failure -> handleError(event.cause)
        is IssueEvent.DocumentRequiresUserAuth -> {
          authenticateWithBiometry(
            event.cryptoObject,
            onSuccess = { event.resume() },
            onCanceled = { handleError(Error("Cancelled by user")) },
            onError = handleError
          )
        }
        // Ignore events related to specific documents
        is IssueEvent.DocumentIssued -> {}
        is IssueEvent.DocumentFailed -> {}
      }
    }
  }

  private fun authenticateWithBiometry(
    cryptoObject: BiometricPrompt.CryptoObject?,
    onSuccess: () -> Unit,
    onCanceled: () -> Unit,
    onError: (Throwable) -> Unit
  ) {
    scope.launch(Dispatchers.Main) {
      showBiometricPrompt(
        activity = reactContext.currentActivity as FragmentActivity,
        title = "Confirm action",
        subtitle = "User authentication is required to proceed",
        cryptoObject = cryptoObject,
        userAuthenticationTypes = setOf(UserAuthenticationType.BIOMETRIC, UserAuthenticationType.LSKF),
        requireConfirmation = false,
        onSuccess = onSuccess,
        onCanceled = onCanceled,
        onError = onError
      )
    }
  }
}
