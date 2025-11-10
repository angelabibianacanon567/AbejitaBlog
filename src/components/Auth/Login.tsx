import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import '../../styles/pixel-art.css'

export const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signIn(email, password)
      navigate('/')
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="pixel-card" style={{ maxWidth: '400px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div className="bee" style={{ margin: '0 auto 20px' }}></div>
          <h1 style={{ fontSize: '20px', marginBottom: '10px' }}>🐝 LITTLE HUMMINGBIRD</h1>
          <p style={{ fontSize: '10px', color: 'var(--pixel-gray)' }}>INICIAR SESIÓN</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '10px', marginBottom: '8px' }}>
              EMAIL:
            </label>
            <input
              type="email"
              className="pixel-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '10px', marginBottom: '8px' }}>
              PASSWORD:
            </label>
            <input
              type="password"
              className="pixel-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          {error && (
            <div style={{
              padding: '10px',
              marginBottom: '20px',
              background: '#FF6B6B',
              border: '2px solid var(--pixel-black)',
              color: 'white',
              fontSize: '8px'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="pixel-button pixel-button-primary"
            style={{ width: '100%', marginBottom: '10px' }}
            disabled={loading}
          >
            {loading ? 'CARGANDO...' : 'ENTRAR'}
          </button>

          <button
            type="button"
            className="pixel-button"
            style={{ width: '100%' }}
            onClick={() => navigate('/register')}
            disabled={loading}
          >
            REGISTRARSE
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <span className="flower"></span>
          <span className="bee" style={{ margin: '0 10px' }}></span>
          <span className="flower"></span>
        </div>
      </div>
    </div>
  )
}

