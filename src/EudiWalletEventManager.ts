import type { EudiWalletEventListener, TransferEvent } from './events'

import { NativeEventEmitter, NativeModules } from 'react-native'
import uuid from 'react-native-uuid'

const { EudiWalletProxyEventsModule } = NativeModules
const { PROXY_EVENT_TYPE } = EudiWalletProxyEventsModule.getConstants()

export abstract class EudiWalletEventManager {
  private static nativeEventEmitter: NativeEventEmitter = new NativeEventEmitter(EudiWalletProxyEventsModule)
  private static eventListeners: Map<string, EudiWalletEventListener> = new Map<string, EudiWalletEventListener>()

  public static start(): void {
    this.nativeEventEmitter.addListener(PROXY_EVENT_TYPE, (proxyEvent: TransferEvent) => {
      this.eventListeners.forEach((listener) => listener(proxyEvent))
    })
  }

  public static stop() {
    this.eventListeners.clear()
    this.nativeEventEmitter?.removeAllListeners(PROXY_EVENT_TYPE)
  }

  public static addEventListener(eventListener: EudiWalletEventListener): string {
    const listenerId = uuid.v4() as string
    this.eventListeners.set(listenerId, eventListener)
    return listenerId
  }

  public static removeEventListener(listenerId: string): void {
    if (!this.eventListeners.has(listenerId)) {
      throw new Error(`Cannot find event listener to remove (listenerId = ${listenerId}`)
    }

    this.eventListeners.delete(listenerId)
  }
}
