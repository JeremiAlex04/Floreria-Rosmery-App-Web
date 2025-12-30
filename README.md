# 🌸 Florería Rosmery - App Web

Aplicación web de comercio electrónico moderna para la **Florería Rosmery**, construida con **Next.js 16**, **TypeScript** y **Tailwind CSS**. Permite a los usuarios explorar un catálogo de arreglos florales, filtrar por categorías y ocasiones, gestionar un carrito de compras y realizar pedidos.

![Florería Rosmery Banner](/public/img/img-catalogo/BnCatalogo.png)

## 🚀 Características Principales

- **Catálogo Interactivo**: Exploración de productos con filtrado por categoría (Aniversario, Bodas, Cumpleaños, etc.) y ocasión.
- **Búsqueda y Filtros Avanzados**: Buscador en tiempo real, ordenamiento por precio/nombre y rango de precios.
- **Carrito de Compras**: Gestión de estado global con `CartContext`, persistencia en `localStorage` y cálculo de totales.
- **Autenticación de Usuarios**: Integración con **Supabase Auth** para registro e inicio de sesión de clientes.
- **Diseño Responsive**: Interfaz moderna y adaptable a dispositivos móviles utilizando Tailwind CSS.
- **Performance**: Uso de Server Components y Suspense de Next.js para una carga rápida.

## 🛠️ Tecnologías Utilizadas

- **Frontend Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Backend / Base de Datos**: [Supabase](https://supabase.com/) (Auth & Database)
- **Iconos**: [React Icons](https://react-icons.github.io/react-icons/)
- **Linting**: ESLint

## 📂 Estructura del Proyecto
```
Frontend_Next/
├── app/                  # Rutas y páginas de la aplicación (App Router)
│   ├── catalogo/         # Página de catálogo con filtros y búsqueda
│   ├── carrito/          # Página de resumen de compra
│   ├── API_Plantas.ts    # Datos estáticos de los productos (Mock Data)
│   └── ...               # Componentes de página (Home, Login, etc.)
├── context/              # Contextos de React (Estado Global)
│   ├── AuthContext.tsx   # Manejo de sesión con Supabase
│   └── CartContext.tsx   # Lógica del carrito de compras
├── lib/                  # Utilidades y configuraciones
│   └── supabase.ts       # Cliente de conexión a Supabase
├── public/               # Activos estáticos (Imágenes de productos, logos)
└── ...
```

## 🔧 Instalación y Configuración

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/floreria-rosmery-app-web.git
cd floreria-rosmery-app-web/Frontend_Next
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto (`Frontend_Next/`) y agrega tus credenciales de Supabase:
```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_de_supabase
```

### 4. Ejecutar el servidor de desarrollo
```bash
npm run dev
```

### 5. Ver en el navegador

Abre [http://localhost:3000](http://localhost:3000) para ver la aplicación.

## 📦 Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Compila la aplicación para producción
- `npm run start`: Inicia el servidor de producción
- `npm run lint`: Ejecuta el linter para encontrar errores de código

## 🎨 Personalización

### Productos

Los productos actuales se cargan desde un archivo estático en `app/API_Plantas.ts`. Puedes modificar este archivo para agregar, editar o eliminar arreglos florales sin necesidad de base de datos inmediata.

### Estilos

Los estilos globales están definidos en `app/globals.css` y la configuración de Tailwind permite una fácil personalización de la paleta de colores.

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor, abre un *issue* o envía un *pull request* para mejoras y correcciones.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

⚡ Desarrollado con pasión para **Florería Rosmery**
