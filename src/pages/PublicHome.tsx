import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase, Post } from '../config/supabase'
import { PublicPostCard } from '../components/Post/PublicPostCard'
import { BackgroundDecoration } from '../components/Layout/BackgroundDecoration'
import '../styles/pixel-art.css'

export const PublicHome: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const loadPosts = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profile:profiles(*)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error('Error cargando posts:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPosts()
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FFE4B5 0%, #FFF8DC 100%)',
      padding: '20px',
      position: 'relative'
    }}>
      {/* Fondo decorativo */}
      <BackgroundDecoration />

      {/* Contenido principal */}
      <div style={{
        position: 'relative',
        zIndex: 10
      }}>
        {/* Header con botones de autenticación */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '700px',
          margin: '0 auto 30px',
          padding: '20px',
          background: 'var(--pixel-white)',
          border: '4px solid var(--pixel-black)',
          boxShadow: '6px 6px 0 var(--pixel-black)'
        }}>
        <div style={{ textAlign: 'center', flex: 1 }}>
          <div style={{ fontSize: '40px', marginBottom: '10px' }}>🐝</div>
          <h1 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: 'var(--pixel-black)',
            margin: 0
          }}>
            LITTLE HUMMINGBIRD
          </h1>
          <p style={{ fontSize: '10px', color: 'var(--pixel-brown)', margin: '5px 0 0' }}>
            Explora posts
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => navigate('/login')}
            style={{
              padding: '12px 20px',
              border: '4px solid var(--pixel-black)',
              background: '#4169E1',
              color: 'var(--pixel-white)',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: 'bold',
              boxShadow: '3px 3px 0 var(--pixel-black)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translate(-2px, -2px)'
              e.currentTarget.style.boxShadow = '5px 5px 0 var(--pixel-black)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translate(0, 0)'
              e.currentTarget.style.boxShadow = '3px 3px 0 var(--pixel-black)'
            }}
          >
            INICIAR SESIÓN
          </button>

          <button
            onClick={() => navigate('/register')}
            style={{
              padding: '12px 20px',
              border: '4px solid var(--pixel-black)',
              background: '#32CD32',
              color: 'var(--pixel-white)',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: 'bold',
              boxShadow: '3px 3px 0 var(--pixel-black)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translate(-2px, -2px)'
              e.currentTarget.style.boxShadow = '5px 5px 0 var(--pixel-black)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translate(0, 0)'
              e.currentTarget.style.boxShadow = '3px 3px 0 var(--pixel-black)'
            }}
          >
            REGISTRARSE
          </button>
        </div>
      </div>

      {/* Posts */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '20px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '700px'
        }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <div className="pixel-loading" style={{ margin: '0 auto' }}></div>
              <p style={{ fontSize: '10px', marginTop: '10px' }}>CARGANDO...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="pixel-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '40px', margin: '0 auto 20px' }}>🐝</div>
              <p style={{ fontSize: '10px' }}>No hay posts aún. ¡Registrate y sé el primero!</p>
            </div>
          ) : (
            posts.map((post) => (
              <PublicPostCard key={post.id} post={post} />
            ))
          )}
        </div>
      </div>
      </div>
    </div>
  )
}

