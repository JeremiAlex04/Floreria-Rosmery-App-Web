# ✅ CHECKLIST DE DESPLIEGUE A VERCEL

## 📋 Pre-Requisitos

- [ ] Cuenta en GitHub con el repositorio creado
- [ ] Cuenta en Vercel (https://vercel.com)
- [ ] Proyecto en Supabase configurado
- [ ] Cuenta en Stripe (modo Live)

---

## 🔧 Configuración Local

- [ ] `.env.local` creado en `Frontend_Next/`
- [ ] `.env.local` está en `.gitignore`
- [ ] `NEXT_PUBLIC_SUPABASE_URL` completado
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` completado
- [ ] `STRIPE_SECRET_KEY` completado (sk_live_)
- [ ] `NEXT_PUBLIC_STRIPE_PUBLIC_KEY` completado (pk_live_)
- [ ] `npm install` ejecutado exitosamente
- [ ] `npm run build` compiló sin errores
- [ ] `npm run dev` funciona localmente

---

## 📦 Código Listo

- [ ] Todos los cambios huyeron aplicados
- [ ] No hay archivos pendientes sin commit
- [ ] `.env.local` NO está en git (`.gitignore` funciona)
- [ ] `vercel.json` existe en `Frontend_Next/`
- [ ] `package.json` tiene `"private": true`

---

## 🌐 Repositorio GitHub

- [ ] Repositorio creado en GitHub
- [ ] Git inicializado localmente: `git init`
- [ ] Remote configurado: `git remote add origin ...`
- [ ] Branch renombrado a `main`: `git branch -M main`
- [ ] Primer commit hecho: `git add -A && git commit -m "Initial commit"`
- [ ] Push a GitHub: `git push -u origin main`
- [ ] Verificar en GitHub que los archivos aparecen

---

## 🔐 Credenciales de Supabase Listas

- [ ] Project URL copiado: `https://XXXXX.supabase.co`
- [ ] Anon Key copiado y guardado seguro
- [ ] Autenticación Google/Facebook configurada (opcional)
- [ ] Base de datos `orders` existe
- [ ] Tabla `order_items` existe
- [ ] Tabla `products` existe
- [ ] Tabla `profiles` existe
- [ ] Tabla `testimonials` existe

---

## 💳 Credenciales de Stripe Listas

- [ ] Modo LIVE activado en Stripe
- [ ] Secret Key copiado: `sk_live_...`
- [ ] Publishable Key copiado: `pk_live_...`
- [ ] Webhook configurado (opcional, pero recomendado)
- [ ] Plan de suscripción/productos configurados

---

## 🚀 Configuración en Vercel

### Proyecto
- [ ] Proyecto creado en Vercel
- [ ] GitHub conectado a Vercel
- [ ] Repositorio importado correctamente
- [ ] Root Directory configurado a `Frontend_Next`

### Environment Variables
- [ ] `NEXT_PUBLIC_SUPABASE_URL` agregado
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` agregado
- [ ] `NEXT_PUBLIC_STRIPE_PUBLIC_KEY` agregado
- [ ] `STRIPE_SECRET_KEY` agregado (Production only)
- [ ] Todos los variables guardados

### Build Configuration
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `.next`
- [ ] Install Command: `npm install`

---

## 🧪 Validación Post-Deploy

Después del primer deploy:

- [ ] URL de Vercel abre correctamente
- [ ] Home page carga sin errores
- [ ] Revisar Console (F12) - NO debe haber errores rojos
- [ ] Navegar a diferentes páginas funciona
- [ ] Búsqueda funciona
- [ ] Carrito funciona
- [ ] Login/Registro intenta conectar a Supabase
- [ ] Checkout intenta conectar a Stripe
- [ ] No hay errores en Vercel → Deployments → Logs

---

## 🔄 Deployment Automático

- [ ] Push a GitHub dispara deploy automático en Vercel
- [ ] Vercel muestra URL temporal de Preview
- [ ] After merge/push a `main`, actualiza Production

---

## 📊 Monitoreo Activo

- [ ] Verificar Vercel Dashboard regularmente
- [ ] Revisar Supabase Logs para errores de BD
- [ ] Monitorear Stripe Dashboard para transacciones
- [ ] Configurar alertas en Vercel (opcional)

---

## 🎉 ¡LISTO PARA PRODUCCIÓN!

Si todas las casillas están marcadas ✓, tu aplicación está lista en producción.

**URL de Producción**: `https://tu-proyecto.vercel.app`

---

## 📝 Notas

- Guardar este checklist para futuros despliegues
- Revisar logs regularmente en producción
- Mantener credenciales seguras y sin compartir
- Hacer backups de base de datos importantes
