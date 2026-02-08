import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2025-01-27.acacia" as any,
});

export async function POST(req: Request) {
    try {
        const { items, success_url, cancel_url } = await req.json();

        if (!process.env.STRIPE_SECRET_KEY) {
            return NextResponse.json(
                { error: "Stripe secret key not configured" },
                { status: 500 }
            );
        }

        // Transform items for Stripe
        const line_items = items.map((item: any) => ({
            price_data: {
                currency: "pen", // Soles peruanos
                product_data: {
                    name: item.nombre,
                    images: [item.imagen.startsWith('http') ? item.imagen : `${process.env.NEXT_PUBLIC_BASE_URL || ''}${item.imagen}`],
                },
                unit_amount: Math.round(item.precio * 100), // Stripe usa centavos
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items,
            mode: "payment",
            success_url: `${success_url}?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: cancel_url,
        });

        return NextResponse.json({ id: session.id, url: session.url });
    } catch (error: any) {
        console.error("Stripe Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
