# 🚀 GUÍA COMPLETA DE DESPLIEGUE EN VERCEL

## 📋 Checklist Pre-Despliegue

- [x] Código compilado sin errores
- [x] Variables de entorno configuradas localmente
- [x] Git repository configurado
- [x] `.env.local` en `.gitignore`
- [x] Repositorio conectado a GitHub

---

## 🔑 PASO 1: Obtener tus Credenciales

### 1.1 Credenciales de Supabase
1. Abre https://app.supabase.com
2. Selecciona tu proyecto **Florería Rosmery**
3. Ve a **Settings → API**
4. Copia y guarda:
   - **Project URL** (ej: `https://xxxxxxxx.supabase.co`)
   - **anon public key** (ej: `eyJhbGc...`)

### 1.2 Credenciales de Stripe
1. Abre https://dashboard.stripe.com/apikeys
2. Si no tienes ambiente de producción, actívalo en **Settings → Modo de prueba/producción**
3. En modo **LIVE** copia y guarda:
   - **Secret Key** (ej: `sk_live_...`) - NUNCA COMPARTAS ESTO
   - **Publishable Key** (ej: `pk_live_...`)

---

## 📦 PASO 2: Preparar el Repositorio Git

### 2.1 Inicializar Git (si no está hecho)
```bash
cd c:\Users\Jeremi Alexander\Floreria-Rosmery-App-Web\Frontend_Next

# Si ya existe .git, saltar este paso
git init

# Si no está configurado
git config user.email "tu@correo.com"
git config user.name "Tu Nombre"
```

### 2.2 Verificar `.gitignore` se cumpla
```bash
# Ver qué archivos se subirán (NO debe incluir .env.local)
git status

# Ejemplo correcto de salida:
# deleted:    .env.local
# On branch main
# Changes to be committed:
#   (use "git restore --cached <file>..." to unstage)
#     new file:   .gitignore
```

### 2.3 Hacer primer commit
```bash
cd "c:\Users\Jeremi Alexander\Floreria-Rosmery-App-Web\Frontend_Next"
git add -A
git commit -m "Initial commit: Floreria Rosmery App listo para Vercel"
```

### 2.4 Crear rama main (si necesario)
```bash
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
git push -u origin main
```

---

## 🌐 PASO 3: Conectar a Vercel

### 3.1 Crear Proyecto en Vercel
1. Abre https://vercel.com/dashboard
2. Haz clic en **"Add New" → "Project"**
3. En **"Import Git Repository"**, conecta tu GitHub (si no está conectado)
4. Selecciona el repositorio `Floreria-Rosmery-App-Web`
5. Haz clic en **"Import"**

### 3.2 Configurar Proyecto
En **"Configure Project"**:
- **Project Name**: `floreria-rosmery` (o similar)
- **Framework Preset**: Vercel detectará automáticamente `Next.js`
- **Root Directory**: Selecciona **`Frontend_Next`** ⚠️ IMPORTANTE
- **Build Command**: `npm run build` (por defecto)
- **Output Directory**: `.next` (por defecto)
- **Install Command**: `npm install` (por defecto)

Haz clic en **"Deploy"** (esto fallará sin variables de entorno, pero es normal)

---

## 🔐 PASO 4: Agregar Variables de Entorno en Vercel

### 4.1 Ir a Configuración
En tu proyecto Vercel → **Settings → Environment Variables**

### 4.2 Agregar Variables (Una por una)

**Variable 1: Supabase URL**
- Key: `NEXT_PUBLIC_SUPABASE_URL`
- Value: `https://tu-proyecto.supabase.co` (tu URL de Supabase)
- Ambientes: Production, Preview, Development
- Clic en **"Save"**

**Variable 2: Supabase Anon Key**
- Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Value: `eyJhbGc...` (tu clave de Supabase)
- Ambientes: Production, Preview, Development
- Clic en **"Save"**

**Variable 3: Stripe Secret Key**
- Key: `STRIPE_SECRET_KEY`
- Value: `sk_live_...` (tu clave secreta de Stripe)
- Ambientes: **SOLO Production** ⚠️
- Clic en **"Save"**

**Variable 4: Stripe Public Key**
- Key: `NEXT_PUBLIC_STRIPE_PUBLIC_KEY`
- Value: `pk_live_...` (tu clave pública de Stripe)
- Ambientes: Production, Preview, Development
- Clic en **"Save"**

### 4.3 Verificar que todos están guardados
```
✓ NEXT_PUBLIC_SUPABASE_URL
✓ NEXT_PUBLIC_SUPABASE_ANON_KEY
✓ STRIPE_SECRET_KEY
✓ NEXT_PUBLIC_STRIPE_PUBLIC_KEY
```

---

## 📤 PASO 5: Redeploy después de Agregar Variables

### 5.1 Opción A: Desde Vercel (Recomendado)
1. En tu proyecto Vercel → **Deployments**
2. Haz clic en el primer despliegue (estado "Failed")
3. En el menú de 3 puntos → **"Redeploy"**
4. Vercel compilará nuevamente con las variables de entorno

### 5.2 Opción B: Desde Git
```bash
cd "c:\Users\Jeremi Alexander\Floreria-Rosmery-App-Web\Frontend_Next"
git add .
git commit -m "Production deployment ready"
git push origin main
```
Vercel detectará el push y redeployará automáticamente.

---

## ✅ PASO 6: Validar Despliegue

### 6.1 Verificar Estado en Vercel
1. En **Deployments**, espera a que aparezca un checkmark verde ✓
2. Verás un URL como: `https://floreria-rosmery.vercel.app`

### 6.2 Probar la Aplicación
1. Abre el URL de Vercel en el navegador
2. Verifica que la página home cargue correctamente
3. Prueba la navegación básica

### 6.3 Probar Autenticación
1. Abre **Iniciar Sesión**
2. Intenta registrarte o login (debe conectar con Supabase)
3. Abre DevTools (F12) → **Console** buscando errores

### 6.4 Probar API Checkout
1. Agrega un producto al carrito
2. Intenta proceder al checkout
3. Debe conectar correctamente con Stripe

### 6.5 Revisar Logs en Vercel
Si algo falla:
1. En tu proyecto → **Deployments**
2. Haz clic en el despliegue
3. Ve a **"Logs"** para ver errores detallados

---

## 🐛 Troubleshooting Común

### Error: "Supabase credentials missing"
```
❌ Problema: Las credenciales de Supabase no están configuradas
✅ Solución:
   1. Abre Vercel → Settings → Environment Variables
   2. Verifica que NEXT_PUBLIC_SUPABASE_URL tiene valor
   3. Verifica que NEXT_PUBLIC_SUPABASE_ANON_KEY tiene valor
   4. Redeploy
```

### Error: "Stripe secret key not configured"
```
❌ Problema: Stripe no está configurado en Backend
✅ Solución:
   1. Abre Vercel → Settings → Environment Variables
   2. Verifica que STRIPE_SECRET_KEY existe y tiene valor
   3. Debe ser una clave LIVE (sk_live_...), no de prueba
   4. Debe estar en ambientes de Production
   5. Redeploy
```

### Error: "Build failed - Next.js compilation"
```
❌ Problema: Hay errores de TypeScript o importación
✅ Solución:
   1. Ejecuta localmente: npm run build
   2. Revisa los errores que muestra
   3. Arregla los errores
   4. Haz commit y push a GitHub
   5. Vercel redeployará automáticamente
```

### Error: "Cannot find module '@supabase/supabase-js'"
```
❌ Problema: Las dependencias no se instalaron correctamente
✅ Solución:
   1. En Vercel → Settings → Build & Deployment
   2. En "Install Command" asegúrate que es: npm install
   3. Trigger a rebuild desde Deployments
```

---

## 🔄 Flujo de Trabajo Futuro

Cada vez que hagas cambios:

```bash
# 1. Hacer cambios locales
# 2. Probar localmente
npm run dev

# 3. Si todo funciona, hacer commit
git add -A
git commit -m "Descripción de cambios"

# 4. Push a GitHub
git push origin main

# 5. Vercel detecta y redeploya automáticamente ✨
```

---

## 📊 Monitorear en Producción

### Vercel Analytics
- **Deployments**: Historial de despliegues
- **Analytics**: Rendimiento, visitas, tiempos de carga
- **Logs**: Ver errores en tiempo real

### Supabase Dashboard
- **Auth**: Ver usuarios registrados
- **Database**: Monitorear datos y transacciones
- **Logs**: Ver errores de base de datos

### Stripe Dashboard
- **Payment Links**: Ver transacciones procesadas
- **Customers**: Ver clientes que realizaron compras
- **Logs**: Ver errores de pago

---

## 🎉 ¡Listo!

Tu aplicación está desplegada en producción. 

**URL de Producción**: https://tu-proyecto.vercel.app

---

## 📞 Soporte

Si algo no funciona:
1. Revisa los [Logs de Vercel](https://vercel.com/docs/deployments/logs)
2. Verifica las [Credenciales de Supabase](https://app.supabase.com/project/YOUR_PROJECT_ID/settings/api)
3. Valida las [Claves de Stripe](https://dashboard.stripe.com/apikeys)
4. Ejecuta `npm run build` localmente para reproducir errores
