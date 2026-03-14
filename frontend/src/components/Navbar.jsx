import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav style={{
      backgroundColor: '#2c3e50',
      padding: '15px 30px',
      display: 'flex',
      alignItems: 'center',
      gap: '30px'
    }}>
      <span style={{ color: 'white', fontWeight: 'bold', fontSize: '20px' }}>
        🏥 MediTrack
      </span>
      <Link to="/" style={linkStyle}>Patients</Link>
      <Link to="/doctors" style={linkStyle}>Doctors</Link>
      <Link to="/appointments" style={linkStyle}>Appointments</Link>
    </nav>
  )
}

const linkStyle = {
  color: '#ecf0f1',
  textDecoration: 'none',
  fontSize: '16px',
  fontWeight: '500'
}

export default Navbar