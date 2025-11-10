# 🚀 GUÍA RÁPIDA - BLOG PIXEL

## ✅ ¡DEPENDENCIAS INSTALADAS!

Las dependencias ya están instaladas. Ahora sigue estos pasos:

---

## 📋 PASOS SIGUIENTES

### **1️⃣ Configurar Supabase** (IMPORTANTE)

#### A. Ejecutar Script SQL
1. Ve a: https://supabase.com/dashboard
2. Selecciona tu proyecto
3. Ve a **SQL Editor** (menú lateral)
4. Abre el archivo `supabase-setup.sql` de este proyecto
5. Copia TODO el contenido
6. Pégalo en el SQL Editor
7. Haz clic en **"Run"** o presiona `Ctrl + Enter`
8. Espera el mensaje de éxito ✅

#### B. Configurar Storage
1. En Supabase, ve a **Storage** (menú lateral)
2. Haz clic en **"Create a new bucket"**
3. Nombre: `post-media`
4. Marca **"Public bucket"** ✓
5. Haz clic en **"Create bucket"**

6. Configurar políticas:
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

### **2️⃣ Ejecutar el Proyecto**

#### Opción A: Usar el script (MÁS FÁCIL) ⭐
1. Doble clic en `ejecutar-proyecto.bat`
2. Espera a que se abra el navegador
3. Ve a: http://localhost:5173

#### Opción B: Usar CMD manualmente
1. Presiona `Windows + R`
2. Escribe: `cmd`
3. Presiona Enter
4. Navega a la carpeta:
   ```bash
   cd "C:\Users\angie\OneDrive\Documentos\BlogMaria"
   ```
5. Ejecuta:
   ```bash
   npm run dev
   ```
6. Abre tu navegador en: http://localhost:5173

#### Opción C: Si prefieres usar PowerShell
1. Abre PowerShell
2. Ejecuta primero:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
3. Luego ejecuta:
   ```bash
   npm run dev
   ```

---

### **3️⃣ Usar la Aplicación**

1. **Registrarse**
   - Clic en "REGISTRARSE"
   - Completa el formulario
   - Clic en "CREAR CUENTA"

2. **Iniciar Sesión**
   - Email y contraseña
   - Clic en "ENTRAR"

3. **Crear un Post**
   - Escribe algo en el campo
   - (Opcional) Agrega imágenes/videos/audios
   - Clic en "🚀 PUBLICAR"

4. **Interactuar**
   - ❤️ Dar like
   - 💬 Comentar
   - 🔄 Repostear

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### Error: "npm no se reconoce" en PowerShell
**Solución:** Usa CMD en lugar de PowerShell (ver SOLUCION_POWERSHELL.md)

### Error al conectar con Supabase
**Solución:** 
- Verifica que ejecutaste el script SQL
- Verifica las credenciales en `src/config/supabase.ts`

### Las imágenes no se suben
**Solución:**
- Verifica que el bucket `post-media` esté creado
- Verifica que las políticas de Storage estén configuradas
- Asegúrate de que el bucket sea público

### Puerto 5173 ocupado
**Solución:** Cierra otros proyectos o cambia el puerto en `vite.config.ts`

---

## 📁 ARCHIVOS IMPORTANTES

- `COMANDOS.md` - Instrucciones completas
- `SOLUCION_POWERSHELL.md` - Solución para problemas de PowerShell
- `SOLUCION_NPM.md` - Solución para problemas de npm
- `supabase-setup.sql` - Script SQL para Supabase
- `ejecutar-proyecto.bat` - Script para ejecutar el proyecto
- `instalar-dependencias.bat` - Script para instalar dependencias

---

## ✅ CHECKLIST

- [x] Node.js instalado
- [x] npm instalado
- [x] Dependencias instaladas
- [ ] Script SQL ejecutado en Supabase
- [ ] Bucket `post-media` creado en Storage
- [ ] Políticas de Storage configuradas
- [ ] Proyecto ejecutándose (`npm run dev`)
- [ ] Navegador abierto en http://localhost:5173
- [ ] Usuario registrado

---

## 🎉 ¡LISTO PARA USAR!

Una vez que configures Supabase y ejecutes el proyecto, tu blog pixel art estará funcionando completamente.

**Características:**
- ✨ Diseño pixel art completo
- 🐝 Abejas y flores animadas
- 📝 Posts con multimedia
- ❤️ Likes, comentarios y reposts
- 👤 Perfil editable
- 🔐 Autenticación segura

---

## 📞 AYUDA ADICIONAL

Si tienes problemas:
1. Lee `SOLUCION_POWERSHELL.md` para problemas con PowerShell
2. Lee `SOLUCION_NPM.md` para problemas con npm
3. Lee `COMANDOS.md` para instrucciones detalladas
4. Verifica que Supabase esté configurado correctamente

---

**¡Disfruta tu blog de abejas! 🐝🍯✨**

