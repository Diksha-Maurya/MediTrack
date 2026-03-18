import { useState } from 'react'
import { authApi } from '../api/api'

function LoginPage({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false)
  const [form, setForm] = useState({ fullName: '', email: '', password: '' })
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    try {
      if (isRegister) {
        await authApi.register(form)
        setIsRegister(false)
        setError('Registered! Please login.')
      } else {
        const res = await authApi.login(form)
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user', JSON.stringify(res.data))
        onLogin(res.data)
      }
    } catch (err) {
       if (err.response?.status === 401) {
      alert('Incorrect email or password. Please try again.')
    } else {
      alert('Something went wrong. Please try again.')
    }
    }
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>
          🏥 MediTrack
        </h2>
        <h3 style={{ marginBottom: '20px' }}>
          {isRegister ? 'Create Account' : 'Sign In'}
        </h3>

        {error && (
          <div style={{ color: '#e74c3c', marginBottom: '10px', fontSize: '14px' }}>
            {error}
          </div>
        )}

        {isRegister && (
          <input
            placeholder="Full Name"
            value={form.fullName}
            onChange={e => setForm({ ...form, fullName: e.target.value })}
            style={inputStyle}
          />
        )}
        <input
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          style={inputStyle}
        />

        <button onClick={handleSubmit} style={btnStyle}>
          {isRegister ? 'Register' : 'Login'}
        </button>

        <p style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
          {isRegister ? 'Already have an account?' : "Don't have an account?"}
          {' '}
          <span
            onClick={() => { setIsRegister(!isRegister); setError('') }}
            style={{ color: '#2980b9', cursor: 'pointer' }}
          >
            {isRegister ? 'Sign In' : 'Register'}
          </span>
        </p>
      </div>
    </div>
  )
}

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: '#f4f6f8'
}

const cardStyle = {
  backgroundColor: 'white',
  padding: '40px',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '380px'
}

const inputStyle = {
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #ddd',
  fontSize: '14px',
  width: '100%',
  marginBottom: '12px'
}

const btnStyle = {
  backgroundColor: '#2c3e50',
  color: 'white',
  border: 'none',
  padding: '12px',
  borderRadius: '6px',
  fontSize: '16px',
  cursor: 'pointer',
  width: '100%'
}

export default LoginPage