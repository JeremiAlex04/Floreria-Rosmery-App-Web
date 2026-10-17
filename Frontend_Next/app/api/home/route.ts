import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
const toNumber = (value: unknown) => Number(value ?? 0);

const fallbackHomeData = {
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

export async function GET() {
    try {
        if (!process.env.DATABASE_URL) {
            return NextResponse.json(fallbackHomeData);
        }

        const [heroSlides, promotionRow, testimonials, popularProducts, totalOrders, customerRows, totalProducts] = await Promise.all([
            prisma.hero_slide.findMany({
                where: { active: true },
                orderBy: { order: "asc" },
                select: {
                    id: true,
                    subtitle: true,
                    title: true,
                    description: true,
                    cta_text: true,
                    cta_link: true,
                    image_url: true,
                },
            }),
            prisma.promotion.findFirst({
                where: { active: true },
                orderBy: { created_at: "desc" },
                select: {
                    id: true,
                    title: true,
                    description: true,
                    image_url: true,
                    original_price: true,
                    sale_price: true,
                    cta_link: true,
                    expires_at: true,
                },
            }),
            prisma.testimonial.findMany({
                where: { active: true },
                orderBy: { created_at: "desc" },
                select: {
                    id: true,
                    name: true,
                    role: true,
                    avatar_url: true,
                    text: true,
                    rating: true,
                },
            }),
            prisma.product.findMany({
                where: { popular: true },
                orderBy: { created_at: "desc" },
                take: 4,
                select: {
                    id: true,
                    nombre: true,
                    precio: true,
                    categoria: true,
                    imagen: true,
                    stock: true,
                    popular: true,
                },
            }),
            prisma.order.count({
                where: {
                    status: { in: ["Recibido", "Preparando", "En Camino", "Entregado"] },
                },
            }),
            prisma.order.findMany({
                where: {
                    status: { in: ["Recibido", "Preparando", "En Camino", "Entregado"] },
                    user_id: { not: null },
                },
                select: { user_id: true },
                distinct: ["user_id"],
            }),
            prisma.product.count({
                where: { stock: { gt: 0 } },
            }),
        ]);

        const promotion = promotionRow
            ? {
                  ...promotionRow,
                  id: toNumber(promotionRow.id),
                  original_price: toNumber(promotionRow.original_price),
                  sale_price: toNumber(promotionRow.sale_price),
                  discount_percent: Math.round(
                      ((toNumber(promotionRow.original_price) - toNumber(promotionRow.sale_price)) /
                          toNumber(promotionRow.original_price)) *
                          100
                  ),
                  cta_link: promotionRow.cta_link ?? "/catalogo",
                  expires_at: promotionRow.expires_at ? promotionRow.expires_at.toISOString() : null,
              }
            : null;

        const stats = {
            total_orders: totalOrders,
            total_customers: customerRows.length,
            total_products: totalProducts,
        };

        return NextResponse.json(
            {
                heroSlides: heroSlides.map((slide) => ({
                    ...slide,
                    id: toNumber(slide.id),
                    cta_text: slide.cta_text ?? "Ver Catalogo",
                    cta_link: slide.cta_link ?? "/catalogo",
                })),
                promotion,
                testimonials: testimonials.map((t) => ({
                    ...t,
                    id: toNumber(t.id),
                    role: t.role ?? "Cliente",
                    rating: t.rating ?? 5,
                })),
                popularProducts: popularProducts.map((p) => ({
                    ...p,
                    id: toNumber(p.id),
                    precio: toNumber(p.precio),
                    stock: toNumber(p.stock),
                })),
                stats,
            },
            {
                headers: {
                    "Cache-Control": "s-maxage=60, stale-while-revalidate=600",
                },
            }
        );
    } catch (error: any) {
        console.warn("Home API (Prisma) not available, serving fallback content:", error?.message);
        return NextResponse.json(fallbackHomeData);
    }
}
