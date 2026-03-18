import { Link } from 'react-router-dom'

function Navbar({ user, onLogout }) {
  return (
    <nav style={{
      backgroundColor: '#2c3e50',
      padding: '15px 30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
        <span style={{ color: 'white', fontWeight: 'bold', fontSize: '20px' }}>
          🏥 MediTrack
        </span>
        <Link to="/" style={linkStyle}>Patients</Link>
        <Link to="/doctors" style={linkStyle}>Doctors</Link>
        <Link to="/appointments" style={linkStyle}>Appointments</Link>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <span style={{ color: '#ecf0f1', fontSize: '14px' }}>
          👤 {user?.fullName}
        </span>
        <button onClick={onLogout} style={logoutBtn}>
          Logout
        </button>
      </div>
    </nav>
  )
}

const linkStyle = {
  color: '#ecf0f1',
  textDecoration: 'none',
  fontSize: '16px',
  fontWeight: '500'
}

const logoutBtn = {
  backgroundColor: '#e74c3c',
  color: 'white',
  border: 'none',
  padding: '6px 14px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px'
}

export default Navbar