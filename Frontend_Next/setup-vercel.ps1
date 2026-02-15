# Script de Setup para Vercel - Floreria Rosmery
# Ejecutar con: powershell -ExecutionPolicy Bypass -File setup-vercel.ps1

Write-Host "`n" -ForegroundColor Green
Write-Host "===================================" -ForegroundColor Cyan
Write-Host " Floreria Rosmery - Setup Vercel" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host "`n"

# Verificar que estamos en la carpeta correcta
if (-not (Test-Path "package.json")) {
    Write-Host "ERROR: Debes ejecutar este script desde Frontend_Next" -ForegroundColor Red
    Write-Host "Navega a: c:\Users\Jeremi Alexander\Floreria-Rosmery-App-Web\Frontend_Next" -ForegroundColor Yellow
    Read-Host "Presiona Enter para salir"
    exit 1
}

# Paso 1: Verificar Node.js
Write-Host "[1/5] Verificando Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Node.js no está instalado" -ForegroundColor Red
    Write-Host "Descárgalo desde: https://nodejs.org" -ForegroundColor Cyan
    Read-Host "Presiona Enter para salir"
    exit 1
}
Write-Host "✓ Node.js $nodeVersion encontrado" -ForegroundColor Green
Start-Sleep -Milliseconds 500

# Paso 2: Instalar dependencias
Write-Host "`n[2/5] Instalando dependencias..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Falló la instalación de dependencias" -ForegroundColor Red
    Read-Host "Presiona Enter para salir"
    exit 1
}
Write-Host "✓ Dependencias instaladas" -ForegroundColor Green
Start-Sleep -Milliseconds 500

# Paso 3: Compilar proyecto
Write-Host "`n[3/5] Compilando proyecto..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Falló la compilación" -ForegroundColor Red
    Read-Host "Presiona Enter para salir"
    exit 1
}
Write-Host "✓ Compilación exitosa" -ForegroundColor Green
Start-Sleep -Milliseconds 500

# Paso 4: Verificar Git
Write-Host "`n[4/5] Verificando Git..." -ForegroundColor Yellow
$gitVersion = git --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "AVISO: Git no está instalado" -ForegroundColor Yellow
    Write-Host "Descárgalo desde: https://git-scm.com" -ForegroundColor Cyan
} else {
    Write-Host "✓ Git $gitVersion encontrado" -ForegroundColor Green
}
Start-Sleep -Milliseconds 500

# Paso 5: Verificar archivos de configuración
Write-Host "`n[5/5] Verificando archivos de configuración..." -ForegroundColor Yellow
$files = @(".env.local", ".gitignore", "vercel.json", "package.json")
foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "✓ $file existe" -ForegroundColor Green
    } else {
        Write-Host "⚠ $file no encontrado" -ForegroundColor Yellow
    }
}

Write-Host "`n" -ForegroundColor Green
Write-Host "===================================" -ForegroundColor Cyan
Write-Host "Setup completado exitosamente" -ForegroundColor Green
Write-Host "===================================" -ForegroundColor Cyan
Write-Host "`n"

Write-Host "PRÓXIMOS PASOS:" -ForegroundColor Cyan
Write-Host "`n1. Actualiza .env.local con tus credenciales reales:" -ForegroundColor White
Write-Host "   - NEXT_PUBLIC_SUPABASE_URL" -ForegroundColor Gray
Write-Host "   - NEXT_PUBLIC_SUPABASE_ANON_KEY" -ForegroundColor Gray
Write-Host "   - STRIPE_SECRET_KEY" -ForegroundColor Gray
Write-Host "   - NEXT_PUBLIC_STRIPE_PUBLIC_KEY" -ForegroundColor Gray

Write-Host "`n2. Sube a GitHub:" -ForegroundColor White
Write-Host "   git add ." -ForegroundColor Gray
Write-Host "   git commit -m 'Initial commit'" -ForegroundColor Gray
Write-Host "   git push origin main" -ForegroundColor Gray

Write-Host "`n3. Ve a https://vercel.com y conecta tu repositorio" -ForegroundColor White

Write-Host "`n4. Para más detalles, abre: DEPLOYMENT_INSTRUCTIONS.md" -ForegroundColor White

Write-Host "`n" -ForegroundColor Green
Write-Host "¡Listo para desplegar!" -ForegroundColor Green
Write-Host "`n"

Read-Host "Presiona Enter para cerrar"
