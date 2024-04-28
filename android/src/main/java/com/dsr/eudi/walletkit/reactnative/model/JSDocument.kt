package com.dsr.eudi.walletkit.reactnative.model

import com.dsr.eudi.walletkit.reactnative.utils.JsonUtils
import com.google.gson.reflect.TypeToken
import eu.europa.ec.eudi.wallet.document.Document
import eu.europa.ec.eudi.wallet.document.nameSpacedDataJSONObject

data class JSDocument(
  val documentId: String,
  val docType: String,
  val name: String,
  val hardwareBacked: Boolean,
  val createdAt: Double,
  val requiresUserAuth: Boolean,
  val namespacedData: Map<String, Any>,
  val namespaces: Map<String, List<String>>
)
{
  companion object {
    fun fromDocument(document: Document): JSDocument {
      val namespacedData = JsonUtils.parseJson(document.nameSpacedDataJSONObject.toString(), object: TypeToken<HashMap<String, Any>>(){})

      return JSDocument(
        document.id,
        document.docType,
        document.name,
        document.hardwareBacked,
        document.createdAt.epochSecond.toDouble(),
        document.requiresUserAuth,
        namespacedData,
        document.nameSpaces
      )
    }
  }
}
