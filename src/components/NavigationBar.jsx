import { AuthenticatedTemplate, useMsal, useAccount } from '@azure/msal-react'
import { Link } from 'react-router-dom'

import Row from 'react-bootstrap/Row'

import Dropdown from 'react-bootstrap/Dropdown'
import Navbar from 'react-bootstrap/Navbar'

import { b2cPolicies } from '../services/authConfig'

export const NavigationBar = () => {
  const { instance, accounts } = useMsal()

  const account = useAccount(accounts[0] || {})

  return (
    <Row className="m-0" style={{ maxHeight: '100px' }}>
      <Navbar
        className="app-navBar w-100 d-flex flex-row align-items-center py-4 px-4 justify-content-between"
        variant="dark"
      >
        <Link className="navbar-brand flex-row align-items-center" to="/">
          <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '700', marginBottom: '0' }}>React Web APP</h4>
        </Link>
        <AuthenticatedTemplate>
          <div className="ml-auto">
            <Row className="pr-100">
              <Dropdown>
                <Dropdown.Toggle
                  variant="transparent"
                  id="dropdown-basic"
                  style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '700', color: 'white' }}
                >
                  Welcome, {account?.idTokenClaims?.given_name || account?.name || ''}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => instance.logoutRedirect({ postLogoutRedirectUri: '/', mainWindowRedirectUri: '/' })}
                  >
                    Logout
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => instance.loginRedirect(b2cPolicies.authorities.editProfile)}>
                    Edit Profile
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Row>
          </div>
        </AuthenticatedTemplate>
      </Navbar>
    </Row>
  )
}
