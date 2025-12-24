"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function LayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Lista de rutas donde NO queremos Header y Footer
    const hideLayout = pathname === "/iniciosesion";

    return (
        <>
            {!hideLayout && <Header />}
            <main>{children}</main>
            {!hideLayout && <Footer />}
        </>
    );
}
