# 📋 Guía de Despliegue en Vercel

## ✅ Pre-requisitos

1. **Proyecto en GitHub** - El repositorio debe estar en GitHub
2. **Cuenta en Vercel** - Crear en https://vercel.com
3. **Credenciales de Supabase** - Proyecto configurado en Supabase
4. **Claves de Stripe** - Cuenta de Stripe configurada

---

## 🚀 Paso 1: Conectar a Vercel

1. Ir a [vercel.com/dashboard](https://vercel.com/dashboard)
2. Hacer clic en **"Add New..." → "Project"**
3. Seleccionar el repositorio de **Floreria-Rosmery-App-Web**
4. En **"Configure Project"**, seleccionar:
   - **Root Directory**: `Frontend_Next`
   - **Build Command**: `npm run build` (dejar por defecto)
   - **Output Directory**: `.next` (dejar por defecto)

---

## 🔐 Paso 2: Agregar Variables de Entorno en Vercel

1. En el proyecto de Vercel, ir a **Settings → Environment Variables**
2. Agregar las siguientes variables:

### Variables Públicas (Frontend)
```
NEXT_PUBLIC_SUPABASE_URL = https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJ...
NEXT_PUBLIC_STRIPE_PUBLIC_KEY = pk_live_...
```

### Variables Privadas (Backend/API)
```
STRIPE_SECRET_KEY = sk_live_...
```

> ⚠️ **IMPORTANTE**: 
> - Las variables con prefijo `NEXT_PUBLIC_` son visibles en el navegador
> - Las variables sin prefijo solo están disponibles en el servidor
> - Nunca compartas `STRIPE_SECRET_KEY` ni `NEXT_PUBLIC_SUPABASE_ANON_KEY` públicamente

---

## 📍 Paso 3: Obtener tus Credenciales

### Supabase
1. Ir a [app.supabase.com](https://app.supabase.com)
2. Seleccionar tu proyecto
3. Ir a **Settings → API** 
4. Copiar:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Stripe
1. Ir a [dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys)
2. Copiar:
   - **Secret key** → `STRIPE_SECRET_KEY`
   - **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLIC_KEY`

---

## 🧪 Paso 4: Probar Variables Localmente

1. Actualizar `.env.local` con tus credenciales reales:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_live_...
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

2. Ejecutar localmente:
```bash
npm run build
npm run start
```

3. Probar en http://localhost:3000

---

## 🚀 Paso 5: Desplegar

1. En Vercel, hacer clic en **"Deploy"**
2. Vercel compilará e instalará el proyecto
3. Una vez completado, verás un URL como: `https://floreria-rosmery.vercel.app`

---

## 🐛 Troubleshooting

### Error: "Supabase credentials missing"
- ✅ Verificar que `NEXT_PUBLIC_SUPABASE_URL` está configurada en Vercel
- ✅ Verificar que `NEXT_PUBLIC_SUPABASE_ANON_KEY` está configurada en Vercel

### Error: "Stripe secret key not configured"
- ✅ Verificar que `STRIPE_SECRET_KEY` está configurada en Vercel (sin prefijo `NEXT_PUBLIC_`)
- ✅ Asegurarse que es la clave de **producción** (comienza con `sk_live_`)

### Error: "Build failed"
- ✅ Revisar los logs de compilación en Vercel
- ✅ Ejecutar `npm run build` localmente para reproducir el error
- ✅ Revisar que no hay errores de TypeScript

### Página muestra error en checkout
- ✅ Abrir DevTools (F12) → Console
- ✅ Verificar que las URLs de Stripe son correctas
- ✅ Verificar que `NEXT_PUBLIC_BASE_URL` está configurada correctamente

---

## 📊 Monitorear en Producción

1. En Vercel → **"Deployments"**: ver historial de despliegues
2. En Vercel → **"Analytics"**: monitorear rendimiento
3. En Supabase → **"Logs"**: ver actividad de la base de datos
4. En Supabase → **"Auth"**: ver usuarios registrados
5. En Stripe → **Dashboard**: ver transacciones

---

## 🔄 Redeploy después de cambios

Simplemente hacer push a `main` en GitHub y Vercel se redeployará automáticamente.

```bash
git add .
git commit -m "Tu mensaje"
git push origin main
```

Vercel detectará el cambio y compilará automáticamente.
