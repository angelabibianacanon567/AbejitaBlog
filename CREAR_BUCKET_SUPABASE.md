# 🪣 Crear Bucket en Supabase para Subir Imágenes

## 🚨 Error: "Bucket not found"

Este error significa que el bucket `post-media` no existe en tu Storage de Supabase.

---

## ✅ SOLUCIÓN: Crear el Bucket

### **PASO 1: Ir a Supabase Storage**

1. Abre: https://supabase.com/dashboard
2. Selecciona tu proyecto: **kcaknjpxgihnexvboqco**
3. Ve a **Storage** en el menú lateral izquierdo

### **PASO 2: Crear un Nuevo Bucket**

1. Haz clic en **"Create a new bucket"** (o **+ New Bucket**)
2. En el campo **Bucket name**, escribe exactamente:
   ```
   post-media
   ```
3. Marca **"Public bucket"** ✓ (IMPORTANTE)
   - Esto permite que las imágenes sean accesibles públicamente
4. Haz clic en **"Create bucket"**

### **PASO 3: Configurar Políticas de Seguridad (importante)**

El bucket debería estar creado y listo. Ahora necesitas configurar las políticas de acceso:

1. Selecciona el bucket **post-media**
2. Ve a la pestaña **"Policies"**
3. Clic en **"New Policy"**

#### **POLÍTICA 1: Ver imágenes (SELECT) - PÚBLICA**
- **Policy name:** `Public Access`
- **Allowed operation:** `SELECT`
- **Target roles:** `public`
- **USING expression:** 
  ```sql
  true
  ```
- Clic en **"Review"** → **"Save policy"**

#### **POLÍTICA 2: Subir imágenes (INSERT) - AUTENTICADO**
- **Policy name:** `Authenticated users can upload`
- **Allowed operation:** `INSERT`
- **Target roles:** `authenticated`
- **WITH CHECK expression:**
  ```sql
  true
  ```
- Clic en **"Review"** → **"Save policy"**

---

## ✅ VERIFICACIÓN

Después de crear el bucket y las políticas:

1. **Recarga** la aplicación en el navegador (F5)
2. **Intenta** subir una imagen en un post
3. ✅ Debería funcionar sin error

---

## 🆘 Si sigue sin funcionar

### Opción 1: Verifica que el bucket sea PÚBLICO
- Ve a Storage → post-media
- Verifica que dice "Public" arriba

### Opción 2: Verifica las políticas
- Ve a Storage → post-media → Policies
- Deberías ver 2 políticas:
  1. "Public Access" (SELECT)
  2. "Authenticated users can upload" (INSERT)

### Opción 3: Limpia el navegador
- Presiona Ctrl + Shift + Delete (o Cmd + Shift + Delete en Mac)
- Borra cookies y caché
- Recarga la página

---

## 📝 RESUMEN RÁPIDO

✅ Bucket name: **post-media**
✅ Tipo: **Public**
✅ Política 1: SELECT para everyone (true)
✅ Política 2: INSERT para authenticated (true)

---

Una vez hecho esto, ¡deberías poder subir imágenes sin problemas! 🎉

