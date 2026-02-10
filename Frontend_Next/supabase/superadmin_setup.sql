-- ================================================
-- REPARACIÓN TOTAL DE PERFILES Y SUPERADMIN
-- ================================================

-- 1. Crear tabla profiles si no existe
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('admin', 'customer')),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Habilitar RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Crear Políticas de Seguridad (si fallan es porque ya existen, no importa)
DO $$ BEGIN
    CREATE POLICY "Usuarios ven su propio perfil" ON public.profiles FOR SELECT USING (auth.uid() = id);
    CREATE POLICY "Usuarios actualizan su propio perfil" ON public.profiles FOR UPDATE USING (auth.uid() = id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 4. Función para crear perfil automáticamente al registrarse
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', 'customer');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Trigger (Disparador)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 6. REPARAR USUARIOS EXISTENTES (Backfill)
-- Esto crea perfiles para usuarios que ya se registraron pero no tienen perfil
INSERT INTO public.profiles (id, full_name, role)
SELECT id, raw_user_meta_data->>'full_name', 'customer'
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.profiles);

-- 7. PROMOVER TU USUARIO A ADMIN
-- Reemplaza el correo aquí abajo antes de ejecutar
UPDATE public.profiles
SET role = 'admin'
WHERE id IN (
    SELECT id FROM auth.users WHERE email = 'admin@floreriarosmery.com'
);

-- 8. Verificación
SELECT * FROM public.profiles;
