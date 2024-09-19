// Copyright (c) 2024 DSR Corporation, Denver, Colorado.
// https://www.dsr-corporation.com
// SPDX-License-Identifier: Apache-2.0

import Foundation

@objc(EudiWalletProxyEventsModule)
class ProxyEventsModule: RCTEventEmitter {
    private static var _emitter: RCTEventEmitter!
    
    private static let PROXY_EVENT_TYPE = "EudiWalletProxyEvent"
    
    override init() {
        super.init()
        ProxyEventsModule._emitter = self
    }
    
    open override func supportedEvents() -> [String] {
        [ProxyEventsModule.PROXY_EVENT_TYPE]
    }
    
    static func sendEvent(event: JSTransferEvent) {
        self._emitter.sendEvent(withName: PROXY_EVENT_TYPE, body: event.asProxyEventPayload)
    }
}
