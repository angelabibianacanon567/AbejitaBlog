-- ============================================
-- 🐝 BLOG PIXEL - CONFIGURACIÓN COMPLETA DE SUPABASE
-- ============================================
-- COPIAR Y PEGAR TODO ESTE CÓDIGO EN EL SQL EDITOR DE SUPABASE
-- URL: https://supabase.com/dashboard/project/kcaknjpxgihnexvboqco/sql
-- ============================================

-- Habilitar extensión UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLAS
-- ============================================

-- Tabla de perfiles
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de posts
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  media_urls TEXT[],
  media_types TEXT[],
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  reposts_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de likes
CREATE TABLE IF NOT EXISTS likes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, post_id)
);

-- Tabla de comentarios
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de reposts
CREATE TABLE IF NOT EXISTS reposts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, post_id)
);

-- ============================================
-- ÍNDICES (Para optimizar consultas)
-- ============================================

CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_likes_post_id ON likes(post_id);
CREATE INDEX IF NOT EXISTS idx_likes_user_id ON likes(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_user_id ON comments(user_id);
CREATE INDEX IF NOT EXISTS idx_reposts_post_id ON reposts(post_id);
CREATE INDEX IF NOT EXISTS idx_reposts_user_id ON reposts(user_id);

-- ============================================
-- FUNCIONES Y TRIGGERS
-- ============================================

-- Función para crear perfil automáticamente (usada durante el registro)
-- Esta función usa SECURITY DEFINER para evitar restricciones de RLS
CREATE OR REPLACE FUNCTION create_profile(
  p_user_id UUID,
  p_username TEXT,
  p_display_name TEXT
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO profiles (id, username, display_name)
  VALUES (p_user_id, p_username, p_display_name)
  ON CONFLICT (id) DO NOTHING;
END;
$$;

-- Función para actualizar contador de likes
CREATE OR REPLACE FUNCTION update_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE posts SET likes_count = likes_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE posts SET likes_count = likes_count - 1 WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Función para actualizar contador de comentarios
CREATE OR REPLACE FUNCTION update_comments_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE posts SET comments_count = comments_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE posts SET comments_count = comments_count - 1 WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Función para actualizar contador de reposts
CREATE OR REPLACE FUNCTION update_reposts_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE posts SET reposts_count = reposts_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE posts SET reposts_count = reposts_count - 1 WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Eliminar triggers existentes si existen
DROP TRIGGER IF EXISTS trigger_update_likes_count ON likes;
DROP TRIGGER IF EXISTS trigger_update_comments_count ON comments;
DROP TRIGGER IF EXISTS trigger_update_reposts_count ON reposts;

-- Crear triggers
CREATE TRIGGER trigger_update_likes_count
AFTER INSERT OR DELETE ON likes
FOR EACH ROW EXECUTE FUNCTION update_likes_count();

CREATE TRIGGER trigger_update_comments_count
AFTER INSERT OR DELETE ON comments
FOR EACH ROW EXECUTE FUNCTION update_comments_count();

CREATE TRIGGER trigger_update_reposts_count
AFTER INSERT OR DELETE ON reposts
FOR EACH ROW EXECUTE FUNCTION update_reposts_count();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilitar RLS en todas las tablas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reposts ENABLE ROW LEVEL SECURITY;

-- Eliminar políticas existentes si existen (para evitar duplicados)
DROP POLICY IF EXISTS "Los perfiles son visibles públicamente" ON profiles;
DROP POLICY IF EXISTS "Los usuarios pueden actualizar su propio perfil" ON profiles;
DROP POLICY IF EXISTS "Los usuarios pueden insertar su propio perfil" ON profiles;

DROP POLICY IF EXISTS "Los posts son visibles públicamente" ON posts;
DROP POLICY IF EXISTS "Los usuarios pueden crear posts" ON posts;
DROP POLICY IF EXISTS "Los usuarios pueden actualizar sus propios posts" ON posts;
DROP POLICY IF EXISTS "Los usuarios pueden eliminar sus propios posts" ON posts;

DROP POLICY IF EXISTS "Los likes son visibles públicamente" ON likes;
DROP POLICY IF EXISTS "Los usuarios pueden dar like" ON likes;
DROP POLICY IF EXISTS "Los usuarios pueden quitar sus likes" ON likes;

DROP POLICY IF EXISTS "Los comentarios son visibles públicamente" ON comments;
DROP POLICY IF EXISTS "Los usuarios pueden comentar" ON comments;
DROP POLICY IF EXISTS "Los usuarios pueden eliminar sus comentarios" ON comments;

DROP POLICY IF EXISTS "Los reposts son visibles públicamente" ON reposts;
DROP POLICY IF EXISTS "Los usuarios pueden repostear" ON reposts;
DROP POLICY IF EXISTS "Los usuarios pueden eliminar sus reposts" ON reposts;

-- Políticas para profiles
CREATE POLICY "Los perfiles son visibles públicamente" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Los usuarios pueden actualizar su propio perfil" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Permitir que los usuarios autenticados creen su propio perfil
-- Esto funciona junto con la función create_profile
CREATE POLICY "Los usuarios autenticados pueden insertar su perfil" ON profiles
  FOR INSERT 
  WITH CHECK (
    auth.uid() = id AND 
    auth.role() = 'authenticated'
  );

-- Políticas para posts
CREATE POLICY "Los posts son visibles públicamente" ON posts
  FOR SELECT USING (true);

CREATE POLICY "Los usuarios pueden crear posts" ON posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Los usuarios pueden actualizar sus propios posts" ON posts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Los usuarios pueden eliminar sus propios posts" ON posts
  FOR DELETE USING (auth.uid() = user_id);

-- Políticas para likes
CREATE POLICY "Los likes son visibles públicamente" ON likes
  FOR SELECT USING (true);

CREATE POLICY "Los usuarios pueden dar like" ON likes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Los usuarios pueden quitar sus likes" ON likes
  FOR DELETE USING (auth.uid() = user_id);

-- Políticas para comments
CREATE POLICY "Los comentarios son visibles públicamente" ON comments
  FOR SELECT USING (true);

CREATE POLICY "Los usuarios pueden comentar" ON comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Los usuarios pueden eliminar sus comentarios" ON comments
  FOR DELETE USING (auth.uid() = user_id);

-- Políticas para reposts
CREATE POLICY "Los reposts son visibles públicamente" ON reposts
  FOR SELECT USING (true);

CREATE POLICY "Los usuarios pueden repostear" ON reposts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Los usuarios pueden eliminar sus reposts" ON reposts
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- ✅ ¡CONFIGURACIÓN COMPLETADA!
-- ============================================
-- 
-- PRÓXIMOS PASOS:
-- 
-- 1. Ve a Storage en tu dashboard de Supabase
-- 2. Crea un bucket llamado "post-media"
-- 3. Haz el bucket público
-- 4. Configura las políticas:
--    - SELECT: true (para ver las imágenes)
--    - INSERT: auth.role() = 'authenticated' (para subir archivos)
-- 
-- ============================================

