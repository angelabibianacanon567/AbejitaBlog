import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kcaknjpxgihnexvboqco.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjYWtuanB4Z2lobmV4dmJvcWNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2NDI2NTcsImV4cCI6MjA3ODIxODY1N30.vSrpGGCfUczPlcaJmoehJ9JrbVuAoHcXxT6Uv-Sblqc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para la base de datos
export interface Profile {
  id: string
  username: string
  display_name: string
  avatar_url?: string
  bio?: string
  created_at: string
  updated_at: string
}

export interface Post {
  id: string
  user_id: string
  content: string
  media_urls?: string[]
  media_types?: string[]
  likes_count: number
  comments_count: number
  reposts_count: number
  created_at: string
  updated_at: string
  profile?: Profile
}

export interface Like {
  id: string
  user_id: string
  post_id: string
  created_at: string
}

export interface Comment {
  id: string
  user_id: string
  post_id: string
  content: string
  created_at: string
  profile?: Profile
}

export interface Repost {
  id: string
  user_id: string
  post_id: string
  created_at: string
  profile?: Profile
  original_post?: Post
}

