import { LogLevel } from '@azure/msal-browser'

let AUTHORITY_BASE = ''
let AUTHORITY_DOMAIN = ''

if (process.env.ADB2C_CUSTOM_DOMAIN_NAME) {
  AUTHORITY_BASE = `https://${process.env.ADB2C_CUSTOM_DOMAIN_NAME}/${process.env.ADB2C_TENANT_NAME}.onmicrosoft.com`
  AUTHORITY_DOMAIN = process.env.ADB2C_CUSTOM_DOMAIN_NAME
} else {
  AUTHORITY_BASE = `https://${process.env.ADB2C_TENANT_NAME}/.b2clogin.com/${process.env.ADB2C_TENANT_NAME}.onmicrosoft.com`
  AUTHORITY_DOMAIN = `${process.env.ADB2C_TENANT_NAME}/.b2clogin.com`
}

// TODO: SCOPES REQUESTED ARE HARDCODED
export const protectedResources = {
  documentsAPI: {
    endpoint: process.env.DOCUMENTS_API_ENDPOINT,
    scopes: [
      `https://${process.env.ADB2C_TENANT_NAME}.onmicrosoft.com/documents-api/documents.read`,
      `https://${process.env.ADB2C_TENANT_NAME}.onmicrosoft.com/documents-api/documents.write`,
    ],
  },
}

export const b2cPolicies = {
  authorities: {
    emailSignIn: {
      authority: `${AUTHORITY_BASE}/${process.env.ADB2C_EMAIL_LOGIN_FLOW}`,
      scopes: [...protectedResources.documentsAPI.scopes],
    },
    phoneSignIn: {
      authority: `${AUTHORITY_BASE}/${process.env.ADB2C_EMAIL_LOGIN_FLOW}`,
      scopes: [...protectedResources.documentsAPI.scopes],
    },
    emailEditProfile: {
      authority: `${AUTHORITY_BASE}/${process.env.ADB2C_EMAIL_EDIT_PROFILE_FLOW}`,
      scopes: [...protectedResources.documentsAPI.scopes],
    },
    phoneEditProfile: {
      authority: `${AUTHORITY_BASE}/${process.env.ADB2C_PHONE_EDIT_PROFILE_FLOW}`,
      scopes: [...protectedResources.documentsAPI.scopes],
    },
  },
  authorityDomain: AUTHORITY_DOMAIN,
}

export const msalConfig = {
  auth: {
    clientId: process.env.ADB2C_CLIENT_ID,
    knownAuthorities: [b2cPolicies.authorityDomain],
    redirectUri: '/',
    postLogoutRedirectUri: '/',
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: true,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message)
            return
          case LogLevel.Info:
            console.info(message)
            return
          case LogLevel.Verbose:
            console.debug(message)
            return
          case LogLevel.Warning:
            console.warn(message)
            return
          default:
            return
        }
      },
    },
  },
}
