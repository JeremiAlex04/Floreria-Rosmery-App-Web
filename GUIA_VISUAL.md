# 🗺️ GUÍA VISUAL DE DESPLIEGUE

---

## Arquitectura de la Aplicación

```
┌─────────────────────────────────────────────────────────────────┐
│                    FLORERÍA ROSMERY                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                      VERCEL (Frontend)                   │   │
│  │  https://floreria-rosmery.vercel.app                    │   │
│  │                                                          │   │
│  │  • Next.js 16                                            │   │
│  │  • React 19                                              │   │
│  │  • Tailwind CSS                                          │   │
│  │  • Server Components                                     │   │
│  └──────────────────────────────────────────────────────────┘   │
│                          ▲                                       │
│                          │                                       │
│          ┌───────────────┼───────────────┐                       │
│          │               │               │                       │
│          ▼               ▼               ▼                       │
│  ┌────────────────┐ ┌────────────────┐ ┌────────────────┐        │
│  │   SUPABASE     │ │    STRIPE      │ │  STRIPE KEYS   │        │
│  │   (Backend)    │ │  (Payments)    │ │   (Checkout)   │        │
│  │                │ │                │ │                │        │
│  │ • Auth         │ │ • Checkout     │ │ • API Routes   │        │
│  │ • Database     │ │ • Sessions     │ │ • Cards        │        │
│  │ • Storage      │ │ • Transactions │ │ • Webhooks     │        │
│  └────────────────┘ └────────────────┘ └────────────────┘        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Flujo de Autenticación

```
Usuario Nuevo
    │
    ▼
┌─────────────────────────┐
│   Página /registro      │
│  Input: Email, Password │
└──────────────┬──────────┘
               │
               ▼
        supabase.auth
         .signUp()
               │
               ▼
    Supabase verifica email
               │
        ┌──────┴──────┐
        │             │
    Email OK?     Email existe?
        │             │
        ▼             ▼
      Crear      Mostrar error
      Usuario
        │
        ▼
   Enviar email
  de confirmación
        │
        ▼
  Usuario confirma
  (clic en link)
        │
        ▼
   Listo para login
```

---

## Flujo de Compra

```
┌──────────────────────────────────────────────────┐
│         Página de Catálogo                       │
│  • Ver productos                                 │
│  • Filtrar por categoría/ocasión                 │
│  • Buscar por nombre                             │
└──────────────┬───────────────────────────────────┘
               │
               ▼
        "Agregar al carrito"
               │
         (CartContext)
               │
         localStorage
               │
               ▼
     ┌─────────────────────┐
     │  Página /Carrito    │
     │  • Ver items        │
     │  • Cambiar cantidad │
     │  • Ver total        │
     └─────────┬───────────┘
               │
               ▼
        "Proceder a pago"
               │
        ┌──────────────────────┐
        │  ¿Usuario logueado?  │
        └──────┬────────────┬──┘
           Si  │            │ No
               ▼            ▼
            Pago      Ir a login
               │
     ┌─────────▼──────────┐
     │ Seleccionar método │
     │ • Yape             │
     │ • Transferencia    │
     │ • Tarjeta (Stripe) │
     └─────────┬──────────┘
               │
               ▼
    Subir comprobante
    (para Yape/Transfer)
               │
               ▼
       Crear orden en DB
       (status: Pendiente)
       │
       ├─ STRIPE: Ir a checkout
       │  ├─ Card validation
       │  ├─ 3D Secure (si aplica)
       │  ├─ Cobrar
       │  └─ Guardar comprobante
       │
       └─ MANUAL: Enviar foto
          └─ Admin valida
               │
               ▼
    Email de confirmación
               │
               ▼
    Página /rastreo
    (Ver estado de pedido)
```

---

## Estructura de Carpetas

```
Floreria-Rosmery-App-Web/
│
├── Frontend_Next/               ← Proyecto Next.js
│   ├── .env.local              ← Credenciales (NO en Git)
│   ├── .env.example            ← Referencia
│   ├── vercel.json             ← Config de Vercel
│   ├── package.json            ← Dependencias
│   ├── tsconfig.json           ← TypeScript
│   ├── next.config.ts          ← Config de Next
│   │
│   ├── app/                    ← Páginas principales
│   │   ├── layout.tsx          ← Layout raíz
│   │   ├── page.tsx            ← Home
│   │   │
│   │   ├── api/
│   │   │   └── checkout/       ← API de Stripe
│   │   │
│   │   ├── admin/              ← Panel administrador
│   │   │   ├── page.tsx
│   │   │   ├── productos/
│   │   │   ├── pedidos/
│   │   │   └── contenido/
│   │   │
│   │   ├── catalogo/           ← Catálogo de productos
│   │   ├── carrito/            ← Carrito de compras
│   │   ├── iniciosesion/       ← Login
│   │   ├── registro/           ← Sign up
│   │   ├── perfil/             ← Perfil de usuario
│   │   └── rastreo/            ← Rastreo de pedidos
│   │
│   ├── context/                ← Estado global
│   │   ├── AuthContext.tsx     ← Autenticación
│   │   └── CartContext.tsx     ← Carrito
│   │
│   ├── lib/
│   │   └── supabase.ts         ← Cliente de Supabase
│   │
│   └── public/                 ← Imágenes estáticas
│       └── img/
│
└── DOCUMENTACIÓN/
    ├── DEPLOYMENT_INSTRUCTIONS.md
    ├── DEPLOYMENT_CHECKLIST.md
    ├── PLAN_DE_ACCION_HOY.md
    └── ...
```

---

## Variables de Entorno - Flujo

```
┌────────────────────────────────────┐
│  USER STORY: Usuario hace compra   │
└────────────────────────────────────┘
           │
           ▼ (Necesita conectar)
┌────────────────────────────────────┐
│      Frontend carga                │
│  (React component renderiza)       │
└────────────────────┬───────────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
         ▼                       ▼
  NEXT_PUBLIC_*          PRIVATE (Backend)
  (Visible en cliente)   (Oculto en servidor)
         │                       │
    ┌────┴────────┐        ┌─────┴──────┐
    │             │        │            │
    ▼             ▼        ▼            ▼
SUPABASE_    STRIPE_   STRIPE_      (solo
URL          PUBLIC    SECRET        Node)
    │             │        │
    ▼             ▼        ▼
 Conexión   Widget de   API Route
 a BD       Stripe      /checkout
```

---

## Git y Vercel - Flujo de Deploy

```
┌─ LOCAL ──────────────────────────────────────────┐
│                                                  │
│  1. Editar código                                │
│     (app/iniciosesion/page.tsx, etc)             │
│                                                  │
│  2. git add -A                                   │
│     (agregar cambios)                            │
│                                                  │
│  3. git commit -m "mensaje"                      │
│     (crear versión)                              │
│                                                  │
│  4. git push origin main                         │
│     (subir a GitHub)                             │
│                                                  │
└──────────────┬──────────────────────────────────┘
               │
               ▼ (GitHub detecta push)
┌─ GITHUB ─────────────────────────────────────────┐
│                                                  │
│  Repositorio actualizado                         │
│  commit: xyz123                                  │
│  branch: main                                    │
│                                                  │
└──────────────┬──────────────────────────────────┘
               │
               ▼ (Webhook notifica)
┌─ VERCEL ─────────────────────────────────────────┐
│                                                  │
│  1. Vercel detecta cambio ✓                      │
│                                                  │
│  2. Clona repositorio                            │
│                                                  │
│  3. npm install                                  │
│     (instala dependencias)                       │
│                                                  │
│  4. npm run build                                │
│     (compila con Next.js)                        │
│                                                  │
│  5. Deploy en CDN                                │
│     (distribuye en todo el mundo)                │
│                                                  │
│  6. Asigna URL: https://xxx.vercel.app          │
│                                                  │
│  ✓ EN VIVO                                       │
│                                                  │
└──────────────────────────────────────────────────┘
               │
               ▼
        En producción
        El mundo puede usar
              tu app
```

---

## Seguridad - Niveles de Acceso

```
CLIENTE (Navegador)
├─ ✓ Ve: NEXT_PUBLIC_* (públicas)
│  ├─ NEXT_PUBLIC_SUPABASE_URL
│  ├─ NEXT_PUBLIC_SUPABASE_ANON_KEY (limitada por RLS)
│  └─ NEXT_PUBLIC_STRIPE_PUBLIC_KEY
│
└─ ✗ NO ve: Variables sin NEXT_PUBLIC_
   ├─ STRIPE_SECRET_KEY
   ├─ STRIPE_WEBHOOK_SECRET
   └─ (otros secretos)

SERVIDOR (Node.js)
├─ ✓ Ve: TODO (env variables)
│  ├─ Variables públicas
│  └─ Variables secretas
│
├─ ✓ Protege: Datos sensibles
│  ├─ Nunca los envía al cliente
│  ├─ Solo usa en API routes
│  └─ Mantiene encriptados
│
└─ ✗ Exposición: Sería un X crítico


           ┌──────────┐
      ┌───►│ CLIENTE  │
      │    └──────────┘
      │
   HTTP/
  HTTPS
      │
   ┌──▼──────────────┐
   │  Firewall       │
   │  (Solo público) │
   └────────────────┘
      │
   HTTP
  (Seguro en HTTPS)
      │
      ▼
   ┌────────────────┐
   │    SERVIDOR    │
   │   (Secured)    │
   │ • Secretos OK  │
   │ • Valida todo  │
   └────────────────┘
```

---

## Estados de Deploy

```
┌─ DASHBOARD VERCEL ──────────────────────────────┐
│                                                 │
│  Project: Floreria Rosmery                      │
│  Deployments:                                   │
│                                                 │
│  🔴 FAILED       2025-02-15 10:30               │
│     (Sin env vars)                              │
│                                                 │
│  🟡 BUILDING      2025-02-15 11:00              │
│     npm run build en progreso...                │
│                                                 │
│  🟢 READY         2025-02-15 11:15 (Current)   │
│     https://xxx.vercel.app                     │
│     Status: Production                         │
│     ✓ Todos los checks pasaron                 │
│                                                 │
│  🟢 READY         2025-02-15 10:45              │
│     https://xxx-staging.vercel.app             │
│     Status: Preview (rama: staging)            │
│                                                 │
│  🟡 BUILDING      2025-02-15 09:30              │
│     ...                                         │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## Timeline de Tu Despliegue

```
Hoy (15 de febrero)

08:00  Inicio del despliegue
  │
  ↓
08:05  Credenciales obtenidas ✓
  │
  ↓
08:15  .env.local completado ✓
  │
  ↓
08:20  npm run build ejecutado ✓
  │ (todo compila sin errores)
  ↓
08:25  Git commit y push ✓
  │ (cambios en GitHub)
  ↓
08:30  Proyecto en Vercel conectado ✓
  │
  ↓
08:35  Variables de entorno agregadas ✓
  │
  ↓
08:37  Redeploy iniciado
  │
  ├─ npm install (30s)
  ├─ npm run build (30s)
  ├─ Deploy (10s)
  │
  ↓
08:45  ✅ EN VIVO
  │
  └─ https://floreria-rosmery.vercel.app
```

---

## Checklist Visual Final

```
PRE-DESPLIEGUE
  [✓] Código compilando
  [✓] Git en main
  [✓] .env.local NO en Git
  [✓] Credenciales obtenidas

DESPLIEGUE
  [  ] .env.local completado
  [  ] Commit y push a GitHub
  [  ] Proyecto en Vercel
  [  ] Variables agregadas
  [  ] Redeploy completado

POST-DESPLIEGUE
  [  ] URL de Vercel abre
  [  ] Home page visible
  [  ] Login funciona
  [  ] Checkout funciona
  [  ] Sin errores en F12
  [  ] ✨ EN PRODUCCIÓN ✨
```

---

¡Ahora estás listo! Sigue el PLAN_DE_ACCION_HOY.md y en 40 minutos estará listo. 🚀
