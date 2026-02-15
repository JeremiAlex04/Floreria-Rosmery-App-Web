import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
const toNumber = (value: unknown) => Number(value ?? 0);

export async function GET() {
    try {
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
        console.error("Home API (Prisma) error:", error);
        return NextResponse.json(
            { error: "Unable to load home data from Prisma", detail: error?.message ?? "Unknown error" },
            { status: 500 }
        );
    }
}
