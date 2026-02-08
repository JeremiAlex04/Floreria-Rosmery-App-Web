"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";

export default function LayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Lista de rutas donde NO queremos Header, Footer y WhatsApp
    const hideLayout = pathname === "/iniciosesion" || pathname === "/registro" || pathname.startsWith("/admin");

    return (
        <>
            {!hideLayout && <Header />}
            <main>{children}</main>
            {!hideLayout && <Footer />}
            {!hideLayout && <WhatsAppButton />}
        </>
    );
}
