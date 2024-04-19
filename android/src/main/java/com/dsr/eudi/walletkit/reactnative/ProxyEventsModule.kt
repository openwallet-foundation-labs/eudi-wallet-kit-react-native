package com.dsr.eudi.walletkit.reactnative

import com.dsr.eudi.walletkit.reactnative.utils.JsonUtils
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.modules.core.DeviceEventManagerModule

private const val MODULE_NAME = "EudiWalletProxyEventsModule"

@ReactModule(name = MODULE_NAME)
class ProxyEventsModule(private val reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName() = MODULE_NAME

  companion object {
    private const val PROXY_EVENT_TYPE = "EudiWalletProxyEvent"
  }

  override fun getConstants(): MutableMap<String, Any> {
    return mutableMapOf(
      "PROXY_EVENT_TYPE" to PROXY_EVENT_TYPE
    )
  }

  fun sendEvent(event: Any) {
    reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java).emit(
      PROXY_EVENT_TYPE, JsonUtils.convertObjectToMap(event)
    )
  }
}
