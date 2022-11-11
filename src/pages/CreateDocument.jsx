import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useMsal, useAccount, useIsAuthenticated } from '@azure/msal-react'
import { InteractionRequiredAuthError } from '@azure/msal-browser'
import { b2cPolicies, protectedResources } from '../services/authConfig'

import { Col, Row, Form } from 'react-bootstrap'

import { callApiPostWithToken } from '../services/fetch'

export const CreateDocument = () => {
  const isAuthenticated = useIsAuthenticated()
  const { instance, inProgress, accounts } = useMsal()
  const account = useAccount(accounts[0] || {})
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    documentDate: new Date(),
    documentType: 'VACCINE_PROOF',
    notes: '',
  })

  useEffect(() => {
    if (!isAuthenticated && inProgress === 'none') {
      navigate('/')
    }
  }, [isAuthenticated, inProgress, instance, formData, navigate])

  const updateFormData = (ev, fieldName) => {
    const newFormData = { ...formData }
    switch (fieldName) {
      case 'DocumentDate': {
        setFormData({ ...newFormData, documentDate: ev.target.value })
        break
      }
      case 'Notes': {
        setFormData({ ...newFormData, notes: ev.target.value })
        break
      }
      case 'DocumentType': {
        setFormData({ ...newFormData, documentType: ev.target.value })
        break
      }
      default:
        return
    }
  }

  const createDocument = () => {
    const authority =
      account?.idTokenClaims.idp === 'google.com'
        ? b2cPolicies.authorities.googleSignIn
        : b2cPolicies.authorities.emailSignIn
    instance
      .acquireTokenSilent({
        scopes: authority.scopes,
        account: account,
        authority: authority.authority,
      })
      .then((response) => {
        callApiPostWithToken(response.accessToken, `${protectedResources.documentsAPI.endpoint}/DocumentItems`, {
          ...formData,
        }).then((response) => {
          setFormData({
            documentDate: new Date(),
            documentType: 'VACCINE_PROOF',
            notes: '',
          })
          navigate('/documents')
        })
      })
      .catch((error) => {
        // in case if silent token acquisition fails, fallback to an interactive method
        if (error instanceof InteractionRequiredAuthError) {
          if (account && inProgress === 'none') {
            instance
              .acquireTokenRedirect(authority)
              .then((response) => {
                callApiPostWithToken(
                  response.accessToken,
                  `${protectedResources.documentsAPI.endpoint}/DocumentItems`,
                  { ...formData }
                ).then((response) => {
                  // setHelloData(response)
                  setFormData({
                    documentDate: new Date(),
                    documentType: 'VACCINE_PROOF',
                    notes: '',
                  })
                  navigate('/documents')
                })
              })
              .catch((error) => console.log(error))
          }
        }
      })
  }

  return (
    <Col style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '500' }}>
      <h2 className="mb-4">Create New Document</h2>
      <Form>
        <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
          <Form.Label>Document Date</Form.Label>
          <Form.Control
            type="date"
            value={formData.documentDate}
            onChange={(ev) => updateFormData(ev, 'DocumentDate')}
          />
        </Form.Group>
        <Form.Group className="mb-4" controlId="exampleForm.ControlSelect1">
          <Form.Label>Document Type</Form.Label>
          <Form.Control as="select" value={formData.documentType} onChange={(ev) => updateFormData(ev, 'DocumentType')}>
            <option value={'VACCINE_PROOF'}>VACCINE PROOF</option>
            <option value={'NEGATIVE_TEST'}>NEGATIVE TEST</option>
            <option value={'OTHER_DOCUMENT'}>OTHER DOCUMENT</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-4" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Document Notes</Form.Label>
          <Form.Control as="textarea" rows={3} value={formData.notes} onChange={(ev) => updateFormData(ev, 'Notes')} />
        </Form.Group>
      </Form>
      <Row className="d-flex justify-content-between px-1">
        <button className="login-button reg" onClick={() => navigate(-1)}>
          Back
        </button>
        <button onClick={createDocument} className="login-button log">
          Create
        </button>
      </Row>
    </Col>
  )
}
