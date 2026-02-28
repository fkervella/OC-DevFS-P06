import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './components/Auth/AuthProvider';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';

import React, { StrictMode, useState } from 'react'
import './index.css'
import LoginPage from './pages/Login'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Error from './pages/Error'

function App() {
    
    const router = createBrowserRouter([
        {
            path: '/',
            element: <LoginPage />,
        },
        {
            path: '/login',
            element: <LoginPage />,
        },
        {
            path: '/dashboard', 
            element: (
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            ),
        },
        {
            path: '/profile',
            element: (
                <ProtectedRoute>
                    <Profile />
                </ProtectedRoute>
            ),
        },
        {
            path: '*',
            element : (
                <Error />
            ),
        },
    ]);

    const [token, setToken] = useState();

    return (
        <>
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
  </StrictMode>
        </>
    );
}

export default App