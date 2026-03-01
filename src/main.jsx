import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './components/Auth/AuthProvider';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';

import React, { StrictMode, useState } from 'react'
import './index.css'
import LoginPage from './pages/Login'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Error from './pages/Error'
import Layout from './components/Layout'
import App from './App'

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
        element: <Layout />,
        children :[
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
        ],
    },
    {
        element: <Layout />,
        children :[
            {
                path: '*',
                element : (
                    <Error />
                ),
            },
        ],
    },
]);

const root = createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);