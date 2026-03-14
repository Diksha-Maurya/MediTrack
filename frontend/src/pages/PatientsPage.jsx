import { useState, useEffect } from 'react'
import { patientApi } from '../api/api'

function PatientsPage() {
  const [patients, setPatients] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingPatient, setEditingPatient] = useState(null)
  const [form, setForm] = useState({
    name: '', dob: '', gender: '', contact: '', bloodGroup: ''
  })

  useEffect(() => {
    fetchPatients()
  }, [])

  const fetchPatients = async () => {
    const res = await patientApi.getAll()
    setPatients(res.data)
  }

  const handleSubmit = async () => {
    if (editingPatient) {
      await patientApi.update(editingPatient.id, form)
    } else {
      await patientApi.create(form)
    }
    setShowForm(false)
    setEditingPatient(null)
    setForm({ name: '', dob: '', gender: '', contact: '', bloodGroup: '' })
    fetchPatients()
  }

  const handleEdit = (patient) => {
    setEditingPatient(patient)
    setForm({
      name: patient.name,
      dob: patient.dob,
      gender: patient.gender || '',
      contact: patient.contact || '',
      bloodGroup: patient.bloodGroup || ''
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Delete this patient?')) {
      await patientApi.delete(id)
      fetchPatients()
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Patients</h2>
        <button onClick={() => setShowForm(!showForm)} style={btnStyle('#27ae60')}>
          + Add Patient
        </button>
      </div>

      {showForm && (
        <div style={formStyle}>
          <h3>{editingPatient ? 'Edit Patient' : 'New Patient'}</h3>
          <input placeholder="Name" value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} />
          <input type="date" placeholder="Date of Birth" value={form.dob}
            onChange={e => setForm({ ...form, dob: e.target.value })} style={inputStyle} />
          <select value={form.gender}
            onChange={e => setForm({ ...form, gender: e.target.value })} style={inputStyle}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input placeholder="Contact" value={form.contact}
            onChange={e => setForm({ ...form, contact: e.target.value })} style={inputStyle} />
          <input placeholder="Blood Group" value={form.bloodGroup}
            onChange={e => setForm({ ...form, bloodGroup: e.target.value })} style={inputStyle} />
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handleSubmit} style={btnStyle('#2980b9')}>
              {editingPatient ? 'Update' : 'Create'}
            </button>
            <button onClick={() => { setShowForm(false); setEditingPatient(null) }} style={btnStyle('#95a5a6')}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <table style={tableStyle}>
        <thead>
          <tr style={{ backgroundColor: '#2c3e50', color: 'white' }}>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>DOB</th>
            <th style={thStyle}>Gender</th>
            <th style={thStyle}>Contact</th>
            <th style={thStyle}>Blood Group</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(p => (
            <tr key={p.id} style={{ backgroundColor: 'white' }}>
              <td style={tdStyle}>{p.name}</td>
              <td style={tdStyle}>{p.dob}</td>
              <td style={tdStyle}>{p.gender}</td>
              <td style={tdStyle}>{p.contact}</td>
              <td style={tdStyle}>{p.bloodGroup}</td>
              <td style={tdStyle}>
                <button onClick={() => handleEdit(p)} style={btnStyle('#f39c12')}>Edit</button>
                {' '}
                <button onClick={() => handleDelete(p.id)} style={btnStyle('#e74c3c')}>Delete</button>
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

export default PatientsPage