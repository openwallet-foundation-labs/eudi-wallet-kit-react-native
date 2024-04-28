import Foundation

typealias JSONDictionary = [String: Any?]

enum RuntimeError: Error {
    case error(_ msg: String)
}
