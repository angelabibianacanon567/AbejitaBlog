import React, { useState } from 'react'
import { Post } from '../../config/supabase'
import { supabase } from '../../config/supabase'
import { useAuth } from '../../contexts/AuthContext'
import '../../styles/pixel-art.css'

interface PostCardProps {
  post: Post
  onUpdate: () => void
}

export const PostCard: React.FC<PostCardProps> = ({ post, onUpdate }) => {
  const [commentContent, setCommentContent] = useState('')
  const [comments, setComments] = useState<any[]>([])
  const [isLiked, setIsLiked] = useState(false)
  const [showCommentInput, setShowCommentInput] = useState(false)
  const { user } = useAuth()

  const handleLike = async () => {
    try {
      if (isLiked) {
        // Quitar like
        await supabase
          .from('likes')
          .delete()
          .eq('post_id', post.id)
          .eq('user_id', user?.id)
      } else {
        // Dar like
        await supabase
          .from('likes')
          .insert([{ post_id: post.id, user_id: user?.id }])
      }
      setIsLiked(!isLiked)
      onUpdate()
    } catch (error) {
      console.error('Error al dar like:', error)
    }
  }

  const handleRepost = async () => {
    try {
      await supabase
        .from('reposts')
        .insert([{ post_id: post.id, user_id: user?.id }])
      onUpdate()
    } catch (error) {
      console.error('Error al repostear:', error)
    }
  }

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentContent.trim()) return

    try {
      await supabase
        .from('comments')
        .insert([{
          post_id: post.id,
          user_id: user?.id,
          content: commentContent
        }])
      
      setCommentContent('')
      loadComments()
      onUpdate()
    } catch (error) {
      console.error('Error al comentar:', error)
    }
  }

  const loadComments = async () => {
    try {
      const { data } = await supabase
        .from('comments')
        .select(`
          *,
          profile:profiles(*)
        `)
        .eq('post_id', post.id)
        .order('created_at', { ascending: true })
      
      setComments(data || [])
    } catch (error) {
      console.error('Error cargando comentarios:', error)
    }
  }

  React.useEffect(() => {
    // Cargar comentarios automáticamente
    loadComments()
    
    // Verificar si el usuario ya dio like
    const checkLike = async () => {
      const { data } = await supabase
        .from('likes')
        .select('id')
        .eq('post_id', post.id)
        .eq('user_id', user?.id)
        .single()
      
      setIsLiked(!!data)
    }
    checkLike()
  }, [post.id, user?.id])
  
  // Componente de corazón pixel art
  const PixelHeart: React.FC<{ filled: boolean }> = ({ filled }) => (
    <svg width="16" height="16" viewBox="0 0 16 16" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <rect x="2" y="2" width="2" height="2" fill={filled ? "#FF1744" : "#666"} />
      <rect x="4" y="2" width="2" height="2" fill={filled ? "#FF1744" : "#666"} />
      <rect x="10" y="2" width="2" height="2" fill={filled ? "#FF1744" : "#666"} />
      <rect x="12" y="2" width="2" height="2" fill={filled ? "#FF1744" : "#666"} />
      <rect x="0" y="4" width="2" height="2" fill={filled ? "#FF5252" : "#888"} />
      <rect x="2" y="4" width="2" height="2" fill={filled ? "#FF1744" : "#666"} />
      <rect x="4" y="4" width="2" height="2" fill={filled ? "#FF1744" : "#666"} />
      <rect x="6" y="4" width="2" height="2" fill={filled ? "#FF1744" : "#666"} />
      <rect x="8" y="4" width="2" height="2" fill={filled ? "#FF1744" : "#666"} />
      <rect x="10" y="4" width="2" height="2" fill={filled ? "#FF1744" : "#666"} />
      <rect x="12" y="4" width="2" height="2" fill={filled ? "#FF1744" : "#666"} />
      <rect x="14" y="4" width="2" height="2" fill={filled ? "#FF5252" : "#888"} />
      <rect x="0" y="6" width="2" height="2" fill={filled ? "#FF5252" : "#888"} />
      <rect x="2" y="6" width="2" height="2" fill={filled ? "#FF1744" : "#666"} />
      <rect x="4" y="6" width="2" height="2" fill={filled ? "#FF1744" : "#666"} />
      <rect x="6" y="6" width="2" height="2" fill={filled ? "#FF1744" : "#666"} />
      <rect x="8" y="6" width="2" height="2" fill={filled ? "#FF1744" : "#666"} />
      <rect x="10" y="6" width="2" height="2" fill={filled ? "#FF1744" : "#666"} />
      <rect x="12" y="6" width="2" height="2" fill={filled ? "#FF1744" : "#666"} />
      <rect x="14" y="6" width="2" height="2" fill={filled ? "#FF5252" : "#888"} />
      <rect x="2" y="8" width="2" height="2" fill={filled ? "#FF5252" : "#888"} />
      <rect x="4" y="8" width="2" height="2" fill={filled ? "#FF1744" : "#666"} />
      <rect x="6" y="8" width="2" height="2" fill={filled ? "#FF1744" : "#666"} />
      <rect x="8" y="8" width="2" height="2" fill={filled ? "#FF1744" : "#666"} />
      <rect x="10" y="8" width="2" height="2" fill={filled ? "#FF1744" : "#666"} />
      <rect x="12" y="8" width="2" height="2" fill={filled ? "#FF5252" : "#888"} />
      <rect x="4" y="10" width="2" height="2" fill={filled ? "#FF5252" : "#888"} />
      <rect x="6" y="10" width="2" height="2" fill={filled ? "#FF1744" : "#666"} />
      <rect x="8" y="10" width="2" height="2" fill={filled ? "#FF1744" : "#666"} />
      <rect x="10" y="10" width="2" height="2" fill={filled ? "#FF5252" : "#888"} />
      <rect x="6" y="12" width="2" height="2" fill={filled ? "#FF5252" : "#888"} />
      <rect x="8" y="12" width="2" height="2" fill={filled ? "#FF5252" : "#888"} />
    </svg>
  )
  
  // Componente de burbuja de comentario pixel art
  const PixelComment: React.FC = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <rect x="0" y="2" width="14" height="10" fill="#4CAF50" stroke="#000" strokeWidth="1" />
      <rect x="2" y="12" width="2" height="2" fill="#4CAF50" stroke="#000" strokeWidth="1" />
      <rect x="4" y="5" width="6" height="1" fill="#fff" />
      <rect x="4" y="7" width="6" height="1" fill="#fff" />
      <rect x="4" y="9" width="4" height="1" fill="#fff" />
    </svg>
  )
  
  // Componente de flechas de repost pixel art
  const PixelRepost: React.FC = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <rect x="2" y="4" width="2" height="2" fill="#2196F3" />
      <rect x="4" y="2" width="2" height="2" fill="#2196F3" />
      <rect x="6" y="4" width="6" height="2" fill="#2196F3" />
      <rect x="12" y="6" width="2" height="2" fill="#2196F3" />
      <rect x="10" y="8" width="2" height="2" fill="#2196F3" />
      <rect x="8" y="10" width="2" height="2" fill="#2196F3" />
      <rect x="2" y="10" width="6" height="2" fill="#2196F3" />
      <rect x="4" y="12" width="2" height="2" fill="#2196F3" />
    </svg>
  )

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="post-card">
      {/* Header del post */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
        <div className="pixel-avatar" style={{ marginRight: '10px' }}>
          {post.profile?.display_name?.[0]?.toUpperCase() || '?'}
        </div>
        <div>
          <div style={{ fontSize: '10px', fontWeight: 'bold' }}>
            {post.profile?.display_name || 'Usuario'}
          </div>
          <div style={{ fontSize: '8px', color: 'var(--pixel-gray)' }}>
            @{post.profile?.username || 'unknown'} • {formatDate(post.created_at)}
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div style={{ fontSize: '10px', marginBottom: '15px', lineHeight: '1.5' }}>
        {post.content}
      </div>

      {/* Media */}
      {post.media_urls && post.media_urls.length > 0 && (
        <div style={{ marginBottom: '15px' }}>
          {post.media_urls.map((url, idx) => {
            const type = post.media_types?.[idx]
            if (type === 'image') {
              return (
                <img
                  key={idx}
                  src={url}
                  alt="Post media"
                  style={{
                    width: '100%',
                    border: '4px solid var(--pixel-black)',
                    marginBottom: '10px',
                    imageRendering: 'pixelated'
                  }}
                />
              )
            } else if (type === 'video') {
              return (
                <video
                  key={idx}
                  controls
                  style={{
                    width: '100%',
                    border: '4px solid var(--pixel-black)',
                    marginBottom: '10px'
                  }}
                >
                  <source src={url} />
                </video>
              )
            } else if (type === 'audio') {
              return (
                <audio
                  key={idx}
                  controls
                  style={{
                    width: '100%',
                    marginBottom: '10px'
                  }}
                >
                  <source src={url} />
                </audio>
              )
            }
            return null
          })}
        </div>
      )}

      {/* Acciones */}
      <div style={{
        display: 'flex',
        gap: '8px',
        borderTop: '3px solid var(--pixel-black)',
        paddingTop: '15px',
        marginTop: '15px'
      }}>
        <button
          onClick={handleLike}
          style={{
            flex: 1,
            padding: '10px',
            border: '3px solid var(--pixel-black)',
            background: isLiked ? '#FFE0E0' : 'var(--pixel-white)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
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
          <PixelHeart filled={isLiked} />
          <span>{post.likes_count}</span>
        </button>
        
        <button
          onClick={() => setShowCommentInput(!showCommentInput)}
          style={{
            flex: 1,
            padding: '10px',
            border: '3px solid var(--pixel-black)',
            background: 'var(--pixel-white)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
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
          <PixelComment />
          <span>{post.comments_count}</span>
        </button>
        
        <button
          onClick={handleRepost}
          style={{
            flex: 1,
            padding: '10px',
            border: '3px solid var(--pixel-black)',
            background: 'var(--pixel-white)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
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
          <PixelRepost />
          <span>{post.reposts_count}</span>
        </button>
      </div>

      {/* Formulario de comentario */}
      {showCommentInput && (
        <div style={{
          marginTop: '15px',
          paddingTop: '15px',
          borderTop: '2px solid var(--pixel-light-gray)'
        }}>
          <form onSubmit={handleComment}>
            <input
              type="text"
              className="pixel-input"
              placeholder="Escribe un comentario..."
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              style={{ marginBottom: '10px' }}
            />
            <button
              type="submit"
              className="pixel-button pixel-button-primary"
              style={{ width: '100%', fontSize: '9px' }}
            >
              💬 COMENTAR
            </button>
          </form>
        </div>
      )}

      {/* Comentarios existentes - SIEMPRE VISIBLES */}
      {comments.length > 0 && (
        <div style={{
          marginTop: '15px',
          paddingTop: '15px',
          borderTop: '3px solid var(--pixel-black)'
        }}>
          <div style={{ 
            fontSize: '10px', 
            fontWeight: 'bold', 
            marginBottom: '10px',
            color: 'var(--pixel-brown)'
          }}>
            💬 COMENTARIOS ({comments.length})
          </div>
          {comments.map((comment) => (
            <div key={comment.id} style={{
              padding: '12px',
              marginBottom: '8px',
              background: 'linear-gradient(135deg, #FFF8DC 0%, #FFE4B5 100%)',
              border: '3px solid var(--pixel-black)',
              boxShadow: '2px 2px 0 var(--pixel-black)',
              borderRadius: '0'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                marginBottom: '8px',
                gap: '8px'
              }}>
                <div 
                  className="pixel-avatar" 
                  style={{ 
                    width: '24px', 
                    height: '24px', 
                    fontSize: '12px',
                    flexShrink: 0
                  }}
                >
                  {comment.profile?.display_name?.[0]?.toUpperCase() || '?'}
                </div>
                <div style={{ fontSize: '9px', fontWeight: 'bold' }}>
                  {comment.profile?.display_name || 'Usuario'}
                </div>
              </div>
              <div style={{ 
                fontSize: '9px',
                lineHeight: '1.4',
                paddingLeft: '32px'
              }}>
                {comment.content}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

