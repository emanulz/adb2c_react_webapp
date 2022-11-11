// import { LogLevel } from '@azure/msal-browser'
import * as msal from '@azure/msal-browser'

// Cast env vars
let CUSTOM_DOMAIN_NAME = process.env.REACT_APP_ADB2C_CUSTOM_DOMAIN_NAME
let TENANT_NAME = process.env.REACT_APP_ADB2C_TENANT_NAME
let EMAIL_LOGIN_FLOW = process.env.REACT_APP_ADB2C_EMAIL_LOGIN_FLOW
let GOOGLE_LOGIN_FLOW = process.env.REACT_APP_ADB2C_EMAIL_LOGIN_FLOW
let EMAIL_EDIT_PROFILE_FLOW = process.env.REACT_APP_ADB2C_EMAIL_EDIT_PROFILE_FLOW
let GOOGLE_EDIT_PROFILE_FLOW = process.env.REACT_APP_ADB2C_GOOGLE_EDIT_PROFILE_FLOW
let DOCUMENTS_API_ENDPOINT = process.env.REACT_APP_DOCUMENTS_API_ENDPOINT

let LOGIN_REDIRECT_URL = process.env.REACT_APP_ADB2C_LOGIN_REDIRECT_URL
let LOGOUT_REDIRECT_URL = process.env.REACT_APP_ADB2C_LOGOUT_REDIRECT_URL

let AUTHORITY_BASE = ''
let AUTHORITY_DOMAIN = ''

if (CUSTOM_DOMAIN_NAME) {
  AUTHORITY_BASE = `https://${CUSTOM_DOMAIN_NAME}/${TENANT_NAME}.onmicrosoft.com`
  AUTHORITY_DOMAIN = CUSTOM_DOMAIN_NAME
} else {
  AUTHORITY_BASE = `https://${TENANT_NAME}.b2clogin.com/${TENANT_NAME}.onmicrosoft.com`
  AUTHORITY_DOMAIN = `${TENANT_NAME}.b2clogin.com`
}

// TODO: SCOPES REQUESTED ARE HARDCODED
export const protectedResources = {
  documentsAPI: {
    endpoint: DOCUMENTS_API_ENDPOINT.toString(),
    scopes: [
      `https://${TENANT_NAME}.onmicrosoft.com/documents/documents.read`,
      `https://${TENANT_NAME}.onmicrosoft.com/documents/documents.write`,
    ],
  },
}

export const b2cPolicies = {
  authorities: {
    emailSignIn: {
      authority: `${AUTHORITY_BASE}/${EMAIL_LOGIN_FLOW}`,
      scopes: [...protectedResources.documentsAPI.scopes],
    },
    googleSignIn: {
      authority: `${AUTHORITY_BASE}/${GOOGLE_LOGIN_FLOW}`,
      scopes: [...protectedResources.documentsAPI.scopes],
    },
    emailEditProfile: {
      authority: `${AUTHORITY_BASE}/${EMAIL_EDIT_PROFILE_FLOW}`,
      scopes: [...protectedResources.documentsAPI.scopes],
    },
    googleEditProfile: {
      authority: `${AUTHORITY_BASE}/${GOOGLE_EDIT_PROFILE_FLOW}`,
      scopes: [...protectedResources.documentsAPI.scopes],
    },
  },
  authorityDomain: AUTHORITY_DOMAIN,
}

const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_ADB2C_CLIENT_ID,
    knownAuthorities: [b2cPolicies.authorityDomain],
    redirectUri: LOGIN_REDIRECT_URL,
    postLogoutRedirectUri: LOGOUT_REDIRECT_URL,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: true,
  },
  // OPTIONAL LOGS CONFIG FOR DEV
  // system: {
  //   loggerOptions: {
  //     loggerCallback: (level, message, containsPii) => {
  //       if (containsPii) {
  //         return
  //       }
  //       switch (level) {
  //         case LogLevel.Error:
  //           console.error(message)
  //           return
  //         case LogLevel.Info:
  //           console.info(message)
  //           return
  //         case LogLevel.Verbose:
  //           console.debug(message)
  //           return
  //         case LogLevel.Warning:
  //           console.warn(message)
  //           return
  //         default:
  //           return
  //       }
  //     },
  //   },
  // },
}

const msalInstance = new msal.PublicClientApplication(msalConfig)

export { msalInstance }
