# 🚀 COMANDOS PARA EJECUTAR EL PROYECTO

## ⚠️ IMPORTANTE: Lee esto primero

Si npm no funciona en tu PowerShell, prueba con:
1. **CMD** (Símbolo del sistema)
2. **Git Bash** (si tienes Git instalado)
3. **Node.js Command Prompt** (instalado con Node.js)

---

## 📦 1. INSTALAR DEPENDENCIAS

Abre una terminal en esta carpeta y ejecuta:

```bash
npm install
```

**Tiempo estimado:** 2-3 minutos

---

## 🗄️ 2. CONFIGURAR SUPABASE

### A. Ejecutar Script SQL

1. Ve a: https://supabase.com/dashboard
2. Selecciona tu proyecto o crea uno nuevo
3. Ve a **SQL Editor** (menú lateral izquierdo)
4. Abre el archivo `supabase-setup.sql` de este proyecto
5. Copia TODO el contenido
6. Pégalo en el SQL Editor
7. Haz clic en **"Run"** (o presiona Ctrl + Enter)
8. Espera el mensaje de éxito ✅

### B. Configurar Storage

1. En Supabase, ve a **Storage** (menú lateral)
2. Clic en **"Create a new bucket"**
3. Nombre: `post-media`
4. Marca **"Public bucket"** ✓
5. Clic en **"Create bucket"**

6. Configurar políticas del bucket:
   - Selecciona `post-media`
   - Ve a **"Policies"**
   - Clic en **"New Policy"**
   
   **Política 1:**
   - Name: `Public Access`
   - Operation: `SELECT`
   - Target: `public`
   - USING: `true`
   - Guardar

   **Política 2:**
   - Name: `Authenticated users can upload`
   - Operation: `INSERT`
   - Target: `authenticated`
   - WITH CHECK: `true`
   - Guardar

---

## ▶️ 3. EJECUTAR EL PROYECTO

```bash
npm run dev
```

Deberías ver:

```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
```

---

## 🌐 4. ABRIR EN NAVEGADOR

Abre tu navegador en: **http://localhost:5173**

---

## 🎮 5. PROBAR LA APLICACIÓN

1. **Registrarse**
   - Clic en "REGISTRARSE"
   - Completa el formulario
   - Clic en "CREAR CUENTA"

2. **Iniciar Sesión**
   - Email y contraseña
   - Clic en "ENTRAR"

3. **Crear un Post**
   - Escribe algo en el campo de texto
   - (Opcional) Agrega imágenes/videos
   - Clic en "🚀 PUBLICAR"

4. **Interactuar**
   - Da like ❤️
   - Comenta 💬
   - Repostea 🔄

---

## 🛑 DETENER EL SERVIDOR

En la terminal donde está corriendo, presiona:

**Ctrl + C**

---

## 📝 OTROS COMANDOS ÚTILES

### Compilar para producción:
```bash
npm run build
```

### Ver la versión de producción:
```bash
npm run preview
```

---

## ❓ PROBLEMAS COMUNES

### "npm no se reconoce"
**Solución:** Instala Node.js desde https://nodejs.org

### Error de permisos en Windows
**Solución:** Ejecuta PowerShell como Administrador

### Puerto 5173 ocupado
**Solución:** Cierra otros proyectos o cambia el puerto en `vite.config.ts`

### Error al subir imágenes
**Solución:** Verifica que el bucket `post-media` esté público y con políticas correctas

---

## ✅ CHECKLIST RÁPIDO

- [ ] Node.js instalado (v18+)
- [ ] `npm install` ejecutado
- [ ] Script SQL ejecutado en Supabase
- [ ] Bucket `post-media` creado y público
- [ ] Políticas de Storage configuradas
- [ ] `npm run dev` ejecutado
- [ ] Navegador en http://localhost:5173
- [ ] Usuario registrado

---

## 🐝 ¡LISTO PARA USAR!

Si completaste todos los pasos, tu blog pixel art debería estar funcionando perfectamente.

**Características:**
- ✨ Diseño pixel art completo
- 🐝 Abejas y flores animadas
- 📝 Posts con texto, imágenes, videos, audios
- ❤️ Likes, comentarios, reposts
- 👤 Perfil de usuario
- 🔐 Autenticación segura

¡Disfruta! 🎉

