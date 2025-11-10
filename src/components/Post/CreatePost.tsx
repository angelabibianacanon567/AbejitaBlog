import React, { useState } from 'react'
import { supabase } from '../../config/supabase'
import { useAuth } from '../../contexts/AuthContext'
import '../../styles/pixel-art.css'

interface CreatePostProps {
  onPostCreated: () => void
}

export const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
  const [content, setContent] = useState('')
  const [mediaFiles, setMediaFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { user } = useAuth()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setMediaFiles(Array.from(e.target.files))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() && mediaFiles.length === 0) {
      setError('Debes escribir algo o agregar archivos')
      return
    }

    setLoading(true)
    setError('')

    try {
      const mediaUrls: string[] = []
      const mediaTypes: string[] = []

      // Subir archivos multimedia
      for (const file of mediaFiles) {
        try {
          // Validar tamaño del archivo (máximo 10MB)
          const maxSize = 10 * 1024 * 1024 // 10MB
          if (file.size > maxSize) {
            throw new Error(`El archivo ${file.name} es demasiado grande. Máximo 10MB.`)
          }

          // Generar nombre único para el archivo
          const fileExt = file.name.split('.').pop()?.toLowerCase()
          const timestamp = Date.now()
          const randomStr = Math.random().toString(36).substring(2, 9)
          const fileName = `${user?.id}/${timestamp}-${randomStr}.${fileExt}`

          // Subir archivo
          const { data, error: uploadError } = await supabase.storage
            .from('post-media')
            .upload(fileName, file, {
              cacheControl: '3600',
              upsert: false
            })

          if (uploadError) {
            console.error('Error al subir archivo:', uploadError)
            throw new Error(`Error al subir ${file.name}: ${uploadError.message}`)
          }

          // Obtener URL pública
          const { data: { publicUrl } } = supabase.storage
            .from('post-media')
            .getPublicUrl(fileName)

          mediaUrls.push(publicUrl)
          
          // Determinar tipo de media
          if (file.type.startsWith('image/')) mediaTypes.push('image')
          else if (file.type.startsWith('video/')) mediaTypes.push('video')
          else if (file.type.startsWith('audio/')) mediaTypes.push('audio')
          else mediaTypes.push('file')
        } catch (fileError: any) {
          console.error('Error procesando archivo:', fileError)
          throw new Error(fileError.message || `Error al procesar ${file.name}`)
        }
      }

      // Crear post
      const { error: insertError } = await supabase
        .from('posts')
        .insert([
          {
            user_id: user?.id,
            content,
            media_urls: mediaUrls.length > 0 ? mediaUrls : null,
            media_types: mediaTypes.length > 0 ? mediaTypes : null,
          },
        ])

      if (insertError) throw insertError

      // Limpiar formulario
      setContent('')
      setMediaFiles([])
      onPostCreated()
    } catch (err: any) {
      setError(err.message || 'Error al crear el post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pixel-card" style={{ marginBottom: '20px' }}>
      <h3 style={{ fontSize: '12px', marginBottom: '15px' }}>
        🐝 ¿QUÉ ESTÁS PENSANDO?
      </h3>

      <form onSubmit={handleSubmit}>
        <textarea
          className="pixel-textarea"
          placeholder="Escribe algo..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={loading}
          style={{ marginBottom: '15px' }}
        />

        <div style={{ marginBottom: '15px' }}>
          <label className="pixel-button" style={{ cursor: 'pointer', display: 'inline-block' }}>
            📎 AGREGAR ARCHIVOS
            <input
              type="file"
              multiple
              accept="image/*,video/*,audio/*"
              onChange={handleFileChange}
              disabled={loading}
              style={{ display: 'none' }}
            />
          </label>
          
          {mediaFiles.length > 0 && (
            <div style={{ marginTop: '10px', fontSize: '8px' }}>
              <strong>Archivos seleccionados ({mediaFiles.length}):</strong>
              {mediaFiles.map((file, idx) => (
                <div key={idx} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '5px',
                  padding: '5px',
                  background: 'var(--pixel-light-gray)',
                  border: '2px solid var(--pixel-black)'
                }}>
                  <span>• {file.name} ({(file.size / 1024).toFixed(1)} KB)</span>
                  <button
                    type="button"
                    onClick={() => {
                      const newFiles = [...mediaFiles]
                      newFiles.splice(idx, 1)
                      setMediaFiles(newFiles)
                    }}
                    style={{
                      background: '#FF6B6B',
                      border: '2px solid var(--pixel-black)',
                      color: 'white',
                      padding: '2px 6px',
                      cursor: 'pointer',
                      fontSize: '8px'
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {error && (
          <div style={{
            padding: '10px',
            marginBottom: '15px',
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
          disabled={loading}
          style={{ width: '100%' }}
        >
          {loading ? 'PUBLICANDO...' : '🚀 PUBLICAR'}
        </button>
      </form>
    </div>
  )
}

