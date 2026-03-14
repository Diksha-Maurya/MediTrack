import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import PatientsPage from './pages/PatientsPage'
import DoctorsPage from './pages/DoctorsPage'
import AppointmentsPage from './pages/AppointmentsPage'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<PatientsPage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App