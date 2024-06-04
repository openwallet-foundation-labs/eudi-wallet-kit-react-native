import type { EudiWalletConfig } from '@openwallet-foundation/eudi-wallet-kit-react-native'

import {
  ClientIdSchemeType,
  EncryptionAlgorithm,
  EncryptionMethod,
} from '@openwallet-foundation/eudi-wallet-kit-react-native'

const TRUSTED_CERT_PEM = `-----BEGIN CERTIFICATE-----
MIIDHTCCAqOgAwIBAgIUVqjgtJqf4hUYJkqdYzi+0xwhwFYwCgYIKoZIzj0EAwMw
XDEeMBwGA1UEAwwVUElEIElzc3VlciBDQSAtIFVUIDAxMS0wKwYDVQQKDCRFVURJ
IFdhbGxldCBSZWZlcmVuY2UgSW1wbGVtZW50YXRpb24xCzAJBgNVBAYTAlVUMB4X
DTIzMDkwMTE4MzQxN1oXDTMyMTEyNzE4MzQxNlowXDEeMBwGA1UEAwwVUElEIElz
c3VlciBDQSAtIFVUIDAxMS0wKwYDVQQKDCRFVURJIFdhbGxldCBSZWZlcmVuY2Ug
SW1wbGVtZW50YXRpb24xCzAJBgNVBAYTAlVUMHYwEAYHKoZIzj0CAQYFK4EEACID
YgAEFg5Shfsxp5R/UFIEKS3L27dwnFhnjSgUh2btKOQEnfb3doyeqMAvBtUMlClh
sF3uefKinCw08NB31rwC+dtj6X/LE3n2C9jROIUN8PrnlLS5Qs4Rs4ZU5OIgztoa
O8G9o4IBJDCCASAwEgYDVR0TAQH/BAgwBgEB/wIBADAfBgNVHSMEGDAWgBSzbLiR
FxzXpBpmMYdC4YvAQMyVGzAWBgNVHSUBAf8EDDAKBggrgQICAAABBzBDBgNVHR8E
PDA6MDigNqA0hjJodHRwczovL3ByZXByb2QucGtpLmV1ZGl3LmRldi9jcmwvcGlk
X0NBX1VUXzAxLmNybDAdBgNVHQ4EFgQUs2y4kRcc16QaZjGHQuGLwEDMlRswDgYD
VR0PAQH/BAQDAgEGMF0GA1UdEgRWMFSGUmh0dHBzOi8vZ2l0aHViLmNvbS9ldS1k
aWdpdGFsLWlkZW50aXR5LXdhbGxldC9hcmNoaXRlY3R1cmUtYW5kLXJlZmVyZW5j
ZS1mcmFtZXdvcmswCgYIKoZIzj0EAwMDaAAwZQIwaXUA3j++xl/tdD76tXEWCikf
M1CaRz4vzBC7NS0wCdItKiz6HZeV8EPtNCnsfKpNAjEAqrdeKDnr5Kwf8BA7tATe
hxNlOV4Hnc10XO1XULtigCwb49RpkqlS2Hul+DpqObUs
-----END CERTIFICATE-----`

// Identical to Android EUDI reference wallet
export const walletConfig: EudiWalletConfig = {
  userAuthenticationRequired: true,
  openId4VpConfig: {
    scheme: 'eudi-openid4vp',
    encryptionAlgorithms: [EncryptionAlgorithm.ECDH_ES],
    encryptionMethods: [EncryptionMethod.A128CBC_HS256, EncryptionMethod.A256GCM],
    clientIdSchemes: [
      { type: ClientIdSchemeType.X509SanDns },
      {
        type: ClientIdSchemeType.Preregistered,
        preregisteredVerifiers: [
          { clientId: 'Verifier', verifierApi: 'https://verifier.eudiw.dev', legalName: 'EUDI Remote Verifier' },
        ],
      },
    ],
  },
  openId4VciConfig: {
    clientId: 'wallet-dev',
    issuerUrl: 'https://dev.issuer.eudiw.dev',
    authFlowRedirectUri: 'eudi-openid4ci://authorize',
  },
  trustedReaderCertificates: [TRUSTED_CERT_PEM],
}
