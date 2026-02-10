-- ================================================
-- FORZAR CONFIRMACIÓN DE EMAIL Y ROL ADMIN (CORREGIDO)
-- ================================================
    
DO $$
DECLARE
    -- 1. CAMBIA ESTE CORREO POR EL TUYO:
    target_email TEXT := 'admin@floreriarosmery.com'; 
BEGIN
    -- 2. CONFIRMAR EMAIL AUTOMÁTICAMENTE
    UPDATE auth.users
    SET email_confirmed_at = now()
    WHERE email = target_email;

    -- 3. PROMOVER A ADMIN
    UPDATE public.profiles
    SET role = 'admin'
    WHERE id = (SELECT id FROM auth.users WHERE email = target_email);
    
    RAISE NOTICE 'Usuario % confirmado y promovido a admin.', target_email;
END $$;

-- 4. VERIFICAR (Ejecuta esto después del bloque de arriba)
SELECT email, email_confirmed_at, role 
FROM auth.users u
JOIN public.profiles p ON u.id = p.id
WHERE u.email = 'admin@floreriarosmery.com'; -- < CAMBIA ESTO TAMBIÉN PARA VERIFICAR
