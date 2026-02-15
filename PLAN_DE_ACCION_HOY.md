# 📅 PLAN DE ACCIÓN HOY

> Fecha: 15 de febrero de 2026

---

## 🎯 Objetivo
Desplegar **Florería Rosmery** en **Vercel** hoy mismo.

---

## 📝 To-Do List

### Fase 1: Preparación (5 minutos)
- [ ] Abrir este archivo: `PLAN_DE_ACCION_HOY.md`
- [ ] Abrir en otra ventana: `DEPLOYMENT_INSTRUCTIONS.md`
- [ ] Tener a mano credenciales de:
  - [ ] Supabase (https://app.supabase.com)
  - [ ] Stripe (https://dashboard.stripe.com)

### Fase 2: Configuración Local (10 minutos)
- [ ] Editar `.env.local` con credenciales reales
  - [ ] `NEXT_PUBLIC_SUPABASE_URL` = [obtener de Supabase]
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` = [obtener de Supabase]
  - [ ] `STRIPE_SECRET_KEY` = [obtener de Stripe, modo LIVE]
  - [ ] `NEXT_PUBLIC_STRIPE_PUBLIC_KEY` = [obtener de Stripe]
  - [ ] `NEXT_PUBLIC_BASE_URL` (ya está: `http://localhost:3000`)
- [ ] Guardar `File → Save` (Ctrl+S)

### Fase 3: Probar Localmente (5 minutos)
- [ ] Abrir terminal en VS Code
- [ ] Ejecutar: `npm run build`
- [ ] Si hay errores: revisar y corregir
- [ ] Si compiló: continuar

### Fase 4: Commit a Git (5 minutos)
- [ ] Terminal en `Frontend_Next`
- [ ] Ejecutar: `git status` (verificar cambios)
- [ ] Ejecutar: `git add -A`
- [ ] Ejecutar: `git commit -m "Configure Vercel deployment"`
- [ ] Ejecutar: `git push origin main`
- [ ] Esperar a que termine

### Fase 5: Conectar a Vercel (5 minutos)
- [ ] Abrir https://vercel.com/dashboard
- [ ] Clic: "Add New → Project"
- [ ] Conectar GitHub (si no está conectado)
- [ ] Seleccionar: `Floreria-Rosmery-App-Web`
- [ ] Configurar:
  - Root Directory: `Frontend_Next` ⚠️
  - Build Command: `npm run build` (por defecto)
  - Output: `.next` (por defecto)
- [ ] Clic: "Deploy"
- [ ] Esperar... (fallará sin variables, es normal)

### Fase 6: Agregar Variables en Vercel (5 minutos)
- [ ] En Vercel, entrar al proyecto
- [ ] Ir a: **Settings → Environment Variables**
- [ ] Agregar variables (una por una):
  
  **Variable 1:**
  - [ ] Key: `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] Value: [tu URL de Supabase]
  - [ ] Ambientes: ✓ Production, ✓ Preview, ✓ Development
  - [ ] Clic: "Save"
  
  **Variable 2:**
  - [ ] Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] Value: [tu anon key de Supabase]
  - [ ] Ambientes: ✓ Production, ✓ Preview, ✓ Development
  - [ ] Clic: "Save"
  
  **Variable 3:**
  - [ ] Key: `NEXT_PUBLIC_STRIPE_PUBLIC_KEY`
  - [ ] Value: [tu public key de Stripe]
  - [ ] Ambientes: ✓ Production, ✓ Preview, ✓ Development
  - [ ] Clic: "Save"
  
  **Variable 4:**
  - [ ] Key: `STRIPE_SECRET_KEY`
  - [ ] Value: [tu secret key de Stripe]
  - [ ] Ambientes: ✓ SOLO Production ⚠️
  - [ ] Clic: "Save"

### Fase 7: Redeploy (2 minutos)
- [ ] En Vercel, ir a: **Deployments**
- [ ] Encontrar tu primer deploy (estado "Failed")
- [ ] Clic en el menú (3 puntos): **"Redeploy"**
- [ ] Esperar a que compile...
- [ ] Esperar a que aparezca checkmark ✅

### Fase 8: Validar en Producción (5 minutos)
- [ ] Copiar URL de Vercel (ej: https://xxx.vercel.app)
- [ ] Abrir en navegador
- [ ] Verificar:
  - [ ] Home page carga correctamente
  - [ ] Navegación funciona
  - [ ] Búsqueda funciona
  - [ ] Carrito funciona
  - [ ] Abre F12 Console (sin errores rojos)
- [ ] Probar Login:
  - [ ] Abre /iniciosesion
  - [ ] Intenta login (debe conectar con Supabase)
  - [ ] Revisa Console por errores
- [ ] Probar Checkout:
  - [ ] Agrega un producto
  - [ ] Ve al carrito
  - [ ] Intenta checkout (debe conectar con Stripe)
  - [ ] Revisa Console por errores

### Fase 9: Celebrar 🎉
- [ ] ✅ ¡Tu app está en producción!
- [ ] URL: [tu-vercel-url]
- [ ] Comparte con el equipo

---

## ⏱️ Tiempo Total Estimado

| Fase | Minutos |
|------|---------|
| 1. Preparación | 5 |
| 2. Configuración | 10 |
| 3. Testing local | 5 |
| 4. Git commit | 5 |
| 5. Vercel setup | 5 |
| 6. Variables | 5 |
| 7. Redeploy | 2 |
| 8. Validación | 5 |
| 9. Celebración | ∞ |
| **TOTAL** | **~42 minutos** |

---

## 🚨 Si Algo Sale Mal

### Problema: No puedo encontrar mis credenciales

**Supabase:**
1. Abre https://app.supabase.com
2. Selecciona tu proyecto
3. Ve a **Settings → API**
4. Copia los valores

**Stripe:**
1. Abre https://dashboard.stripe.com
2. Haz clic en el ícono de cuenta (arriba derecha)
3. Asegúrate estar en modo **LIVE**
4. Ve a **Developers → API Keys**
5. Copia los valores

### Problema: npm run build falla

1. Abre terminal en VS Code
2. Navega a `Frontend_Next`
3. Ejecuta: `npm install`
4. Ejecuta: `npm run build`
5. Lee el mensaje de error (línea del problema)
6. Arregla el error en el código
7. Intenta nuevamente

### Problema: Git push falla

1. Terminal: `git status` (ver cambios)
2. Si dice "untracked files": `git add -A`
3. Si dice "nothing to commit": ya subiste
4. Si dice "rejected": ya otros cambios arriba, `git pull` primero
5. Prueba nuevamente: `git push origin main`

### Problema: Vercel deploy sigue fallando

1. En Vercel, ve a tu proyecto
2. Abre **Deployments**
3. Haz clic en el deploy fallido
4. Ve a **Logs**
5. Lee el error (generalmente muy específico)
6. Haz arreglos locales
7. Git commit + push nuevamente
8. Vercel redeployará automáticamente

### Problema: Variables de entorno no funcionan

1. En Vercel, ve a **Settings → Environment Variables**
2. Verifica que existen las 4 variables
3. Verifica que tienen el nombre exacto (mayúsculas/minúsculas)
4. Verifica que tienen ambientes configurados correctamente
5. Ve a **Deployments → Redeploy**
6. Espera a que compile nuevamente

---

## 📞 Contactos de Soporte

| Servicio | Soporte |
|----------|---------|
| Vercel | https://vercel.com/support |
| Supabase | https://supabase.com/support |
| Stripe | https://support.stripe.com |
| Next.js | https://nextjs.org/docs |

---

## 🎓 Documentos de Referencia

Mientras ejecutas este plan, estos documentos están disponibles:

| Documento | Cuándo Leer |
|-----------|------------|
| DEPLOYMENT_INSTRUCTIONS.md | Si necesitas más detalles |
| DEPLOYMENT_CHECKLIST.md | Para verificar que nada se olvida |
| CAMBIOS_PARA_VERCEL.md | Si quieres entender qué se cambió |
| VERCEL_DEPLOYMENT_GUIDE.md | Si algo falla y necesitas troubleshooting |

---

## 🎯 Ahora:

**Empieza por la Fase 1 arriba.** 

Si sigues cada paso, **en ~40 minutos tu app estará en producción** ✨

¡Vamos! 🚀
