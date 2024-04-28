import OrderedCollections

struct SerializationUtils {
    // TODO: Check if there is a better way to do this
    static func convertOrderedDictionaryToDictionary(orderedDict: OrderedDictionary<String, Any>) -> Dictionary<String, Any> {
        let keyValuePairs = orderedDict.elements.map {
            if let nestedDict = $0.value as? OrderedDictionary<String, Any> {
                let convertedNestedDict = self.convertOrderedDictionaryToDictionary(orderedDict: nestedDict)
                return ($0.key, convertedNestedDict as Any)
            }
            
            if let nestedDictArray = $0.value as? [OrderedDictionary<String, Any>] {
                let convertedNestedDictArray = nestedDictArray.map { self.convertOrderedDictionaryToDictionary(orderedDict: $0) }
                return ($0.key, convertedNestedDictArray as Any)
            }
            
            return ($0.key, $0.value)
        }
        
        return Dictionary<String, Any>(uniqueKeysWithValues: keyValuePairs)
    }
}
