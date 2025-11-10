import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useSidebar } from '../../contexts/SidebarContext'
import '../../styles/pixel-art.css'

export const Sidebar: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { profile, signOut } = useAuth()
  const { isMinimized, toggleSidebar } = useSidebar()

  const menuItems = [
    { label: 'INICIO', path: '/', icon: '🏠', color: '#4169E1' },
    { label: 'PERFIL', path: '/profile', icon: '👤', color: '#FF69B4' },
    { label: 'MIS POSTS', path: '/my-posts', icon: '📝', color: '#32CD32' },
  ]

  const isActive = (path: string) => location.pathname === path

  const [isOpen, setIsOpen] = React.useState(false)
  const isMobile = window.innerWidth < 768

  const sidebarStyle: React.CSSProperties = {
    width: isMinimized ? '90px' : '280px',
    position: 'fixed',
    left: 0,
    top: 0,
    height: '100vh',
    background: 'linear-gradient(180deg, #FFE4B5 0%, #FFF8DC 100%)',
    borderRight: '6px solid var(--pixel-black)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s ease',
    zIndex: 1000,
    overflow: 'hidden',
    boxShadow: '8px 0 16px rgba(0, 0, 0, 0.1)',
    transform: isMobile && !isOpen ? 'translateX(-100%)' : 'translateX(0)'
  }

  return (
    <>
      {/* Botón toggle para móviles */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            position: 'fixed',
            top: '15px',
            left: '15px',
            width: '50px',
            height: '50px',
            padding: '0',
            fontSize: '24px',
            border: '4px solid var(--pixel-black)',
            background: 'var(--pixel-yellow)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '4px 4px 0 var(--pixel-black)',
            zIndex: 999,
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translate(-2px, -2px)'
            e.currentTarget.style.boxShadow = '6px 6px 0 var(--pixel-black)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translate(0, 0)'
            e.currentTarget.style.boxShadow = '4px 4px 0 var(--pixel-black)'
          }}
          title="Abrir menú"
        >
          ☰
        </button>
      )}

      {/* Overlay en móviles */}
      {isMobile && isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999
          }}
        />
      )}

      {/* Sidebar */}
      <div 
        style={sidebarStyle}
      >
        {/* Header con Logo */}
      <div style={{
        padding: isMinimized ? '20px 10px' : '30px 20px',
        borderBottom: '4px solid var(--pixel-black)',
        background: 'var(--pixel-yellow)',
        position: 'relative',
        transition: 'padding 0.3s ease'
      }}>
        {/* Botón toggle */}
        <button
          onClick={toggleSidebar}
          style={{
            position: 'absolute',
            top: '15px',
            right: '10px',
            width: '36px',
            height: '36px',
            padding: '0',
            fontSize: '14px',
            border: '3px solid var(--pixel-black)',
            background: 'var(--pixel-white)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
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
          title={isMinimized ? 'Expandir' : 'Contraer'}
        >
          {isMinimized ? '☰' : '✕'}
        </button>

        {!isMinimized && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '40px', 
              marginBottom: '10px',
              animation: 'float 3s ease-in-out infinite'
            }}>
              🐝
            </div>
            <h1 style={{ 
              fontSize: '16px', 
              fontWeight: 'bold',
              color: 'var(--pixel-black)',
              textShadow: '2px 2px 0 rgba(255, 255, 255, 0.5)'
            }}>
              LITTLE HUMMINGBIRD
            </h1>
          </div>
        )}
        
        {isMinimized && (
          <div style={{ textAlign: 'center', fontSize: '32px' }}>🐝</div>
        )}
      </div>

      {/* Perfil de Usuario */}
      {profile && (
        <div style={{
          padding: isMinimized ? '20px 10px' : '25px 20px',
          borderBottom: '4px solid var(--pixel-black)',
          background: 'var(--pixel-orange)',
          transition: 'padding 0.3s ease'
        }}>
          <div style={{ 
            display: 'flex', 
            flexDirection: isMinimized ? 'column' : 'row',
            alignItems: 'center',
            gap: isMinimized ? '10px' : '15px'
          }}>
            <div 
              className="pixel-avatar" 
              style={{ 
                width: isMinimized ? '50px' : '60px',
                height: isMinimized ? '50px' : '60px',
                fontSize: isMinimized ? '24px' : '28px',
                background: 'var(--pixel-purple)',
                border: '4px solid var(--pixel-black)',
                boxShadow: '4px 4px 0 var(--pixel-black)',
                flexShrink: 0,
                transition: 'all 0.3s ease'
              }}
            >
              {profile.display_name[0].toUpperCase()}
            </div>
            
            {!isMinimized && (
              <div style={{ 
                flex: 1,
                minWidth: 0,
                textAlign: 'left'
              }}>
                <div style={{ 
                  fontSize: '12px', 
                  fontWeight: 'bold',
                  color: 'var(--pixel-black)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  marginBottom: '5px'
                }}>
                  {profile.display_name}
                </div>
                <div style={{ 
                  fontSize: '10px', 
                  color: 'var(--pixel-brown)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  @{profile.username}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navegación */}
      <nav style={{ 
        flex: 1, 
        padding: isMinimized ? '20px 10px' : '30px 15px',
        overflowY: 'auto',
        transition: 'padding 0.3s ease'
      }}>
        {menuItems.map((item) => {
          const active = isActive(item.path)
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                width: '100%',
                marginBottom: '12px',
                padding: isMinimized ? '18px 10px' : '18px 20px',
                border: '4px solid var(--pixel-black)',
                background: active ? item.color : 'var(--pixel-white)',
                color: active ? 'var(--pixel-white)' : 'var(--pixel-black)',
                cursor: 'pointer',
                fontSize: isMinimized ? '24px' : '11px',
                fontWeight: 'bold',
                textAlign: isMinimized ? 'center' : 'left',
                display: 'flex',
                alignItems: 'center',
                justifyContent: isMinimized ? 'center' : 'flex-start',
                gap: '12px',
                boxShadow: active 
                  ? `6px 6px 0 var(--pixel-black)` 
                  : '4px 4px 0 var(--pixel-black)',
                transition: 'all 0.2s ease',
                position: 'relative',
                transform: active ? 'translate(-2px, -2px)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.transform = 'translate(-2px, -2px)'
                  e.currentTarget.style.boxShadow = '6px 6px 0 var(--pixel-black)'
                  e.currentTarget.style.background = item.color
                  e.currentTarget.style.color = 'var(--pixel-white)'
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.transform = 'translate(0, 0)'
                  e.currentTarget.style.boxShadow = '4px 4px 0 var(--pixel-black)'
                  e.currentTarget.style.background = 'var(--pixel-white)'
                  e.currentTarget.style.color = 'var(--pixel-black)'
                }
              }}
              title={isMinimized ? item.label : ''}
            >
              <span style={{ fontSize: '20px' }}>{item.icon}</span>
              {!isMinimized && <span>{item.label}</span>}
            </button>
          )
        })}
      </nav>

      {/* Footer con botón de salir */}
      <div style={{
        padding: isMinimized ? '20px 10px' : '20px 15px',
        borderTop: '4px solid var(--pixel-black)',
        background: 'rgba(255, 228, 181, 0.5)',
        transition: 'padding 0.3s ease'
      }}>
        <button
          onClick={() => signOut()}
          style={{
            width: '100%',
            padding: isMinimized ? '18px 10px' : '18px 20px',
            border: '4px solid var(--pixel-black)',
            background: '#FF6B6B',
            color: 'var(--pixel-white)',
            cursor: 'pointer',
            fontSize: isMinimized ? '24px' : '11px',
            fontWeight: 'bold',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            boxShadow: '4px 4px 0 var(--pixel-black)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translate(-2px, -2px)'
            e.currentTarget.style.boxShadow = '6px 6px 0 var(--pixel-black)'
            e.currentTarget.style.background = '#FF5252'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translate(0, 0)'
            e.currentTarget.style.boxShadow = '4px 4px 0 var(--pixel-black)'
            e.currentTarget.style.background = '#FF6B6B'
          }}
          title={isMinimized ? 'SALIR' : ''}
        >
          <span style={{ fontSize: '20px' }}>🚪</span>
          {!isMinimized && <span>SALIR</span>}
        </button>

        {!isMinimized && (
          <div style={{ 
            marginTop: '20px', 
            textAlign: 'center',
            fontSize: '24px',
            display: 'flex',
            justifyContent: 'center',
            gap: '10px'
          }}>
            <span className="flower"></span>
            <span>🐝</span>
            <span className="flower"></span>
          </div>
        )}
      </div>

        <style>{`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }
        `}</style>
      </div>
    </>
  )
}

