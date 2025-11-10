# 🗄️ CONFIGURAR STORAGE EN SUPABASE

## 🚨 Error: 400 Bad Request al subir imágenes

Este error ocurre porque el bucket de Storage no está configurado correctamente.

## ✅ SOLUCIÓN PASO A PASO

### **PASO 1: Crear el Bucket**

1. Ve a: https://supabase.com/dashboard/project/kcaknjpxgihnexvboqco/storage
2. Haz clic en **"Create a new bucket"**
3. Nombre del bucket: `post-media`
4. Marca **"Public bucket"** ✓ (MUY IMPORTANTE)
5. Haz clic en **"Create bucket"**

### **PASO 2: Configurar Políticas de Storage**

1. Selecciona el bucket `post-media`
2. Ve a la pestaña **"Policies"**
3. Haz clic en **"New Policy"**

#### **POLÍTICA 1: Public Access (SELECT)**

- **Policy name:** `Public Access`
- **Allowed operation:** `SELECT`
- **Target roles:** `public`
- **USING expression:**
  ```sql
  true
  ```
- Haz clic en **"Review"** y luego **"Save policy"**

#### **POLÍTICA 2: Authenticated Upload (INSERT)**

- **Policy name:** `Authenticated users can upload`
- **Allowed operation:** `INSERT`
- **Target roles:** `authenticated`
- **WITH CHECK expression:**
  ```sql
  true
  ```
- Haz clic en **"Review"** y luego **"Save policy"**

#### **POLÍTICA 3: Authenticated Delete (DELETE)**

- **Policy name:** `Authenticated users can delete`
- **Allowed operation:** `DELETE`
- **Target roles:** `authenticated`
- **USING expression:**
  ```sql
  auth.uid()::text = (storage.foldername(name))[1]
  ```
- Haz clic en **"Review"** y luego **"Save policy"**

### **PASO 3: Verificar Configuración**

Después de crear las políticas, deberías ver 3 políticas en el bucket:
- ✅ Public Access (SELECT)
- ✅ Authenticated users can upload (INSERT)
- ✅ Authenticated users can delete (DELETE)

---

## 🎯 ESTRUCTURA DEL BUCKET

El código ahora sube los archivos en carpetas por usuario:
```
post-media/
  └── [user-id]/
      ├── [timestamp]-[random].jpg
      ├── [timestamp]-[random].png
      └── ...
```

Esto ayuda a organizar los archivos y aplicar políticas de seguridad.

---

## ✅ VERIFICACIÓN

1. **Recarga la aplicación** en el navegador
2. **Intenta crear un post con una imagen**
3. Debería funcionar sin errores ✅

---

## 🆘 SI SIGUE SIN FUNCIONAR

### Verifica:
1. ✅ El bucket `post-media` existe
2. ✅ El bucket está marcado como **"Public bucket"**
3. ✅ Las 3 políticas están creadas correctamente
4. ✅ Estás autenticado cuando intentas subir archivos

### Errores comunes:

**Error 400:**
- El bucket no existe o no es público
- Las políticas no están configuradas

**Error 403:**
- Las políticas de INSERT no están configuradas
- No estás autenticado

**Error 404:**
- El bucket no existe
- El nombre del bucket es incorrecto

---

## 📝 NOTAS

- El tamaño máximo de archivo es **10MB** (configurado en el código)
- Los archivos se organizan por usuario automáticamente
- Solo los usuarios autenticados pueden subir archivos
- Cualquiera puede ver los archivos (bucket público)

---

## 🎉 ¡LISTO!

Una vez configurado el Storage, podrás subir imágenes, videos y audios sin problemas.

