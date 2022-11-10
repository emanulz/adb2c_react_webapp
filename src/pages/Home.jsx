import { Link } from 'react-router-dom'

export const HomePage = () => {
  const ButtonClass = {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '500',
    minWidth: '300px',
    marginTop: '30px',
  }
  return (
    <center>
      <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '700' }}>SELECT AN ACTION</h2>
      <Link to="documents">
        <button style={ButtonClass} className="login-button reg">
          List All User Documents
        </button>
      </Link>
      <br />
      <Link to="documents/create">
        <button style={ButtonClass} className="login-button log">
          Create New Document
        </button>
      </Link>
    </center>
  )
}
