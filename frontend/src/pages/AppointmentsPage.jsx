import { useState, useEffect } from 'react'
import { appointmentApi } from '../api/api'
import { patientApi } from '../api/api'
import { doctorApi } from '../api/api'

function AppointmentsPage() {
  const [appointments, setAppointments] = useState([])
  const [patients, setPatients] = useState([])
  const [doctors, setDoctors] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingAppointment, setEditingAppointment] = useState(null)
  const [form, setForm] = useState({
    patientId: '', doctorId: '', dateTime: '', notes: '', status: 'scheduled'
  })

  useEffect(() => {
    fetchAll()
  }, [])

  const fetchAll = async () => {
    const [apptRes, patRes, docRes] = await Promise.all([
      appointmentApi.getAll(),
      patientApi.getAll(),
      doctorApi.getAll()
    ])
    setAppointments(apptRes.data)
    setPatients(patRes.data)
    setDoctors(docRes.data)
  }

  const handleSubmit = async () => {
    if (editingAppointment) {
      await appointmentApi.update(editingAppointment.id, {
        dateTime: new Date(form.dateTime).toISOString(), // ← converts to UTC
        status: form.status,
        notes: form.notes
      })
    } else {
      await appointmentApi.create({
        patientId: parseInt(form.patientId),
        doctorId: parseInt(form.doctorId),
        dateTime: new Date(form.dateTime).toISOString(), // ← converts to UTC
        notes: form.notes
      })
    }
    setShowForm(false)
    setEditingAppointment(null)
    setForm({ patientId: '', doctorId: '', dateTime: '', notes: '', status: 'scheduled' })
    fetchAll()
  }

  const handleEdit = (appointment) => {
  setEditingAppointment(appointment)

  // Show local time in the form
  const localDateTime = new Date(appointment.dateTime)
  const localISO = new Date(localDateTime.getTime() - localDateTime.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16)

  setForm({
    patientId: appointment.patientId,
    doctorId: appointment.doctorId,
    dateTime: localISO,
    notes: appointment.notes || '',
    status: appointment.status
  })
  setShowForm(true)
}

  const handleDelete = async (id) => {
    if (window.confirm('Delete this appointment?')) {
      await appointmentApi.delete(id)
      fetchAll()
    }
  }

  const statusColor = (status) => {
    if (status === 'scheduled') return '#2980b9'
    if (status === 'completed') return '#27ae60'
    if (status === 'cancelled') return '#e74c3c'
    return '#95a5a6'
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Appointments</h2>
        <button onClick={() => setShowForm(!showForm)} style={btnStyle('#27ae60')}>
          + Book Appointment
        </button>
      </div>

      {showForm && (
        <div style={formStyle}>
          <h3>{editingAppointment ? 'Edit Appointment' : 'Book Appointment'}</h3>
          {!editingAppointment && (
            <>
              <select value={form.patientId}
                onChange={e => setForm({ ...form, patientId: e.target.value })} style={inputStyle}>
                <option value="">Select Patient</option>
                {patients.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <select value={form.doctorId}
                onChange={e => setForm({ ...form, doctorId: e.target.value })} style={inputStyle}>
                <option value="">Select Doctor</option>
                {doctors.map(d => (
                  <option key={d.id} value={d.id}>{d.name} — {d.specialization}</option>
                ))}
              </select>
            </>
          )}
          <input type="datetime-local" value={form.dateTime}
            onChange={e => setForm({ ...form, dateTime: e.target.value })} style={inputStyle} />
          {editingAppointment && (
            <select value={form.status}
              onChange={e => setForm({ ...form, status: e.target.value })} style={inputStyle}>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          )}
          <input placeholder="Notes" value={form.notes}
            onChange={e => setForm({ ...form, notes: e.target.value })} style={inputStyle} />
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handleSubmit} style={btnStyle('#2980b9')}>
              {editingAppointment ? 'Update' : 'Book'}
            </button>
            <button onClick={() => { setShowForm(false); setEditingAppointment(null) }} style={btnStyle('#95a5a6')}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <table style={tableStyle}>
        <thead>
          <tr style={{ backgroundColor: '#2c3e50', color: 'white' }}>
            <th style={thStyle}>Patient</th>
            <th style={thStyle}>Doctor</th>
            <th style={thStyle}>Date & Time</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Notes</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(a => (
            <tr key={a.id} style={{ backgroundColor: 'white' }}>
              <td style={tdStyle}>{a.patientName}</td>
              <td style={tdStyle}>{a.doctorName}</td>
              <td style={tdStyle}>{new Date(a.dateTime).toLocaleString()}</td>
              <td style={tdStyle}>
                <span style={{
                  backgroundColor: statusColor(a.status),
                  color: 'white',
                  padding: '3px 10px',
                  borderRadius: '12px',
                  fontSize: '12px'
                }}>
                  {a.status}
                </span>
              </td>
              <td style={tdStyle}>{a.notes}</td>
              <td style={tdStyle}>
                <button onClick={() => handleEdit(a)} style={btnStyle('#f39c12')}>Edit</button>
                {' '}
                <button onClick={() => handleDelete(a.id)} style={btnStyle('#e74c3c')}>Delete</button>
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

export default AppointmentsPage