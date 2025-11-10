# 🔧 SOLUCIÓN: Error RLS al Registrarse

## 🚨 Problema
```
new row violates row-level security policy for table "profiles"
```

## ✅ SOLUCIÓN (2 PASOS)

### **PASO 1: Ejecutar SQL en Supabase**

1. Ve a: https://supabase.com/dashboard/project/kcaknjpxgihnexvboqco/sql
2. Abre el archivo `fix-registro.sql` de este proyecto
3. Copia TODO el contenido
4. Pégalo en el SQL Editor de Supabase
5. Haz clic en **"Run"** o presiona `Ctrl + Enter`
6. Espera el mensaje de éxito ✅

### **PASO 2: El código React ya está actualizado**

Ya actualicé el archivo `src/contexts/AuthContext.tsx` para usar la función RPC `create_profile`.

**No necesitas hacer nada más en el código.**

---

## 🎯 ¿Qué hace la solución?

1. **Crea una función `create_profile`** que usa `SECURITY DEFINER`
   - Esto permite crear el perfil sin restricciones de RLS
   - Se ejecuta con privilegios elevados

2. **Actualiza la política RLS** para permitir insertar perfiles
   - Los usuarios autenticados pueden crear su propio perfil
   - Verifica que el `user_id` coincida con el usuario autenticado

3. **Actualiza el código React** para usar la función RPC
   - Llama a `create_profile` mediante `supabase.rpc()`
   - Tiene un fallback por si la función RPC no está disponible

---

## ✅ VERIFICACIÓN

Después de ejecutar el SQL:

1. **Recarga la aplicación** en el navegador
2. **Intenta registrarte** nuevamente
3. Debería funcionar sin errores ✅

---

## 🆘 Si sigue sin funcionar

1. Verifica que ejecutaste el SQL correctamente
2. Verifica que la función `create_profile` existe en Supabase:
   - Ve a: Database → Functions
   - Deberías ver `create_profile` en la lista

3. Verifica que las políticas están actualizadas:
   - Ve a: Database → Policies
   - En la tabla `profiles`, deberías ver 3 políticas:
     - "Los perfiles son visibles públicamente" (SELECT)
     - "Los usuarios pueden actualizar su propio perfil" (UPDATE)
     - "Los usuarios autenticados pueden insertar su perfil" (INSERT)

---

## 📝 Código SQL Completo

El archivo `fix-registro.sql` contiene:
- Función `create_profile` con SECURITY DEFINER
- Eliminación de política antigua
- Creación de nueva política más permisiva

---

## 🎉 ¡LISTO!

Una vez ejecutado el SQL, el registro debería funcionar perfectamente.

**Prueba a registrarte nuevamente y debería funcionar sin problemas.**

