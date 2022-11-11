import '../styles/App.css'

import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import { Row } from 'react-bootstrap'
import { useMsal, useAccount } from '@azure/msal-react'

export const DocumentsList = (props) => {
  const { accounts } = useMsal()
  const account = useAccount(accounts[0] || {})

  const ButtonClass = {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '500',
    minWidth: '100px',
  }

  const tableRows = props.documents.map((document, index) => {
    return (
      <tr key={index}>
        <td>{document.id}</td>
        <td>{document.documentType}</td>
        <td>{new Date(document.documentDate).toISOString().split('T')[0]}</td>
        <td>{document.notes}</td>
      </tr>
    )
  })

  return (
    <>
      <div className="d-flex justify-content-between f-flow-row">
        <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '700' }}>Document List</h2>
        <Link to="/documents/create">
          <button style={ButtonClass} className="login-button log m-0">
            Add Document
          </button>
        </Link>
      </div>
      <h5>User: {account?.idTokenClaims?.given_name || account?.name || ''}</h5>
      <br />
      <div className="data-area-div">
        <Table style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '500' }} striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Type</th>
              <th>Document Date</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </Table>
      </div>
    </>
  )
}
