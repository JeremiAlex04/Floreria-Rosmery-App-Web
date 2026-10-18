export interface HeroSlide {
    id: number;
    subtitle: string;
    title: string;
    description: string;
    cta_text: string;
    cta_link: string;
    image_url: string;
}

export interface Promotion {
    id: number;
    title: string;
    description: string;
    image_url: string;
    original_price: number;
    sale_price: number;
    discount_percent: number;
    cta_link: string;
    expires_at: string | null;
}

export interface Testimonial {
    id: number;
    name: string;
    role: string;
    avatar_url: string | null;
    text: string;
    rating: number;
}

export interface HomeStats {
    total_orders: number;
    total_customers: number;
    total_products: number;
}

export interface HomeDataResponse {
    heroSlides: HeroSlide[];
    promotion: Promotion | null;
    testimonials: Testimonial[];
    popularProducts: any[];
    stats: HomeStats;
}

export const defaultHomeData: HomeDataResponse = {
    heroSlides: [
        {
            id: 1,
            subtitle: "Arreglos Exclusivos",
            title: "Flores que hablan por ti",
            description: "Descubre nuestra colección de ramos y arreglos florales diseñados con amor para cada ocasión especial.",
            cta_text: "Ver Catálogo",
            cta_link: "/catalogo",
            image_url: "/img/img-carrusel/foto1.jpg",
        },
        {
            id: 2,
            subtitle: "Elegancia Natural",
            title: "Lirios y Rosas Premium",
            description: "Flores frescas seleccionadas a mano, entregadas el mismo día.",
            cta_text: "Comprar Ahora",
            cta_link: "/catalogo",
            image_url: "/img/img-carrusel/foto2.jpg",
        },
        {
            id: 3,
            subtitle: "Colección de Temporada",
            title: "Girasoles y Color",
            description: "Lleva alegría y energía con nuestros arreglos vibrantes de temporada.",
            cta_text: "Explorar",
            cta_link: "/catalogo",
            image_url: "/img/img-carrusel/foto3.jpg",
        },
    ],
    promotion: {
        id: 1,
        title: "Ramo Premium de Rosas",
        description: "12 rosas rojas importadas con follaje premium. Incluye tarjeta personalizada y envío gratuito.",
        image_url: "/img/img-promocion/Promocion1.jpg",
        original_price: 189,
        sale_price: 129,
        discount_percent: 32,
        cta_link: "/catalogo",
        expires_at: null,
    },
    testimonials: [
        {
            id: 1,
            name: "Ana María López",
            role: "Cliente Frecuente",
            avatar_url: "https://img.freepik.com/foto-gratis/mujer-joven-feliz-mirando-camara_23-2148161309.jpg",
            text: "Excelente servicio, productos de alta calidad y entregas siempre puntuales.",
            rating: 5,
        },
        {
            id: 2,
            name: "Carlos Mendoza",
            role: "Cliente Verificado",
            avatar_url: null,
            text: "Las flores llegaron súper frescas y el arreglo superó mis expectativas.",
            rating: 5,
        },
    ],
    popularProducts: [
        { id: 1, nombre: "Amor Eterno", precio: 180, categoria: "Aniversario", imagen: "/img/productos_nuevos/1.jpg", stock: 10 },
        { id: 4, nombre: "Caja Sorpresa Rosa", precio: 140, categoria: "Arreglos en Caja", imagen: "/img/productos_nuevos/4.jpg", stock: 8 },
        { id: 7, nombre: "Corona de Condolencias", precio: 220, categoria: "Condolencias", imagen: "/img/productos_nuevos/7.jpg", stock: 5 },
        { id: 10, nombre: "Alegría Cumpleañera", precio: 160, categoria: "Cumpleaños", imagen: "/img/productos_nuevos/10.jpg", stock: 12 },
    ],
    stats: {
        total_orders: 1250,
        total_customers: 980,
        total_products: 48,
    },
};

let pendingRequest: Promise<HomeDataResponse> | null = null;

export async function fetchHomeData(): Promise<HomeDataResponse> {
    if (!pendingRequest) {
        pendingRequest = fetch("/api/home")
            .then(async (res) => {
                if (!res.ok) {
                    console.warn(`Home API returned status ${res.status}, using default fallback.`);
                    return defaultHomeData;
                }
                return res.json() as Promise<HomeDataResponse>;
            })
            .catch((error) => {
                console.warn("Home API fetch error, using default fallback:", error);
                return defaultHomeData;
            });
    }

    return pendingRequest;
}

