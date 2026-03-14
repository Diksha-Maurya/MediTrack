import { useState, useEffect } from 'react'
import { doctorApi } from '../api/api'

function DoctorsPage() {
  const [doctors, setDoctors] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingDoctor, setEditingDoctor] = useState(null)
  const [form, setForm] = useState({
    name: '', specialization: '', email: ''
  })

  useEffect(() => {
    fetchDoctors()
  }, [])

  const fetchDoctors = async () => {
    const res = await doctorApi.getAll()
    setDoctors(res.data)
  }

  const handleSubmit = async () => {
    if (editingDoctor) {
      await doctorApi.update(editingDoctor.id, form)
    } else {
      await doctorApi.create(form)
    }
    setShowForm(false)
    setEditingDoctor(null)
    setForm({ name: '', specialization: '', email: '' })
    fetchDoctors()
  }

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor)
    setForm({
      name: doctor.name,
      specialization: doctor.specialization || '',
      email: doctor.email
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Delete this doctor?')) {
      await doctorApi.delete(id)
      fetchDoctors()
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Doctors</h2>
        <button onClick={() => setShowForm(!showForm)} style={btnStyle('#27ae60')}>
          + Add Doctor
        </button>
      </div>

      {showForm && (
        <div style={formStyle}>
          <h3>{editingDoctor ? 'Edit Doctor' : 'New Doctor'}</h3>
          <input placeholder="Name" value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} />
          <input placeholder="Specialization" value={form.specialization}
            onChange={e => setForm({ ...form, specialization: e.target.value })} style={inputStyle} />
          <input placeholder="Email" value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} />
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handleSubmit} style={btnStyle('#2980b9')}>
              {editingDoctor ? 'Update' : 'Create'}
            </button>
            <button onClick={() => { setShowForm(false); setEditingDoctor(null) }} style={btnStyle('#95a5a6')}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <table style={tableStyle}>
        <thead>
          <tr style={{ backgroundColor: '#2c3e50', color: 'white' }}>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Specialization</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map(d => (
            <tr key={d.id} style={{ backgroundColor: 'white' }}>
              <td style={tdStyle}>{d.name}</td>
              <td style={tdStyle}>{d.specialization}</td>
              <td style={tdStyle}>{d.email}</td>
              <td style={tdStyle}>
                <button onClick={() => handleEdit(d)} style={btnStyle('#f39c12')}>Edit</button>
                {' '}
                <button onClick={() => handleDelete(d.id)} style={btnStyle('#e74c3c')}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const btnStyle = (color) => ({
  backgroundColor: color,
  color: 'white',
  border: 'none',
  padding: '8px 16px',
  borderRadius: '4px',
  cursor: 'pointer'
})

const formStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  marginBottom: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  maxWidth: '400px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
}

const inputStyle = {
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ddd',
  fontSize: '14px'
}

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
}

const thStyle = {
  padding: '12px',
  textAlign: 'left'
}

const tdStyle = {
  padding: '12px',
  borderBottom: '1px solid #eee'
}

export default DoctorsPage