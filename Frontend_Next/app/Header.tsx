"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { plants, Plant } from "./API_Plantas";
import ModalQS from "./ModalQS";
import { FiSearch, FiMenu, FiX, FiShoppingCart, FiUser } from "react-icons/fi";
import { useCart } from "../context/CartContext";

export default function Header() {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<Plant[]>([]);
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const { totalItems } = useCart();

    // Lógica para el scroll
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Limpiar buscador al cambiar de página
    useEffect(() => {
        setQuery("");
        setSuggestions([]);
        setMobileMenuOpen(false);
    }, [pathname]);

    // Bloquear scroll cuando el menú móvil está abierto
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [mobileMenuOpen]);

    // Filtrar en tiempo real
    useEffect(() => {
        if (query.trim().length > 1) {
            const filtered = plants.filter((plant) =>
                plant.nombre.toLowerCase().includes(query.toLowerCase()) ||
                plant.categoria?.toLowerCase().includes(query.toLowerCase())
            ).slice(0, 5);
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    }, [query]);

    // Modal QS
    const [modalQSOpen, setModalQSOpen] = useState(false);

    return (
        <>
            {/* Top Bar - Scrolling */}
            <div className="bg-[#1a1a1a] text-white py-2 text-xs font-bold tracking-widest uppercase hidden md:block">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <span>📞 Pedidos: +51 987 654 321</span>
                        <span className="text-gray-500">|</span>
                        <span>✉️ contacto@floreriarosmery.com</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-[#FF6F91]">Envíos 100% Seguros</span>
                        <span className="text-gray-500">|</span>
                        <Link href="/rastreo" className="hover:text-[#FF6F91] transition-colors">Rastrea tu pedido</Link>
                    </div>
                </div>
            </div>

            <nav
                className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? "bg-white/80 backdrop-blur-md py-2 shadow-lg"
                    : "bg-[#FF6F91] py-4"
                    }`}
                role="navigation"
                aria-label="Navegación principal"
            >
                <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="relative z-10 flex items-center transition-transform hover:scale-105 active:scale-95">
                        <Image
                            src="/img/img-logo/logov2.png"
                            alt="Logo Florería Rosmery"
                            width={scrolled ? 220 : 260}
                            height={60}
                            priority
                            className={`h-auto w-auto transition-all duration-300 ${scrolled ? "brightness-110 grayscale-0" : "brightness-0 invert"
                                }`}
                        />
                    </Link>

                    {/* Menú Desktop */}
                    <div className="hidden lg:flex items-center space-x-10">
                        <ul className={`flex space-x-8 text-sm font-bold uppercase tracking-wider ${scrolled ? "text-gray-700" : "text-white"
                            }`}>
                            <li>
                                <Link href="/" className="hover:text-[#D4145A] transition-colors relative group" style={{ textTransform: "capitalize" }}>
                                    Inicio
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4145A] transition-all group-hover:w-full"></span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/catalogo" className="hover:text-[#D4145A] transition-colors relative group" style={{ textTransform: "capitalize" }}>
                                    Categorias
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4145A] transition-all group-hover:w-full"></span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/eventos" className="hover:text-[#D4145A] transition-colors relative group" style={{ textTransform: "capitalize" }}>
                                    Eventos
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4145A] transition-all group-hover:w-full"></span>
                                </Link>
                            </li>
                            <li>
                                {/*Colocar la letra en minusculas, iniciales en mayusculas*/}
                                <Link href="#contacto" className="hover:text-[#D4145A] transition-colors relative group" style={{ textTransform: "capitalize" }}>
                                    Contacto
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4145A] transition-all group-hover:w-full"></span>
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={() => setModalQSOpen(true)}
                                    className="hover:text-[#D4145A] transition-colors relative group"
                                >
                                    Nosotros
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4145A] transition-all group-hover:w-full"></span>
                                </button>
                            </li>
                        </ul>

                        {/* Acciones (Iconos) */}
                        <div className="flex items-center space-x-5">
                            {/* Buscador Integrado */}
                            <div className="relative">
                                <div className={`flex items-center px-4 py-1.5 rounded-full border transition-all ${scrolled ? "border-gray-200 bg-gray-50 flex-1" : "border-white/30 bg-white/10"
                                    }`}>
                                    <FiSearch className={scrolled ? "text-gray-400" : "text-white/70"} />
                                    <input
                                        type="text"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Buscar..."
                                        className={`bg-transparent border-none focus:ring-0 outline-none ml-2 w-32 focus:w-48 transition-all text-sm ${scrolled ? "text-gray-700" : "text-white"
                                            }`}
                                    />
                                </div>

                                {/* Suggestions Dropdown */}
                                {suggestions.length > 0 && (
                                    <div className="absolute top-full right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2">
                                        {suggestions.map((plant) => (
                                            <Link key={plant.id} href={`/buscar?q=${plant.nombre}`} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b last:border-0">
                                                <div className="w-12 h-12 relative flex-shrink-0">
                                                    <Image src={plant.imagen} alt={plant.nombre} fill className="object-cover rounded-xl" />
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-sm font-bold text-gray-800 truncate">{plant.nombre}</span>
                                                    <span className="text-xs text-gray-400 capitalize">{plant.categoria}</span>
                                                </div>
                                                <span className="ml-auto text-sm font-bold text-[#D4145A]">S/ {plant.precio}</span>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {/*Boton de inicio de sesion - Tiene que ir a la pagina de inicio de sesion*/}
                            <button className={`p-2 rounded-full transition-colors ${scrolled ? "bg-gray-100 text-gray-600 hover:bg-gray-200" : "bg-white/10 text-white hover:bg-white/20"
                                }`} onClick={() => router.push("/iniciosesion")}>
                                <FiUser size={20} />
                            </button>
                            {/*Boton de carrito*/}
                            <button className={`p-2 rounded-full relative transition-colors ${scrolled ? "bg-[#D4145A] text-white hover:bg-[#B0124A]" : "bg-white text-[#FF6F91] hover:bg-gray-100"
                                }`} onClick={() => router.push("/Carrito")}>
                                <FiShoppingCart size={20} />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-yellow-400 text-xs text-pink-900 font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce-short">
                                        {totalItems}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Controls */}
                    <div className="lg:hidden flex items-center space-x-4">
                        <button className={scrolled ? "text-gray-800" : "text-white"}>
                            <FiSearch size={24} />
                        </button>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className={`p-2 rounded-lg transition-colors ${scrolled ? "bg-gray-100 text-gray-800" : "bg-white/20 text-white"
                                }`}
                        >
                            {mobileMenuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <div className={`fixed inset-0 bg-white z-40 transition-transform duration-500 lg:hidden overflow-y-auto ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`} style={{ top: scrolled ? '64px' : '88px', height: `calc(100vh - ${scrolled ? '64px' : '88px'})` }}>
                    <div className="flex flex-col p-8 space-y-6 pb-32">
                        <Link href="/" className="text-2xl font-bold text-gray-800 border-b pb-4">Inicio</Link>
                        <Link href="/catalogo" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-gray-800 border-b pb-4">Catálogo</Link>
                        <Link href="/eventos" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-gray-800 border-b pb-4">Eventos</Link>
                        <Link href="#contacto" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-gray-800 border-b pb-4">Contacto</Link>
                        <button onClick={() => { setModalQSOpen(true); setMobileMenuOpen(false); }} className="text-2xl font-bold text-gray-800 border-b pb-4 text-left">Nosotros</button>
                        <div className="pt-8 flex space-x-4">
                            <button onClick={() => { router.push("/iniciosesion"); setMobileMenuOpen(false); }} className="flex-1 bg-gray-100 py-4 rounded-2xl font-bold text-gray-600 flex items-center justify-center gap-2">
                                <FiUser /> Mi Cuenta
                            </button>
                            <button onClick={() => { router.push("/Carrito"); setMobileMenuOpen(false); }} className="flex-1 bg-[#D4145A] py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2">
                                <FiShoppingCart /> Carrito
                            </button>
                        </div>
                    </div>
                </div>

                <ModalQS isOpen={modalQSOpen} onClose={() => setModalQSOpen(false)} />
            </nav>
        </>
    );
}
