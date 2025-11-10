import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { SidebarProvider } from './contexts/SidebarContext'
import { BackgroundDecoration } from './components/Layout/BackgroundDecoration'
import { Login } from './components/Auth/Login'
import { Register } from './components/Auth/Register'
import { Home } from './pages/Home'
import { PublicHome } from './pages/PublicHome'
import { Profile } from './pages/Profile'
import { MyPosts } from './pages/MyPosts'
import './styles/pixel-art.css'

// Componente para rutas protegidas
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div className="pixel-loading" style={{ margin: '0 auto 20px' }}></div>
          <p style={{ fontSize: '10px' }}>CARGANDO...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

// Componente para rutas públicas (login/register)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div className="pixel-loading" style={{ margin: '0 auto 20px' }}></div>
          <p style={{ fontSize: '10px' }}>CARGANDO...</p>
        </div>
      </div>
    )
  }

  if (user) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

function AppRoutes() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      
      {/* Ruta pública para ver posts */}
      <Route path="/explore" element={<PublicHome />} />

      {/* Rutas protegidas */}
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/my-posts" element={<ProtectedRoute><MyPosts /></ProtectedRoute>} />

      {/* Ruta por defecto */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SidebarProvider>
          <div className="app-container" style={{ position: 'relative' }}>
            <BackgroundDecoration />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <AppRoutes />
            </div>
          </div>
        </SidebarProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

