@echo off
REM Script de configuración para Vercel - Floreria Rosmery
REM ========================================================

echo.
echo ===================================
echo Floreria Rosmery - Setup para Vercel
echo ===================================
echo.

REM Verificar si estamos en la carpeta correcta
if not exist "package.json" (
    echo ERROR: Debes ejecutar este script desde la carpeta Frontend_Next
    echo Navega a: c:\Users\Jeremi Alexander\Floreria-Rosmery-App-Web\Frontend_Next
    pause
    exit /b 1
)

echo [1/4] Verificando Node.js...
node --version
if errorlevel 1 (
    echo ERROR: Node.js no está instalado
    echo Descárgalo desde https://nodejs.org
    pause
    exit /b 1
)
echo ✓ Node.js encontrado
echo.

echo [2/4] Instalando dependencias...
call npm install
if errorlevel 1 (
    echo ERROR: Fallo la instalación de dependencias
    pause
    exit /b 1
)
echo ✓ Dependencias instaladas
echo.

echo [3/4] Compilando proyecto...
call npm run build
if errorlevel 1 (
    echo ERROR: Fallo la compilación
    echo Revisa los errores arriba
    pause
    exit /b 1
)
echo ✓ Compilación exitosa
echo.

echo [4/4] Verificando archivos de configuración...
if exist ".env.local" echo ✓ .env.local existe
if exist ".gitignore" echo ✓ .gitignore existe
if exist "vercel.json" echo ✓ vercel.json existe
if exist "package.json" echo ✓ package.json existe
echo.

echo ===================================
echo Configuración completada exitosamente
echo ===================================
echo.
echo Próximos pasos:
echo 1. Actualiza .env.local con tus credenciales reales:
echo    - NEXT_PUBLIC_SUPABASE_URL
echo    - NEXT_PUBLIC_SUPABASE_ANON_KEY
echo    - STRIPE_SECRET_KEY
echo    - NEXT_PUBLIC_STRIPE_PUBLIC_KEY
echo.
echo 2. Sube el proyecto a GitHub:
echo    git add .
echo    git commit -m "Initial commit"
echo    git push origin main
echo.
echo 3. Ve a https://vercel.com y conecta tu repositorio
echo.
echo Para más detalles, ver: DEPLOYMENT_INSTRUCTIONS.md
echo.
pause
