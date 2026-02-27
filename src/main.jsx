import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import LoginPage from './pages/Login'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Error from './pages/Error'
import Layout from './components/Layout'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} /> 
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>,
)
