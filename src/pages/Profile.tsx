import React, { useState } from 'react'
import { Sidebar } from '../components/Layout/Sidebar'
import { useAuth } from '../contexts/AuthContext'
import { useSidebar } from '../contexts/SidebarContext'
import { supabase } from '../config/supabase'
import '../styles/pixel-art.css'

export const Profile: React.FC = () => {
  const { profile, user } = useAuth()
  const { isMinimized } = useSidebar()
  const [displayName, setDisplayName] = useState(profile?.display_name || '')
  const [bio, setBio] = useState(profile?.bio || '')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          display_name: displayName,
          bio: bio,
          updated_at: new Date().toISOString()
        })
        .eq('id', user?.id)

      if (error) throw error
      setMessage('✅ Perfil actualizado correctamente')
    } catch (error: any) {
      setMessage('❌ Error al actualizar: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const isMobile = window.innerWidth < 768

  return (
    <div style={{ minHeight: '100vh' }}>
      <Sidebar />
      
      <div style={{
        marginLeft: isMobile ? '0' : (isMinimized ? '90px' : '280px'),
        marginTop: isMobile ? '80px' : '0',
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        transition: 'margin-left 0.3s ease',
        minHeight: '100vh'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '700px'
        }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '30px',
          padding: '20px'
        }}>
          <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>
            👤 MI PERFIL
          </h1>
        </div>

        <div className="pixel-card">
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div className="pixel-avatar" style={{
              width: '80px',
              height: '80px',
              fontSize: '40px',
              margin: '0 auto 20px'
            }}>
              {profile?.display_name?.[0]?.toUpperCase() || '?'}
            </div>
            <h2 style={{ fontSize: '14px', marginBottom: '5px' }}>
              {profile?.display_name}
            </h2>
            <p style={{ fontSize: '10px', color: 'var(--pixel-gray)' }}>
              @{profile?.username}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '10px', marginBottom: '8px' }}>
                NOMBRE:
              </label>
              <input
                type="text"
                className="pixel-input"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                disabled={loading}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '10px', marginBottom: '8px' }}>
                BIO:
              </label>
              <textarea
                className="pixel-textarea"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                disabled={loading}
                placeholder="Cuéntanos sobre ti..."
                style={{ minHeight: '80px' }}
              />
            </div>

            {message && (
              <div style={{
                padding: '10px',
                marginBottom: '20px',
                background: message.includes('✅') ? 'var(--pixel-green)' : '#FF6B6B',
                border: '2px solid var(--pixel-black)',
                color: 'white',
                fontSize: '8px'
              }}>
                {message}
              </div>
            )}

            <button
              type="submit"
              className="pixel-button pixel-button-primary"
              style={{ width: '100%' }}
              disabled={loading}
            >
              {loading ? 'GUARDANDO...' : '💾 GUARDAR CAMBIOS'}
            </button>
          </form>

          <div style={{ marginTop: '30px', textAlign: 'center' }}>
            <span className="flower"></span>
            <span className="bee" style={{ margin: '0 10px' }}></span>
            <span className="flower"></span>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

