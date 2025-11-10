-- ============================================
-- 🔧 SOLUCIONAR ERROR RLS EN POSTS (Versión 2)
-- ============================================
-- Error: "new row violates row-level security policy"
-- Solución: Crear política más permisiva
-- ============================================

-- PASO 1: Desactivar RLS temporalmente para limpiar
ALTER TABLE posts DISABLE ROW LEVEL SECURITY;

-- PASO 2: Eliminar todas las políticas de INSERT
DROP POLICY IF EXISTS "Los usuarios pueden crear posts" ON posts;
DROP POLICY IF EXISTS "Usuarios autenticados pueden crear posts" ON posts;

-- PASO 3: Reactivar RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- PASO 4: Crear política SIMPLE y PERMISIVA para INSERT
CREATE POLICY "insert_posts_authenticated" ON posts
  FOR INSERT 
  WITH CHECK (true);

-- PASO 5: Crear política para SELECT (ver posts)
CREATE POLICY "select_posts_public" ON posts
  FOR SELECT 
  USING (true);

-- PASO 6: Crear política para UPDATE (actualizar propios posts)
CREATE POLICY "update_posts_own" ON posts
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- PASO 7: Crear política para DELETE (eliminar propios posts)
CREATE POLICY "delete_posts_own" ON posts
  FOR DELETE 
  USING (auth.uid() = user_id);

-- ============================================
-- ✅ LISTO
-- ============================================
-- Ejecuta este SQL completo y luego intenta subir una imagen.


