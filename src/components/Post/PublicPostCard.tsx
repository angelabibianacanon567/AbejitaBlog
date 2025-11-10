import React, { useState, useEffect } from 'react'
import { Post, supabase } from '../../config/supabase'
import '../../styles/pixel-art.css'

interface PublicPostCardProps {
  post: Post
}

export const PublicPostCard: React.FC<PublicPostCardProps> = ({ post }) => {
  const [comments, setComments] = useState<any[]>([])
  const [loadingComments, setLoadingComments] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / 60000)

    if (diffMinutes < 1) return 'Ahora'
    if (diffMinutes < 60) return `${diffMinutes}m`
    const diffHours = Math.floor(diffMinutes / 60)
    if (diffHours < 24) return `${diffHours}h`
    const diffDays = Math.floor(diffHours / 24)
    if (diffDays < 7) return `${diffDays}d`
    
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Cargar comentarios al montar
  useEffect(() => {
    loadComments()
  }, [post.id])

  const loadComments = async () => {
    try {
      setLoadingComments(true)
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
    } finally {
      setLoadingComments(false)
    }
  }

  // Componente de corazón pixel art (igual al Home)
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

  const PixelComment: React.FC = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <rect x="0" y="2" width="14" height="10" fill="#4CAF50" stroke="#000" strokeWidth="1" />
      <rect x="2" y="12" width="2" height="2" fill="#4CAF50" stroke="#000" strokeWidth="1" />
      <rect x="4" y="4" width="2" height="2" fill="#000" />
      <rect x="8" y="4" width="2" height="2" fill="#000" />
      <rect x="2" y="8" width="10" height="2" fill="#000" />
    </svg>
  )

  const PixelRepost: React.FC = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <rect x="1" y="3" width="6" height="2" fill="#FF9800" stroke="#000" strokeWidth="1" />
      <rect x="6" y="1" width="2" height="4" fill="#FF9800" stroke="#000" strokeWidth="1" />
      <rect x="9" y="11" width="6" height="2" fill="#FF9800" stroke="#000" strokeWidth="1" />
      <rect x="8" y="9" width="2" height="4" fill="#FF9800" stroke="#000" strokeWidth="1" />
      <rect x="3" y="6" width="2" height="5" fill="#FF9800" stroke="#000" strokeWidth="1" />
      <rect x="11" y="6" width="2" height="5" fill="#FF9800" stroke="#000" strokeWidth="1" />
    </svg>
  )

  return (
    <div className="pixel-card" style={{
      marginBottom: '20px',
      padding: '20px',
      background: 'var(--pixel-white)',
      border: '4px solid var(--pixel-black)',
      boxShadow: '6px 6px 0 var(--pixel-black)'
    }}>
      {/* Header del post */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '15px',
        paddingBottom: '10px',
        borderBottom: '2px solid var(--pixel-black)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="pixel-avatar" style={{
            width: '40px',
            height: '40px',
            fontSize: '18px',
            background: 'var(--pixel-purple)',
            border: '3px solid var(--pixel-black)',
            boxShadow: '3px 3px 0 var(--pixel-black)'
          }}>
            {post.profile?.display_name?.[0]?.toUpperCase() || '?'}
          </div>
          <div>
            <div style={{
              fontSize: '11px',
              fontWeight: 'bold',
              color: 'var(--pixel-black)'
            }}>
              {post.profile?.display_name || 'Usuario'}
            </div>
            <div style={{
              fontSize: '9px',
              color: 'var(--pixel-brown)'
            }}>
              @{post.profile?.username || 'usuario'}
            </div>
          </div>
        </div>
        <div style={{
          fontSize: '9px',
          color: 'var(--pixel-brown)'
        }}>
          {formatDate(post.created_at)}
        </div>
      </div>

      {/* Contenido del post */}
      <div style={{
        marginBottom: '15px',
        fontSize: '11px',
        color: 'var(--pixel-black)',
        lineHeight: '1.6',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word'
      }}>
        {post.content}
      </div>

      {/* Media - Completo */}
      {post.media_urls && post.media_urls.length > 0 && (
        <div style={{
          marginBottom: '15px',
          display: 'grid',
          gridTemplateColumns: post.media_urls.length === 1 ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '10px'
        }}>
          {post.media_urls.map((url: string, idx: number) => {
            const mediaType = post.media_types?.[idx] || 'image'
            return (
              <div key={idx} style={{
                border: '4px solid var(--pixel-black)',
                background: 'var(--pixel-beige)',
                overflow: 'hidden',
                boxShadow: '4px 4px 0 var(--pixel-black)',
                maxHeight: post.media_urls.length === 1 ? '400px' : '250px'
              }}>
                {mediaType === 'image' && (
                  <img 
                    src={url} 
                    alt={`Media ${idx}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      display: 'block',
                      background: 'var(--pixel-white)'
                    }}
                  />
                )}
                {mediaType === 'video' && (
                  <video 
                    src={url}
                    controls
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      background: 'var(--pixel-white)'
                    }}
                  />
                )}
                {mediaType === 'audio' && (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '120px',
                    background: 'linear-gradient(135deg, #FFE4B5, #FFF8DC)',
                    padding: '20px'
                  }}>
                    <div style={{ fontSize: '40px', marginBottom: '10px' }}>🎵</div>
                    <audio 
                      src={url}
                      controls
                      style={{ width: '100%', maxWidth: '90%' }}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Acciones - Igual al Home */}
      <div style={{
        display: 'flex',
        gap: '8px',
        borderTop: '3px solid var(--pixel-black)',
        paddingTop: '15px',
        marginTop: '15px'
      }}>
        {/* Botón Like - Deshabilitado pero visible */}
        <div
          style={{
            flex: 1,
            padding: '10px',
            border: '3px solid var(--pixel-black)',
            background: 'var(--pixel-white)',
            cursor: 'default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            fontSize: '11px',
            fontWeight: 'bold',
            boxShadow: '3px 3px 0 var(--pixel-black)',
            opacity: 0.6
          }}
        >
          <PixelHeart filled={false} />
          <span>{post.likes_count || 0}</span>
        </div>
        
        {/* Botón Comentario - Deshabilitado pero visible */}
        <div
          style={{
            flex: 1,
            padding: '10px',
            border: '3px solid var(--pixel-black)',
            background: 'var(--pixel-white)',
            cursor: 'default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            fontSize: '11px',
            fontWeight: 'bold',
            boxShadow: '3px 3px 0 var(--pixel-black)',
            opacity: 0.6
          }}
        >
          <PixelComment />
          <span>{comments.length || 0}</span>
        </div>

        {/* Botón Repost - Deshabilitado pero visible */}
        <div
          style={{
            flex: 1,
            padding: '10px',
            border: '3px solid var(--pixel-black)',
            background: 'var(--pixel-white)',
            cursor: 'default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            fontSize: '11px',
            fontWeight: 'bold',
            boxShadow: '3px 3px 0 var(--pixel-black)',
            opacity: 0.6
          }}
        >
          <PixelRepost />
          <span>{post.reposts_count || 0}</span>
        </div>
      </div>

      {/* Comentarios */}
      {comments.length > 0 && (
        <div style={{
          marginTop: '20px',
          paddingTop: '15px',
          borderTop: '3px solid var(--pixel-black)'
        }}>
          <div style={{
            fontSize: '11px',
            fontWeight: 'bold',
            marginBottom: '15px',
            color: 'var(--pixel-black)',
            background: 'var(--pixel-yellow)',
            padding: '8px',
            border: '2px solid var(--pixel-black)',
            textAlign: 'center'
          }}>
            💬 COMENTARIOS ({comments.length})
          </div>

          {comments.map((comment) => (
            <div key={comment.id} style={{
              background: '#FFF8DC',
              border: '2px solid var(--pixel-black)',
              padding: '12px',
              marginBottom: '10px',
              borderRadius: '0'
            }}>
              <div style={{
                display: 'flex',
                gap: '10px',
                marginBottom: '8px',
                alignItems: 'center'
              }}>
                <div 
                  className="pixel-avatar"
                  style={{
                    width: '32px',
                    height: '32px',
                    fontSize: '14px',
                    background: 'var(--pixel-purple)',
                    border: '2px solid var(--pixel-black)',
                    flexShrink: 0
                  }}
                >
                  {comment.profile?.display_name?.[0]?.toUpperCase() || '?'}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: '10px',
                    fontWeight: 'bold',
                    color: 'var(--pixel-black)'
                  }}>
                    {comment.profile?.display_name || 'Usuario'}
                  </div>
                  <div style={{
                    fontSize: '8px',
                    color: 'var(--pixel-brown)'
                  }}>
                    @{comment.profile?.username || 'usuario'} · {formatDate(comment.created_at)}
                  </div>
                </div>
              </div>
              <div style={{
                fontSize: '10px',
                color: 'var(--pixel-black)',
                lineHeight: '1.4',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}>
                {comment.content}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mensaje para registrarse */}
      <div style={{
        marginTop: '20px',
        padding: '15px',
        background: 'var(--pixel-green)',
        border: '3px solid var(--pixel-black)',
        textAlign: 'center',
        fontSize: '10px',
        fontWeight: 'bold',
        color: 'white',
        boxShadow: '3px 3px 0 var(--pixel-black)',
        cursor: 'pointer',
        transition: 'all 0.2s'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translate(-2px, -2px)'
        e.currentTarget.style.boxShadow = '5px 5px 0 var(--pixel-black)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translate(0, 0)'
        e.currentTarget.style.boxShadow = '3px 3px 0 var(--pixel-black)'
      }}>
        🐝 REGISTRATE PARA DAR LIKES, COMENTAR Y REPOSTEAR
      </div>
    </div>
  )
}

