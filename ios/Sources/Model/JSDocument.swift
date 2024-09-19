// Copyright (c) 2024 DSR Corporation, Denver, Colorado.
// https://www.dsr-corporation.com
// SPDX-License-Identifier: Apache-2.0

import MdocDataModel18013
import SwiftCBOR
import OrderedCollections
import AnyCodable

struct JSDocument: Encodable {
    let id: String
    let docType: String
    let name: String
    let createdAt: Int?
    let namespaces: [String]
    let namespacedData: [String: AnyCodable]
    
    init(id: String, mdocModel: MdocDecodable) {
        self.id = id
        self.docType = mdocModel.docType
        self.name = mdocModel.title
        // TODO: Find a way to resolve createdAt timestamp
        self.createdAt = nil
        self.namespaces = mdocModel.nameSpaces ?? [String]()
        self.namespacedData = mdocModel.toJson(base64: false).mapValues {
            let orderedDictionary = $0 as! OrderedDictionary<String, Any>
            
            // We need to convert OrderedDictionary to a regular one in order to get proper serialization output on JS side
            // See https://github.com/apple/swift-collections/issues/12#issuecomment-816277180
            let convertedDictionary = SerializationUtils.convertOrderedDictionaryToDictionary(orderedDict: orderedDictionary)
            
            return AnyCodable(convertedDictionary)
        }
    }
}
