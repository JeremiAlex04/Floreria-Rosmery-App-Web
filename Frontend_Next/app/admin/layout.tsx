"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "@/lib/supabase";
import {
    FiBox,
    FiShoppingCart,
    FiPieChart,
    FiSettings,
    FiLogOut,
    FiMenu,
    FiX,
    FiHome,
    FiImage
} from "react-icons/fi";

const adminMenuItems = [
    { name: "Dashboard", icon: <FiPieChart />, path: "/admin" },
    { name: "Productos", icon: <FiBox />, path: "/admin/productos" },
    { name: "Pedidos", icon: <FiShoppingCart />, path: "/admin/pedidos" },
    { name: "Contenido", icon: <FiImage />, path: "/admin/contenido" },
    { name: "Configuración", icon: <FiSettings />, path: "/admin/config" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAdmin = async () => {
            if (!loading && !user) {
                router.push("/iniciosesion");
                return;
            }

            if (user) {
                const { data, error } = await supabase
                    .from("profiles")
                    .select("role")
                    .eq("id", user.id)
                    .single();

                if (error || data?.role !== "admin") {
                    router.push("/");
                    setIsAdmin(false);
                } else {
                    setIsAdmin(true);
                }
            }
        };

        checkAdmin();
    }, [user, loading, router]);

    if (loading || isAdmin === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4145A]"></div>
            </div>
        );
    }

    if (!user || !isAdmin) return null;

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 bg-white shadow-2xl z-50 transition-all duration-300 transform 
        ${isSidebarOpen ? "w-64 translate-x-0" : "w-20 -translate-x-full lg:translate-x-0 lg:w-20"}`}
            >
                <div className="h-full flex flex-col">
                    {/* Logo / Title */}
                    <div className="p-6 flex items-center justify-between">
                        {isSidebarOpen ? (
                            <span className="text-xl font-black text-[#D4145A] tracking-tighter italic">ADMIN PANEL</span>
                        ) : (
                            <span className="text-xl font-black text-[#D4145A]">R</span>
                        )}
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="lg:hidden text-gray-500"
                        >
                            <FiX size={24} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-4 space-y-2">
                        {adminMenuItems.map((item) => {
                            const isActive = pathname === item.path;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.path}
                                    className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all group
                  ${isActive
                                            ? "bg-[#D4145A] text-white shadow-lg shadow-[#D4145A]/20"
                                            : "text-gray-500 hover:bg-gray-50 hover:text-[#D4145A]"}`}
                                >
                                    <span className="text-xl shrink-0">{item.icon}</span>
                                    {isSidebarOpen && <span className="font-bold">{item.name}</span>}
                                    {!isSidebarOpen && (
                                        <div className="absolute left-20 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                            {item.name}
                                        </div>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Bottom Actions */}
                    <div className="p-4 border-t border-gray-100 space-y-2">
                        <Link
                            href="/"
                            className="flex items-center gap-4 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-2xl transition-all"
                        >
                            <FiHome className="text-xl shrink-0" />
                            {isSidebarOpen && <span className="font-bold">Ver Sitio</span>}
                        </Link>
                        <button
                            className="w-full flex items-center gap-4 px-4 py-3 text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                            onClick={() => {/* Implement SignOut */ }}
                        >
                            <FiLogOut className="text-xl shrink-0" />
                            {isSidebarOpen && <span className="font-bold">Cerrar Sesión</span>}
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main
                className={`flex-1 transition-all duration-300 
        ${isSidebarOpen ? "lg:ml-64" : "lg:ml-20"} min-h-screen`}
            >
                {/* Header Mobile */}
                <header className="lg:hidden sticky top-0 bg-white/80 backdrop-blur-md z-40 px-6 py-4 flex items-center justify-between border-b border-gray-100">
                    <span className="text-lg font-bold text-[#D4145A]">Florería Rosmery</span>
                    <button onClick={() => setIsSidebarOpen(true)}>
                        <FiMenu size={24} />
                    </button>
                </header>

                <div className="p-6 lg:p-10 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
