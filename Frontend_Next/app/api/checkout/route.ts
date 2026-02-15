import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2025-01-27.acacia" as any,
});

export async function POST(req: Request) {
    try {
        // Validate required environment variables
        if (!process.env.STRIPE_SECRET_KEY) {
            console.error("STRIPE_SECRET_KEY not configured");
            return NextResponse.json(
                { error: "Stripe is not configured. Please contact administrator." },
                { status: 500 }
            );
        }

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL 
            ? `https://${process.env.VERCEL_URL}` 
            : 'http://localhost:3000';

        const { items, success_url, cancel_url } = await req.json();

        // Transform items for Stripe
        const line_items = items.map((item: any) => ({
            price_data: {
                currency: "pen", // Soles peruanos
                product_data: {
                    name: item.nombre,
                    images: [
                        item.imagen.startsWith('http') 
                            ? item.imagen 
                            : `${baseUrl}${item.imagen}`
                    ],
                },
                unit_amount: Math.round(item.precio * 100), // Stripe usa centavos
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items,
            mode: "payment",
            success_url: `${baseUrl}${success_url}?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${baseUrl}${cancel_url}`,
        });

        return NextResponse.json({ id: session.id, url: session.url });
    } catch (error: any) {
        console.error("Stripe Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
