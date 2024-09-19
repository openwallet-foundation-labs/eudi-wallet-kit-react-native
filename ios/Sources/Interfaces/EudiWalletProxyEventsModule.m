// Copyright (c) 2024 DSR Corporation, Denver, Colorado.
// https://www.dsr-corporation.com
// SPDX-License-Identifier: Apache-2.0

#import <React/RCTBridgeModule.h>
#import <Foundation/Foundation.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(EudiWalletProxyEventsModule, RCTEventEmitter)

RCT_EXTERN_METHOD(supportedEvents)

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getName)
{
    return @"EudiWalletProxyEventsModule";
}

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

- (NSDictionary *)constantsToExport
{
    return @{ @"PROXY_EVENT_TYPE": @"EudiWalletProxyEvent" };
}

@end
