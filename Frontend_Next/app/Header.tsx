"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { plants, Plant } from "./API_Plantas";
import ModalQS from "./ModalQS";
import TopBar from "./components/TopBar";
import OrderTrackingModal from "./components/OrderTrackingModal";
import { FiSearch, FiMenu, FiX, FiShoppingCart, FiUser, FiLogOut, FiChevronDown, FiHeart, FiGift, FiSun, FiAward, FiTruck } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Header() {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<Plant[]>([]);
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const { totalItems } = useCart();
    const { user, signOut } = useAuth();
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [megaMenuOpen, setMegaMenuOpen] = useState(false); // New Mega Menu state
    const [trackingModalOpen, setTrackingModalOpen] = useState(false); // New Tracking Modal state

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setQuery("");
        setSuggestions([]);
        setMobileMenuOpen(false);
        setUserMenuOpen(false);
        setSearchOpen(false);
        setMegaMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [mobileMenuOpen]);

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

    const [modalQSOpen, setModalQSOpen] = useState(false);

    const handleSignOut = async () => {
        await signOut();
        router.push("/");
    };

    const navLinks = [
        { name: "Inicio", href: "/", active: pathname === "/" },
        { name: "Eventos", href: "/eventos", active: pathname.startsWith("/eventos") },
        { name: "Contacto", href: "#contacto", active: false },
    ];

    return (
        <>
            <TopBar /> {/* New Top Bar */}
            <nav
                className={`sticky top-[40px] left-0 right-0 z-40 bg-white transition-all duration-500 ${scrolled ? "shadow-md py-2" : "py-4"
                    }`}
                role="navigation"
                aria-label="Navegación principal"
            >
                <div className="max-w-7xl mx-auto px-4">
                    {/* Main Row */}
                    <div className="flex items-center justify-between">

                        {/* Logo - Left */}
                        <Link href="/" className="relative z-10 flex items-center transition-transform hover:scale-[1.02] active:scale-95">
                            <Image
                                src="/img/img-logo/logov2.png"
                                alt="Logo Florería Rosmery"
                                width={scrolled ? 160 : 200}
                                height={45}
                                priority
                                className="h-auto w-auto transition-all duration-500"
                            />
                        </Link>

                        {/* Nav Links - Center (With Mega Menu) */}
                        <ul className="hidden lg:flex items-center gap-8 relative">
                            <li>
                                <Link
                                    href="/"
                                    className={`text-[13px] font-bold tracking-wide transition-colors relative pb-1 ${pathname === "/" ? "text-[#D4145A]" : "text-gray-600 hover:text-gray-900"}`}
                                >
                                    INICIO
                                </Link>
                            </li>

                            {/* Mega Menu Trigger */}
                            <li
                                onMouseEnter={() => setMegaMenuOpen(true)}
                                onMouseLeave={() => setMegaMenuOpen(false)}
                                className="relative py-4"
                            >
                                <button className={`flex items-center gap-1 text-[13px] font-bold tracking-wide uppercase transition-colors ${megaMenuOpen ? "text-[#D4145A]" : "text-gray-600 hover:text-gray-900"}`}>
                                    Categorías <FiChevronDown className={`transition-transform duration-300 ${megaMenuOpen ? "rotate-180" : ""}`} />
                                </button>

                                {/* Mega Menu Content */}
                                <div className={`absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white rounded-2xl shadow-xl border border-gray-100 p-6 transition-all duration-300 transform origin-top ${megaMenuOpen ? "opacity-100 scale-100 translate-y-0 visible" : "opacity-0 scale-95 -translate-y-2 invisible"}`}>
                                    <div className="grid grid-cols-2 gap-8">
                                        <div>
                                            <h4 className="text-[#D4145A] font-black uppercase text-xs tracking-wider mb-4 border-b border-pink-100 pb-2">Por Ocasión</h4>
                                            <ul className="space-y-2">
                                                <li><Link href="/catalogo?categoria=Cumpleaños" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#D4145A] hover:bg-pink-50 rounded-lg p-2 transition-colors"><FiGift /> Cumpleaños</Link></li>
                                                <li><Link href="/catalogo?categoria=Aniversario" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#D4145A] hover:bg-pink-50 rounded-lg p-2 transition-colors"><FiHeart /> Aniversario</Link></li>
                                                <li><Link href="/catalogo?categoria=Condolencias" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#D4145A] hover:bg-pink-50 rounded-lg p-2 transition-colors"><FiSun /> Condolencias</Link></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="text-[#D4145A] font-black uppercase text-xs tracking-wider mb-4 border-b border-pink-100 pb-2">Destacados</h4>
                                            <ul className="space-y-2">
                                                <li><Link href="/catalogo?popular=true" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#D4145A] hover:bg-pink-50 rounded-lg p-2 transition-colors"><FiAward /> Lo Más Vendido</Link></li>
                                                <li><Link href="/catalogo" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#D4145A] hover:bg-pink-50 rounded-lg p-2 transition-colors">Ver Todo el Catálogo</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <Link
                                    href="/eventos"
                                    className={`text-[13px] font-bold tracking-wide transition-colors relative pb-1 ${pathname.startsWith("/eventos") ? "text-[#D4145A]" : "text-gray-600 hover:text-gray-900"}`}
                                >
                                    EVENTOS
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={() => setModalQSOpen(true)}
                                    className="text-[13px] font-bold tracking-wide text-gray-600 hover:text-gray-900 transition-colors uppercase"
                                >
                                    NOSOTROS
                                </button>
                            </li>
                        </ul>

                        {/* Actions - Right */}
                        <div className="hidden lg:flex items-center gap-3">
                            {/* Search Toggle */}
                            <button
                                onClick={() => setSearchOpen(!searchOpen)}
                                className="p-2.5 rounded-full text-gray-500 hover:text-[#D4145A] hover:bg-pink-50 transition-all border border-transparent hover:border-pink-100"
                            >
                                <FiSearch size={18} />
                            </button>

                            {/* User Menu */}
                            {user ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                                        className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full text-gray-500 hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100"
                                    >
                                        <div className="w-8 h-8 bg-gradient-to-br from-[#D4145A] to-[#FF6F91] rounded-full flex items-center justify-center text-white shadow-sm">
                                            <span className="text-xs font-black">
                                                {(user.user_metadata?.full_name || user.email || "U")[0].toUpperCase()}
                                            </span>
                                        </div>
                                        <FiChevronDown size={14} className={`transition-transform duration-300 ${userMenuOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {userMenuOpen && (
                                        <div className="absolute top-full right-0 mt-3 w-60 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden py-2 animate-fadeIn z-50">
                                            <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                                                <p className="text-sm font-bold text-gray-800 truncate">
                                                    {user.user_metadata?.full_name || "Mi Cuenta"}
                                                </p>
                                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                            </div>
                                            <button
                                                onClick={() => { router.push("/perfil"); setUserMenuOpen(false); }}
                                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-pink-50 hover:text-[#D4145A] transition-colors"
                                            >
                                                <FiUser size={16} />
                                                <span className="font-semibold">Mi Perfil</span>
                                            </button>
                                            <button
                                                onClick={() => { setTrackingModalOpen(true); setUserMenuOpen(false); }}
                                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-pink-50 hover:text-[#D4145A] transition-colors"
                                            >
                                                <FiTruck size={16} />
                                                <span className="font-semibold">Rastrear Pedido</span>
                                            </button>
                                            <button
                                                onClick={handleSignOut}
                                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors border-t border-gray-50 mt-1"
                                            >
                                                <FiLogOut size={16} />
                                                <span className="font-semibold">Cerrar Sesión</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <button
                                    className="p-2.5 rounded-full text-gray-500 hover:text-[#D4145A] hover:bg-pink-50 transition-all border border-transparent hover:border-pink-100"
                                    onClick={() => router.push("/iniciosesion")}
                                >
                                    <FiUser size={18} />
                                </button>
                            )}

                            {/* Cart */}
                            <button
                                className="relative p-2.5 rounded-full text-gray-500 hover:text-[#D4145A] hover:bg-pink-50 transition-all border border-transparent hover:border-pink-100"
                                onClick={() => router.push("/Carrito")}
                            >
                                <FiShoppingCart size={18} />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-[#D4145A] text-[10px] text-white font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-bounce">
                                        {totalItems}
                                    </span>
                                )}
                            </button>
                        </div>

                        {/* Mobile Controls */}
                        <div className="lg:hidden flex items-center gap-2">
                            <button
                                onClick={() => setSearchOpen(!searchOpen)}
                                className="p-2 text-gray-500"
                            >
                                <FiSearch size={20} />
                            </button>
                            <button
                                className="relative p-2 text-gray-500"
                                onClick={() => router.push("/Carrito")}
                            >
                                <FiShoppingCart size={20} />
                                {totalItems > 0 && (
                                    <span className="absolute -top-0.5 -right-0.5 bg-[#D4145A] text-[10px] text-white font-bold min-w-[18px] min-h-[18px] rounded-full flex items-center justify-center">
                                        {totalItems}
                                    </span>
                                )}
                            </button>
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-2 text-gray-700"
                            >
                                {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                            </button>
                        </div>
                    </div>

                    {/* Expandable Search Bar */}
                    <div className={`overflow-hidden transition-all duration-300 ${searchOpen ? 'max-h-20 mt-3 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="relative">
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Busca 'Rosas rojas' o 'Aniversario'..."
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm text-gray-700 placeholder:text-gray-400 outline-none focus:bg-white focus:border-[#D4145A] focus:ring-2 focus:ring-[#D4145A]/10 transition-all shadow-inner"
                                autoFocus={searchOpen}
                            />
                            {/* Search Suggestions */}
                            {suggestions.length > 0 && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-fadeIn">
                                    {suggestions.map((plant) => (
                                        <Link
                                            key={plant.id}
                                            href={`/buscar?q=${plant.nombre}`}
                                            onClick={() => setSearchOpen(false)}
                                            className="flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                                        >
                                            <div className="w-12 h-12 relative flex-shrink-0">
                                                <Image src={plant.imagen} alt={plant.nombre} fill className="object-cover rounded-lg" />
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-sm font-bold text-gray-800 truncate">{plant.nombre}</span>
                                                <span className="text-xs text-gray-500 font-medium">{plant.categoria}</span>
                                            </div>
                                            <span className="ml-auto text-sm font-black text-[#D4145A]">S/ {plant.precio}</span>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`fixed inset-x-0 bottom-0 bg-white z-40 transition-transform duration-500 ease-out lg:hidden overflow-y-auto ${mobileMenuOpen ? "translate-y-0" : "translate-y-full"
                        }`}
                    style={{ top: scrolled ? '96px' : '100px' }} // Adjusted for TopBar height
                >
                    <div className="flex flex-col p-6 space-y-2">
                        <Link href="/" onClick={() => setMobileMenuOpen(false)} className="py-3 px-2 text-lg font-bold text-gray-800 border-b border-gray-50">INICIO</Link>
                        <Link href="/catalogo" onClick={() => setMobileMenuOpen(false)} className="py-3 px-2 text-lg font-bold text-gray-800 border-b border-gray-50">CATÁLOGO</Link>
                        <Link href="/eventos" onClick={() => setMobileMenuOpen(false)} className="py-3 px-2 text-lg font-bold text-gray-800 border-b border-gray-50">EVENTOS</Link>
                        <button onClick={() => { setModalQSOpen(true); setMobileMenuOpen(false); }} className="py-3 px-2 text-lg font-bold text-gray-800 border-b border-gray-50 text-left">NOSOTROS</button>

                        <div className="pt-6 space-y-3">
                            {user ? (
                                <button
                                    onClick={() => { router.push("/perfil"); setMobileMenuOpen(false); }}
                                    className="w-full bg-pink-50 py-4 rounded-2xl font-bold text-[#D4145A] flex items-center justify-center gap-2"
                                >
                                    <FiUser size={18} /> Mi Cuenta
                                </button>
                            ) : (
                                <button
                                    onClick={() => { router.push("/iniciosesion"); setMobileMenuOpen(false); }}
                                    className="w-full bg-gray-100 py-4 rounded-2xl font-bold text-gray-700 flex items-center justify-center gap-2"
                                >
                                    <FiUser size={18} /> Ingresar / Registro
                                </button>
                            )}
                            <button
                                onClick={() => { setTrackingModalOpen(true); setMobileMenuOpen(false); }}
                                className="w-full bg-gray-50 py-4 rounded-2xl font-bold text-gray-600 flex items-center justify-center gap-2"
                            >
                                <FiTruck size={18} /> Rastrear Pedido
                            </button>
                        </div>
                    </div>
                </div>

                <ModalQS isOpen={modalQSOpen} onClose={() => setModalQSOpen(false)} />
                <OrderTrackingModal isOpen={trackingModalOpen} onClose={() => setTrackingModalOpen(false)} />
            </nav >
        </>
    );
}
