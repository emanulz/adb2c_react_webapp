import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react'

import { Col, Row } from 'react-bootstrap'

import { NavigationBar } from './NavigationBar'
import { Login } from './Login'

import symcheckLogo from '../images/poweredBySymcheck.png'

export const PageLayout = (props) => {
  return (
    <Col className="w-100 h-100 d-flex flex-column">
      <NavigationBar className="w-100" />
      <Row className="flex-grow-1 m-0">
        <UnauthenticatedTemplate>
          <Login />
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
