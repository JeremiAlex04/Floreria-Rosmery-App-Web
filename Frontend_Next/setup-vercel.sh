#!/bin/bash

# Script de Setup para Vercel - Floreria Rosmery
# Para Mac/Linux
# Uso: chmod +x setup-vercel.sh && ./setup-vercel.sh

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo ""
echo -e "${CYAN}===================================${NC}"
echo -e "${CYAN} Floreria Rosmery - Setup Vercel${NC}"
echo -e "${CYAN}===================================${NC}"
echo ""

# Verificar que estamos en la carpeta correcta
if [ ! -f "package.json" ]; then
    echo -e "${RED}ERROR: Debes ejecutar este script desde Frontend_Next${NC}"
    echo -e "${YELLOW}Navega a: ~/Floreria-Rosmery-App-Web/Frontend_Next${NC}"
    exit 1
fi

# Paso 1: Verificar Node.js
echo -e "${YELLOW}[1/5] Verificando Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}ERROR: Node.js no está instalado${NC}"
    echo -e "${CYAN}Descárgalo desde: https://nodejs.org${NC}"
    exit 1
fi
node_version=$(node --version)
echo -e "${GREEN}✓ Node.js $node_version encontrado${NC}"
sleep 0.5

# Paso 2: Instalar dependencias
echo ""
echo -e "${YELLOW}[2/5] Instalando dependencias...${NC}"
if ! npm install; then
    echo -e "${RED}ERROR: Falló la instalación de dependencias${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Dependencias instaladas${NC}"
sleep 0.5

# Paso 3: Compilar proyecto
echo ""
echo -e "${YELLOW}[3/5] Compilando proyecto...${NC}"
if ! npm run build; then
    echo -e "${RED}ERROR: Falló la compilación${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Compilación exitosa${NC}"
sleep 0.5

# Paso 4: Verificar Git
echo ""
echo -e "${YELLOW}[4/5] Verificando Git...${NC}"
if ! command -v git &> /dev/null; then
    echo -e "${YELLOW}AVISO: Git no está instalado${NC}"
    echo -e "${CYAN}Descárgalo desde: https://git-scm.com${NC}"
else
    git_version=$(git --version)
    echo -e "${GREEN}✓ $git_version encontrado${NC}"
fi
sleep 0.5

# Paso 5: Verificar archivos de configuración
echo ""
echo -e "${YELLOW}[5/5] Verificando archivos de configuración...${NC}"
files=(".env.local" ".gitignore" "vercel.json" "package.json")
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓ $file existe${NC}"
    else
        echo -e "${YELLOW}⚠ $file no encontrado${NC}"
    fi
done

echo ""
echo -e "${CYAN}===================================${NC}"
echo -e "${GREEN}Setup completado exitosamente${NC}"
echo -e "${CYAN}===================================${NC}"
echo ""

echo -e "${CYAN}PRÓXIMOS PASOS:${NC}"
echo ""
echo -e "${CYAN}1. Actualiza .env.local con tus credenciales reales:${NC}"
echo "   - NEXT_PUBLIC_SUPABASE_URL"
echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "   - STRIPE_SECRET_KEY"
echo "   - NEXT_PUBLIC_STRIPE_PUBLIC_KEY"
echo ""

echo -e "${CYAN}2. Sube a GitHub:${NC}"
echo "   git add ."
echo "   git commit -m 'Initial commit'"
echo "   git push origin main"
echo ""

echo -e "${CYAN}3. Ve a https://vercel.com y conecta tu repositorio${NC}"
echo ""

echo -e "${CYAN}4. Para más detalles, abre: DEPLOYMENT_INSTRUCTIONS.md${NC}"
echo ""

echo -e "${GREEN}¡Listo para desplegar!${NC}"
echo ""
