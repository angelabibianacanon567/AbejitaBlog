# 🐝 Blog Pixel - Blog Estilo Twitter con Pixel Art

Blog interactivo con estilo pixel art completo, usando React, TypeScript, Supabase y React Router.

## 🎨 Características

- ✨ **Diseño Pixel Art completo** con abejas, flores y animales
- 🔐 **Autenticación** con Login y Register
- 📝 **Posts** tipo Twitter con texto, imágenes, videos y audios
- ❤️ **Like**, comentar y repostear
- 👤 **Perfil de usuario** editable
- 📊 **Sidebar** con navegación (Inicio, Mi Perfil, Mis Posts)
- 🎯 **Responsive** y con animaciones pixel art

## 🚀 Instalación

1. Instala las dependencias:
```bash
npm install
```

2. Crea las tablas en Supabase (ver sección SQL más abajo)

3. Crea un bucket en Supabase Storage llamado `post-media` y hazlo público

4. Inicia el servidor de desarrollo:
```bash
npm run dev
```

5. Abre tu navegador en `http://localhost:5173`

## 🗄️ Configuración de Supabase

### Paso 1: Crear las tablas

Ejecuta el siguiente código SQL en tu panel de Supabase (SQL Editor):

\`\`\`sql
-- Habilitar extensión UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla de perfiles
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de posts
CREATE TABLE posts (
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
CREATE TABLE likes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, post_id)
);

-- Tabla de comentarios
CREATE TABLE comments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de reposts
CREATE TABLE reposts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, post_id)
);

-- Índices para mejorar el rendimiento
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_likes_post_id ON likes(post_id);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_reposts_post_id ON reposts(post_id);

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

-- Triggers
CREATE TRIGGER trigger_update_likes_count
AFTER INSERT OR DELETE ON likes
FOR EACH ROW EXECUTE FUNCTION update_likes_count();

CREATE TRIGGER trigger_update_comments_count
AFTER INSERT OR DELETE ON comments
FOR EACH ROW EXECUTE FUNCTION update_comments_count();

CREATE TRIGGER trigger_update_reposts_count
AFTER INSERT OR DELETE ON reposts
FOR EACH ROW EXECUTE FUNCTION update_reposts_count();

-- Políticas de seguridad (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reposts ENABLE ROW LEVEL SECURITY;

-- Políticas para profiles
CREATE POLICY "Los perfiles son visibles públicamente" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Los usuarios pueden actualizar su propio perfil" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Los usuarios pueden insertar su propio perfil" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

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
\`\`\`

### Paso 2: Configurar Storage

1. Ve a Storage en tu panel de Supabase
2. Crea un nuevo bucket llamado `post-media`
3. Haz el bucket público:
   - Selecciona el bucket
   - Ve a "Policies"
   - Crea una nueva política con:
     - Operation: SELECT
     - Policy name: "Public Access"
     - Check: `true`
   - Crea otra política:
     - Operation: INSERT
     - Policy name: "Authenticated users can upload"
     - Check: `auth.role() = 'authenticated'`

## 📁 Estructura del Proyecto

\`\`\`
BlogMaria/
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.tsx
│   │   │   └── Register.tsx
│   │   ├── Layout/
│   │   │   └── Sidebar.tsx
│   │   └── Post/
│   │       ├── CreatePost.tsx
│   │       └── PostCard.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Profile.tsx
│   │   └── MyPosts.tsx
│   ├── config/
│   │   └── supabase.ts
│   ├── styles/
│   │   └── pixel-art.css
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── tsconfig.json
├── vite.config.ts
└── index.html
\`\`\`

## 🎮 Uso

1. **Registrarse**: Crea una cuenta nueva
2. **Login**: Inicia sesión con tu cuenta
3. **Crear Post**: Escribe contenido y agrega imágenes/videos/audios
4. **Interactuar**: Da like, comenta o repostea
5. **Mi Perfil**: Edita tu información personal
6. **Mis Posts**: Ve todas tus publicaciones

## 🐝 Estilo Pixel Art

El proyecto incluye:
- Fuente pixel art
- Botones con efecto 3D pixel
- Inputs y textareas con bordes pixelados
- Cards con sombras pixel
- Abejas animadas CSS
- Flores decorativas
- Scrollbar personalizado
- Fondo con patrón de panal

## 🛠️ Tecnologías

- **React 18** con TypeScript
- **Vite** como bundler
- **Supabase** para backend y autenticación
- **React Router** para navegación
- **CSS puro** con diseño pixel art

## 📝 Licencia

Proyecto de uso educativo.

# AbejitaBlog
