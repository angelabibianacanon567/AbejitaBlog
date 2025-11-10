# 🐝 INSTRUCCIONES DE INSTALACIÓN - BLOG PIXEL

## 📋 Pasos para Ejecutar el Proyecto

### 1️⃣ Instalar Node.js (si no lo tienes)
Descarga e instala Node.js desde: https://nodejs.org/
Versión recomendada: 18 o superior

### 2️⃣ Instalar Dependencias
Abre PowerShell o CMD en la carpeta del proyecto y ejecuta:

```bash
npm install
```

Esto instalará todas las dependencias necesarias:
- React
- React Router
- Supabase Client
- TypeScript
- Vite

### 3️⃣ Configurar Supabase

#### A. Ejecutar el Script SQL
1. Ve a tu proyecto en Supabase: https://supabase.com/dashboard
2. Ve a "SQL Editor" en el menú lateral
3. Abre el archivo `supabase-setup.sql` de este proyecto
4. Copia TODO el contenido
5. Pégalo en el SQL Editor de Supabase
6. Haz clic en "Run" o presiona Ctrl + Enter
7. Espera a que se ejecute correctamente (verás un mensaje de éxito)

#### B. Configurar Storage (Importante para imágenes/videos)
1. En Supabase, ve a "Storage" en el menú lateral
2. Haz clic en "Create a new bucket"
3. Nombre del bucket: `post-media`
4. Marca como "Public bucket" ✓
5. Haz clic en "Create bucket"

6. Ahora configura las políticas:
   - Selecciona el bucket `post-media`
   - Ve a la pestaña "Policies"
   - Haz clic en "New Policy"
   
   **Primera Política (Ver archivos):**
   - Policy name: `Public Access`
   - Allowed operation: `SELECT`
   - Target roles: `public`
   - En "USING expression" escribe: `true`
   - Guarda la política

   **Segunda Política (Subir archivos):**
   - Policy name: `Authenticated users can upload`
   - Allowed operation: `INSERT`
   - Target roles: `authenticated`
   - En "WITH CHECK expression" escribe: `true`
   - Guarda la política

### 4️⃣ Ejecutar el Proyecto

```bash
npm run dev
```

Deberías ver algo como:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 5️⃣ Abrir en el Navegador
Abre tu navegador y ve a: **http://localhost:5173**

## 🎮 Cómo Usar la Aplicación

### Primer Uso
1. **Registrarse**: Haz clic en "REGISTRARSE"
   - Ingresa un nombre de usuario (ej: maria123)
   - Ingresa tu nombre completo (ej: María López)
   - Ingresa tu email
   - Crea una contraseña (mínimo 6 caracteres)
   - Haz clic en "CREAR CUENTA"

2. **Iniciar Sesión**
   - Serás redirigido al login automáticamente
   - Ingresa tu email y contraseña
   - Haz clic en "ENTRAR"

### Funcionalidades Principales

#### 🏠 Inicio (Home)
- Ver todos los posts de todos los usuarios
- Crear nuevos posts con texto, imágenes, videos o audios
- Dar like, comentar o repostear posts
- Todo con estilo pixel art 🐝

#### 👤 Mi Perfil
- Editar tu nombre
- Agregar o editar tu bio
- Ver tu información

#### 📝 Mis Posts
- Ver todos tus posts
- Ver estadísticas (total de posts)
- Interactuar con tus propios posts

## 🐛 Solución de Problemas

### Error: "npm no se reconoce"
- Reinstala Node.js desde nodejs.org
- Reinicia tu terminal/PowerShell después de instalar

### Error al conectar con Supabase
- Verifica que las credenciales en `src/config/supabase.ts` sean correctas
- Asegúrate de haber ejecutado el script SQL completo

### Las imágenes no se suben
- Verifica que el bucket `post-media` esté creado
- Verifica que las políticas de Storage estén configuradas correctamente
- Asegúrate de que el bucket sea público

### Error "profiles doesn't exist"
- Ejecuta nuevamente el script SQL en Supabase
- Asegúrate de que todas las tablas se crearon correctamente

## 📦 Estructura del Proyecto

```
BlogMaria/
├── src/
│   ├── components/        # Componentes React
│   │   ├── Auth/         # Login y Register
│   │   ├── Layout/       # Sidebar
│   │   └── Post/         # CreatePost y PostCard
│   ├── contexts/         # Context de autenticación
│   ├── pages/            # Páginas (Home, Profile, MyPosts)
│   ├── config/           # Configuración de Supabase
│   ├── styles/           # Estilos CSS pixel art
│   ├── App.tsx           # Componente principal con rutas
│   └── main.tsx          # Punto de entrada
├── package.json          # Dependencias
├── supabase-setup.sql    # Script SQL para Supabase
└── README.md             # Documentación completa
```

## 🎨 Personalización

### Cambiar Colores
Edita `src/styles/pixel-art.css` en la sección `:root`:

```css
:root {
  --pixel-yellow: #FFD700;
  --pixel-orange: #FFA500;
  --pixel-brown: #8B4513;
  /* ... más colores */
}
```

### Cambiar Tamaño de Fuente
En `src/styles/pixel-art.css`, busca las clases `.pixel-button`, `.pixel-input`, etc. y modifica `font-size`.

## ✅ Checklist de Instalación

- [ ] Node.js instalado (v18+)
- [ ] Dependencias instaladas (`npm install`)
- [ ] Script SQL ejecutado en Supabase
- [ ] Bucket `post-media` creado en Storage
- [ ] Políticas de Storage configuradas
- [ ] Proyecto corriendo (`npm run dev`)
- [ ] Navegador abierto en http://localhost:5173
- [ ] Usuario registrado y logueado

## 🚀 ¡Listo!

Si seguiste todos los pasos, deberías tener tu Blog Pixel funcionando completamente con:
- ✨ Diseño pixel art completo
- 🐝 Animaciones de abejas y flores
- 📝 Posts con multimedia
- ❤️ Likes, comentarios y reposts
- 👤 Perfil editable

¡Disfruta tu blog! 🎉

