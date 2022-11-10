import { useMsal, useAccount } from '@azure/msal-react'

import { b2cPolicies } from '../services/authConfig'

export const Login = () => {
  const { instance, accounts, inProgress } = useMsal()
  const account = useAccount(accounts[0] || {})

  const handleEmailSignIn = async () => {
    console.log('INPROGRESS ', inProgress)
    console.log('ACCOUNT ', account)
    if (!account && inProgress === 'none') {
      await instance.loginRedirect(b2cPolicies.authorities.emailSignIn)
    }
  }
  const handleGoogleSignIn = async () => {
    await instance.loginRedirect(b2cPolicies.authorities.googleSignIn)
  }
  return (
    <center className="w-100">
      <br />
      <br />
      <br />
      <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '700' }}>Log In to Access the Content</h3>
      <br />
      <br />
      <br />
      <center className="mb-4">
        <button onClick={handleEmailSignIn} className="login-button reg">
          Login with Email
        </button>
      </center>
      <center>
        <button onClick={handleGoogleSignIn} className="login-button log">
          Login with Google
        </button>
      </center>
    </center>
  )
}
