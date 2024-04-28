#import <React/RCTBridgeModule.h>
#import <Foundation/Foundation.h>

@interface RCT_EXTERN_MODULE(EudiWalletModule, NSObject)

RCT_EXTERN_METHOD(initialize:(NSDictionary *)configJson
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getDocuments:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getDocumentById:(NSString *)documentId
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(deleteDocumentById:(NSString *)documentId
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(issueDocument:(NSString *)docType
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(startRemotePresentation:(NSString *)url)

RCT_EXTERN_METHOD(startProximityPresentation)

RCT_EXTERN_METHOD(sendResponse:(NSArray *)disclosedDocuments
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(stopPresentation)

RCT_EXTERN_METHOD(loadSampleData:(NSString *)sampleDataFile
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getName)
{
    return @"EudiWalletModule";
}

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}


@end
