import React, { useEffect, useState } from 'react'
import { Sidebar } from '../components/Layout/Sidebar'
import { CreatePost } from '../components/Post/CreatePost'
import { PostCard } from '../components/Post/PostCard'
import { supabase, Post } from '../config/supabase'
import { useSidebar } from '../contexts/SidebarContext'
import '../styles/pixel-art.css'

export const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const { isMinimized } = useSidebar()

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
        <CreatePost onPostCreated={loadPosts} />

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div className="pixel-loading" style={{ margin: '0 auto' }}></div>
            <p style={{ fontSize: '10px', marginTop: '10px' }}>CARGANDO...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="pixel-card" style={{ textAlign: 'center' }}>
            <div className="bee" style={{ margin: '0 auto 20px' }}></div>
            <p style={{ fontSize: '10px' }}>No hay posts aún. ¡Sé el primero en publicar!</p>
          </div>
        ) : (
          posts.map((post) => (
            <PostCard key={post.id} post={post} onUpdate={loadPosts} />
          ))
        )}
        </div>
      </div>
    </div>
  )
}

