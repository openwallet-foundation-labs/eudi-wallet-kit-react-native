# EUDI Wallet React Native Example App

Minimal example of EUDI Wallet Kit React Native usage.

### Features

- Very basic Wallet UI (Document list, Scan and Proximity presentation screens)
- Adding documents using OID4VCI and EUDI wallet demo issuer
- Document presentation using OID4VP
  - Remote presentation via QR code scan, can be tested with EUDI wallet demo web verifier
  - Proximity presentation (both QR code and NFC engagement), can be tested with EUDI App Verifier
  - **Note:** There is no proper presentation screen, so it's not possible to view requested/disclosed fields specifically - only to share/not share data as a whole

## Install dependencies

```
yarn install
```

## Run

- Android
```bash
yarn android
```

- iOS
```bash
yarn ios
```
