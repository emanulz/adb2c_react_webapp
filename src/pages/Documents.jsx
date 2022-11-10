import { useEffect, useState } from 'react'

import { MsalAuthenticationTemplate, useMsal, useAccount } from '@azure/msal-react'
import { InteractionRequiredAuthError, InteractionType } from '@azure/msal-browser'

import { loginRequest, protectedResources } from '../services/authConfig'
import { callApiWithToken } from '../services/fetch'
import { DocumentsList } from '../components/DocumentsList'

const DocumentsContent = () => {

  const { instance, accounts, inProgress } = useMsal()
  const account = useAccount(accounts[0] || {})
  const [documents, setDocuments] = useState()

  useEffect(() => {
    const authority = `https://emanueltesting.b2clogin.com/emanueltesting.onmicrosoft.com/${account.idTokenClaims.tfp}`
    if (account && inProgress === 'none' && !documents) {
      instance
        .acquireTokenSilent({
          scopes: protectedResources.documentsAPI.scopes,
          account: account,
          authority: authority,
        })
        .then((response) => {
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
                .acquireTokenRedirect({
                  scopes: protectedResources.documentsAPI.scopes,
                  authority: authority,
                })
                .then((response) => {
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
  }, [account, inProgress, instance, documents])

  return <>{documents ? <DocumentsList documents={documents} /> : null}</>
}

export const DocumentsListPage = () => {
  const authRequest = {
    ...loginRequest,
  }

  return (
    <MsalAuthenticationTemplate interactionType={InteractionType.Redirect} authenticationRequest={authRequest}>
      <DocumentsContent />
    </MsalAuthenticationTemplate>
  )
}
