import React, { useEffect, useState } from 'react'
import { Sidebar } from '../components/Layout/Sidebar'
import { PostCard } from '../components/Post/PostCard'
import { supabase, Post } from '../config/supabase'
import { useAuth } from '../contexts/AuthContext'
import { useSidebar } from '../contexts/SidebarContext'
import '../styles/pixel-art.css'

export const MyPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const { isMinimized } = useSidebar()

  const loadMyPosts = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profile:profiles(*)
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error('Error cargando mis posts:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMyPosts()
  }, [user?.id])

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
            📝 MIS POSTS
          </h1>
          <div style={{ fontSize: '10px', color: 'var(--pixel-gray)' }}>
            <span className="flower"></span>
            <span style={{ margin: '0 10px' }}>Tus publicaciones</span>
            <span className="flower"></span>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div className="pixel-loading" style={{ margin: '0 auto' }}></div>
            <p style={{ fontSize: '10px', marginTop: '10px' }}>CARGANDO...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="pixel-card" style={{ textAlign: 'center' }}>
            <div className="bee" style={{ margin: '0 auto 20px' }}></div>
            <p style={{ fontSize: '10px' }}>Aún no has publicado nada.</p>
            <p style={{ fontSize: '10px', marginTop: '10px', color: 'var(--pixel-gray)' }}>
              ¡Ve al inicio y crea tu primer post!
            </p>
          </div>
        ) : (
          <>
            <div className="pixel-card" style={{ textAlign: 'center', marginBottom: '20px' }}>
              <p style={{ fontSize: '10px' }}>
                📊 Total de posts: <strong>{posts.length}</strong>
              </p>
            </div>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} onUpdate={loadMyPosts} />
            ))}
          </>
        )}
        </div>
      </div>
    </div>
  )
}

