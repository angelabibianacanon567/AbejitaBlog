-- ============================================
-- 🔧 CORRECCIÓN: Error RLS al registrarse
-- ============================================
-- Ejecuta este código en el SQL Editor de Supabase
-- Esto soluciona el error: "new row violates row-level security policy for table profiles"
-- ============================================

-- 1. Crear función para crear perfil (usa SECURITY DEFINER para evitar RLS)
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

-- 2. Eliminar la política antigua de INSERT
DROP POLICY IF EXISTS "Los usuarios pueden insertar su propio perfil" ON profiles;

-- 3. Crear nueva política que permita insertar durante el registro
CREATE POLICY "Los usuarios autenticados pueden insertar su perfil" ON profiles
  FOR INSERT 
  WITH CHECK (
    auth.uid() = id AND 
    auth.role() = 'authenticated'
  );

-- ============================================
-- ✅ ¡LISTO!
-- ============================================
-- Ahora el registro debería funcionar correctamente.
-- La función create_profile puede ser llamada desde el código React
-- usando: supabase.rpc('create_profile', { p_user_id: ..., p_username: ..., p_display_name: ... })
-- ============================================

