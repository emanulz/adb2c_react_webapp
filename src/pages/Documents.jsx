import { useEffect, useState } from 'react'

import { MsalAuthenticationTemplate, useMsal, useAccount } from '@azure/msal-react'
import { InteractionRequiredAuthError, InteractionType } from '@azure/msal-browser'

import { b2cPolicies, protectedResources } from '../services/authConfig'
import { callApiWithToken } from '../services/fetch'
import { DocumentsList } from '../components/DocumentsList'

const DocumentsContent = () => {
  const { instance, accounts, inProgress } = useMsal()
  const account = useAccount(accounts[0] || {})
  const [documents, setDocuments] = useState()

  const authority =
    account?.idTokenClaims.idp === 'google.com'
      ? b2cPolicies.authorities.googleSignIn
      : b2cPolicies.authorities.emailSignIn

  useEffect(() => {
    if (account && inProgress === 'none' && !documents) {
      instance
        .acquireTokenSilent({
          scopes: authority.scopes,
          account: account,
          authority: authority.authority,
        })
        .then((response) => {
          console.log('RESPONSE ', response)
          callApiWithToken(response.accessToken, `${protectedResources.documentsAPI.endpoint}/DocumentItems`).then(
            (response) => {
              setDocuments(response)
              console.log(response)
            }
          )
        })
        .catch((error) => {
          // in case if silent token acquisition fails, fallback to an interactive method
          if (error instanceof InteractionRequiredAuthError) {
            if (account && inProgress === 'none') {
              instance
                .acquireTokenRedirect(authority)
                .then((response) => {
                  console.log('RESPONSE REDIRECT ', response)
                  callApiWithToken(
                    response.accessToken,
                    `${protectedResources.documentsAPI.endpoint}/DocumentItems`
                  ).then((response) => {
                    console.log(response)
                    setDocuments(response)
                  })
                })
                .catch((error) => console.log(error))
            }
          }
        })
    }
  }, [account, inProgress, instance, documents, authority])

  return <>{documents ? <DocumentsList documents={documents} /> : null}</>
}

export const DocumentsListPage = () => {
  const { accounts } = useMsal()
  const account = useAccount(accounts[0] || {})

  const authority =
    account.idTokenClaims.idp === 'google' ? b2cPolicies.authorities.googleSignIn : b2cPolicies.authorities.emailSignIn

  return (
    <MsalAuthenticationTemplate interactionType={InteractionType.Redirect} authenticationRequest={authority}>
      <DocumentsContent />
    </MsalAuthenticationTemplate>
  )
}
