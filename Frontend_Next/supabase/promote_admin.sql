-- ================================================
-- SCRIPT PARA CREAR UN SUPERADMINISTRADOR
-- ================================================

-- 1. Primero, asegúrate de haberte registrado en la página de inicio de sesión (/iniciosesion)
--    con el correo que deseas usar.

-- 2. Luego, ejecuta este comando reemplazando el correo:
UPDATE public.profiles
SET role = 'admin'
WHERE id IN (
    SELECT id FROM auth.users WHERE email = 'admin@floreriarosmery.com' 
    -- ^^^ CAMBIA ESTE CORREO POR EL TUYO ^^^
);

-- 3. Confirmación (Opcional):
SELECT * FROM public.profiles WHERE role = 'admin';
