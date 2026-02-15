# 📋 RESUMEN DE CAMBIOS PARA VERCEL

## Cambios Realizados en el Proyecto

Este documento describe todas las modificaciones realizadas para hacer el proyecto compatible con Vercel.

---

## 🔧 Archivos Modificados

### 1. `app/iniciosesion/page.tsx`
**Problema**: `window.location.origin` se ejecutaba en el servidor durante SSR, causando error.

**Cambio**:
```typescript
// ANTES (causa error en SSR):
redirectTo: `${window.location.origin}`,

// AHORA (seguro para SSR):
const redirectUrl = typeof window !== 'undefined' ? window.location.origin : '';
redirectTo: redirectUrl,
```

**Por qué**: En Next.js 16, el código se pre-renderiza en el servidor. Acceder a `window` directamente causa un error. La verificación `typeof window !== 'undefined'` garantiza que solo se ejecute en el navegador.

---

### 2. `app/Carrito/page.tsx`
**Problema**: Se usaba `window.location.href` en lugar de usar el router de Next.js.

**Cambios**:
1. Importar `useRouter`:
```typescript
// Agregado:
import { useRouter } from "next/navigation";

// En el componente:
const router = useRouter();
```

2. Reemplazar redirección:
```typescript
// ANTES (javascript clásico):
window.location.href = "/admin/pedidos";

// AHORA (Next.js router):
router.push("/perfil");
```

**Por qué**: Next.js recomienda usar `useRouter` para navegaciones dentro de la aplicación, mejorando rendimiento y previniendo full page reloads.

---

### 3. `app/api/checkout/route.ts`
**Problema**: Las URLs base para construir URLs de imágenes estaban incompletas en Vercel.

**Cambios**:
```typescript
// ANTES (falla en Vercel):
images: [item.imagen.startsWith('http') ? item.imagen : `${process.env.NEXT_PUBLIC_BASE_URL || ''}${item.imagen}`],
success_url: `${success_url}?session_id={CHECKOUT_SESSION_ID}`,
cancel_url: cancel_url,

// AHORA (detecta automáticamente URL en Vercel):
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'http://localhost:3000';

images: [
    item.imagen.startsWith('http') 
        ? item.imagen 
        : `${baseUrl}${item.imagen}`
],
success_url: `${baseUrl}${success_url}?session_id={CHECKOUT_SESSION_ID}`,
cancel_url: `${baseUrl}${cancel_url}`,
```

**Por qué**: 
- Vercel inyecta automáticamente `VERCEL_URL` en todos los deploys
- Fallback a `NEXT_PUBLIC_BASE_URL` para ambiente local
- Garantiza que URLs de Stripe siempre sean correctas

---

## ✨ Archivos Creados

### 1. `.env.local` (LOCAL - No se sube a Git)
Archivo de configuración local con placeholders para:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLIC_KEY`
- `NEXT_PUBLIC_BASE_URL`

### 2. `.env.example` (Referencia pública)
Archivo de referencia sin valores sensibles, mostrando qué variables se necesitan.

### 3. `vercel.json`
Configuración específica de Vercel:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "env": ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY", ...],
  "functions": {
    "app/api/**": {
      "maxDuration": 60
    }
  }
}
```

**Qué hace**:
- Define comando de build
- Especifica el directorio de salida
- Lista variables de entorno requeridas
- Configura timeout para funciones serverless

### 4. `DEPLOYMENT_INSTRUCTIONS.md` (en raíz)
Guía paso a paso completa con 6 pasos principales:
1. Obtener credenciales de Supabase y Stripe
2. Preparar repositorio Git
3. Conectar a Vercel
4. Agregar variables de entorno
5. Redeploy tras agregar variables
6. Validar despliegue

### 5. `DEPLOYMENT_CHECKLIST.md` (en raíz)
Checklist de verificación incluyendo:
- Pre-requisitos
- Configuración local
- GitHub
- Credenciales
- Configuración Vercel
- Validación post-deploy

### 6. `VERCEL_DEPLOYMENT_GUIDE.md` (en Frontend_Next)
Guía adicional con troubleshooting y monitoreo.

### 7. `setup-vercel.bat` (Windows)
Script batch para automatizar setup en Windows:
- Verifica Node.js
- Instala dependencias
- Compila proyecto
- Verifica archivos de configuración

### 8. `setup-vercel.ps1` (PowerShell)
Script PowerShell moderno con salida coloreada:
- Mejor que .bat
- Mensajes más claros
- Validaciones más robustas

---

## 🔐 Variables de Entorno Explicadas

| Variable | Dónde Va | Valor Ejemplo | Notas |
|----------|----------|---------------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Frontend/Backend | `https://xxx.supabase.co` | Pública, visible en cliente |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Frontend/Backend | `eyJhbGc...` | Pública, limitada por RLS |
| `STRIPE_SECRET_KEY` | Backend ONLY | `sk_live_...` | ⚠️ SECRETO - Nunca en cliente |
| `NEXT_PUBLIC_STRIPE_PUBLIC_KEY` | Frontend/Backend | `pk_live_...` | Pública, para widget de Stripe |
| `NEXT_PUBLIC_BASE_URL` | Frontend | `http://localhost:3000` | URL base de la aplicación |

---

## 🚀 Ventajas de los Cambios

1. **SSR-Safe**: El código no falla durante pre-renderización en servidor
2. **Auto-Detection en Vercel**: Usa automáticamente `VERCEL_URL` en producción
3. **Mejor Performance**: Usa router nativo de Next.js
4. **Seguridad**: Variables secretas nunca van al cliente
5. **Escalabilidad**: Serverless functions configuradas apropiadamente
6. **Documentación**: Instrucciones paso a paso evitan errores manuales

---

## 🧪 Testing Pre-Deploy

Antes de desplegar a Vercel, ejecutar localmente:

```bash
cd Frontend_Next

# 1. Limpiar y reinstalar
rm -r node_modules .next
npm install

# 2. Compilar (igual que en Vercel)
npm run build

# 3. Probar en producción local
npm run start

# 4. Revisar Console del navegador (F12)
# No debe haber errores rojos relacionados con:
# - Supabase
# - Stripe
# - Variables de entorno
```

---

## ✉️ Ambiente Staging vs Production

### Desarrollo (Local)
```
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc... (local)
STRIPE_SECRET_KEY=sk_test_... (prueba)
```

### Producción (Vercel)
```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co (production)
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc... (production)
STRIPE_SECRET_KEY=sk_live_... (producción real)
```

---

## 🔄 Flujo de Despliegue

```
┌─────────────────────────────────────┐
│ Hacer cambios locales               │
│ (editar archivos)                   │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ Probar localmente                   │
│ npm run dev                          │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ Compilar para producción            │
│ npm run build                        │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ Commit a Git                        │
│ git push origin main                │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ Vercel detecta y redeploya          │
│ Automático ✨                        │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ En Vivo en https://xxx.vercel.app  │
└─────────────────────────────────────┘
```

---

## 📞 Próximos Pasos

1. **Obtener credenciales** de Supabase y Stripe
2. **Completar `.env.local`** con valores reales
3. **Hacer commit y push** a GitHub
4. **Conectar proyecto** en Vercel
5. **Agregar variables** de entorno en Vercel
6. **Redeploy** y validar

Ver `DEPLOYMENT_INSTRUCTIONS.md` para instrucciones detalladas.
