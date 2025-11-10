-- ============================================
-- 🔧 SOLUCIONAR ERROR RLS EN POSTS
-- ============================================
-- Error: "new row violates row-level security policy"
-- Causa: La política de INSERT en tabla posts no permite insertar
-- ============================================

-- Este es el código que debes ejecutar en el SQL Editor de Supabase

-- Primero, elimina la política vieja si existe
DROP POLICY IF EXISTS "Los usuarios pueden crear posts" ON posts;

-- Crea la nueva política que PERMITE a usuarios autenticados crear posts
CREATE POLICY "Usuarios autenticados pueden crear posts" ON posts
  FOR INSERT 
  WITH CHECK (
    auth.uid() = user_id AND 
    auth.role() = 'authenticated'
  );

-- ============================================
-- ✅ LISTO
-- ============================================
-- Ejecuta este SQL y luego intenta subir una imagen nuevamente.
-- El error debería desaparecer.


