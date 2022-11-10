import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react'

import { loginRequest, loginRequestEmail } from '../services/authConfig'
import { Col, Row } from 'react-bootstrap'

import { NavigationBar } from './NavigationBar'

import symcheckLogo from '../images/poweredBySymcheck.png'

export const PageLayout = (props) => {
  /**
   * Most applications will need to conditionally render certain components based on whether a user is signed in or not.
   * msal-react provides 2 easy ways to do this. AuthenticatedTemplate and UnauthenticatedTemplate components will
   * only render their children if a user is authenticated or unauthenticated, respectively.
   */
  const { instance } = useMsal()

  const handleLogin = () => {
    instance.loginRedirect(loginRequest).catch((error) => console.log(error))
  }
  const handleLoginEmail = () => {
    instance.loginRedirect(loginRequestEmail).catch((error) => console.log(error))
  }
  return (
    <Col className="w-100 h-100 d-flex flex-column">
      <NavigationBar className="w-100" />
      <Row className="flex-grow-1 m-0">
        <UnauthenticatedTemplate>
          <center className="w-100">
            <br />
            <br />
            <br />
            <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '700' }}>Log In to Access the Content</h3>
            <br />
            <br />
            <center>
              <button onClick={handleLogin} className="login-button log">
                Login with Phone
              </button>
            </center>
            <br />
            <center>
              <button onClick={handleLoginEmail} className="login-button reg">
                Login with Email
              </button>
            </center>
          </center>
        </UnauthenticatedTemplate>

        <AuthenticatedTemplate className="flex-grow-1">
          <Col className="p-4">{props.children}</Col>
        </AuthenticatedTemplate>
      </Row>
      <Row className="m-0" style={{ maxHeight: '100px', padding: '40px 0' }}>
        <center className="w-100">
          <img src={symcheckLogo} alt="Powered by Symcheck" />
        </center>
      </Row>
    </Col>
  )
}
