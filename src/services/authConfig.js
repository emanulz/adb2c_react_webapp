import { LogLevel } from '@azure/msal-browser'

export const b2cPolicies = {
  names: {
    signUpSignIn: 'B2C_1_react_login',
    forgotPassword: 'B2C_1_react_reset_password',
    editProfile: 'B2C_1_react_edit_profile',
  },
  authorities: {
    signUpSignIn: {
      authority: 'https://emanueltesting.b2clogin.com/emanueltesting.onmicrosoft.com/B2C_1_react_login_phone',
    },
    forgotPassword: {
      authority: 'https://emanueltesting.b2clogin.com/emanueltesting.onmicrosoft.com/B2C_1_react_reset_password',
    },
    editProfile: {
      authority: 'https://emanueltesting.b2clogin.com/emanueltesting.onmicrosoft.com/B2C_1_react_edit_profile_email',
    },
  },
  authorityDomain: 'emanueltesting.b2clogin.com',
}

export const msalConfig = {
  auth: {
    clientId: '80c57815-f27c-4952-8809-d1ec869d2e50',
    authority: b2cPolicies.authorities.signUpSignIn.authority,
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

export const protectedResources = {
  documentsAPI: {
    endpoint: 'https://localhost:7178/api',
    scopes: [
      'https://emanueltesting.onmicrosoft.com/documents-api/documents.read',
      'https://emanueltesting.onmicrosoft.com/documents-api/documents.write',
    ],
  },
}

export const loginRequestEmail = {
  scopes: [...protectedResources.documentsAPI.scopes],
  authority: 'https://emanueltesting.b2clogin.com/emanueltesting.onmicrosoft.com/B2C_1_react_login_email',
}

export const loginRequest = {
  scopes: [...protectedResources.documentsAPI.scopes],
  authority: 'https://emanueltesting.b2clogin.com/emanueltesting.onmicrosoft.com/B2C_1_react_login_phone',
}
