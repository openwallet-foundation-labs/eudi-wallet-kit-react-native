export enum BLETransferMode {
  BLE_SERVER_PERIPHERAL_MODE = 1 << 0,
  BLE_CLIENT_CENTRAL_MODE = 1 << 1,
}

export interface BLEConfig {
  transferMode: BLETransferMode
  clearCacheAfterTransfer?: boolean
}
