"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { plants, Plant } from "./API_Plantas";
import ModalQS from "./ModalQS";
import { FiSearch, FiMenu, FiX, FiShoppingCart, FiUser, FiLogOut, FiChevronDown } from "react-icons/fi";
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
        { name: "Categor\u00edas", href: "/catalogo", active: pathname.startsWith("/catalogo") },
        { name: "Eventos", href: "/eventos", active: pathname.startsWith("/eventos") },
        { name: "Contacto", href: "#contacto", active: false },
    ];

    return (
        <>
            <nav
                className={`sticky top-0 left-0 right-0 z-50 bg-white transition-all duration-500 ${scrolled ? "shadow-md py-2" : "py-4"
                    }`}
                role="navigation"
                aria-label="Navegaci\u00f3n principal"
            >
                <div className="max-w-7xl mx-auto px-4">
                    {/* Main Row */}
                    <div className="flex items-center justify-between">

                        {/* Logo - Left */}
                        <Link href="/" className="relative z-10 flex items-center transition-transform hover:scale-[1.02] active:scale-95">
                            <Image
                                src="/img/img-logo/logov2.png"
                                alt="Logo Florer\u00eda Rosmery"
                                width={scrolled ? 180 : 220}
                                height={50}
                                priority
                                className="h-auto w-auto transition-all duration-500"
                            />
                        </Link>

                        {/* Nav Links - Center */}
                        <ul className="hidden lg:flex items-center gap-8">
                            {navLinks.map(link => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className={`text-[13px] font-semibold tracking-wide transition-colors relative pb-1 ${link.active
                                            ? "text-[#D4145A]"
                                            : "text-gray-500 hover:text-gray-900"
                                            }`}
                                    >
                                        {link.name}
                                        {link.active && (
                                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D4145A] rounded-full" />
                                        )}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <button
                                    onClick={() => setModalQSOpen(true)}
                                    className="text-[13px] font-semibold tracking-wide text-gray-500 hover:text-gray-900 transition-colors"
                                >
                                    Nosotros
                                </button>
                            </li>
                        </ul>

                        {/* Actions - Right */}
                        <div className="hidden lg:flex items-center gap-3">
                            {/* Search Toggle */}
                            <button
                                onClick={() => setSearchOpen(!searchOpen)}
                                className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-all"
                            >
                                <FiSearch size={18} />
                            </button>

                            {/* User */}
                            {user ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                                        className="flex items-center gap-2 px-3 py-2 rounded-full text-gray-500 hover:bg-gray-50 transition-all"
                                    >
                                        <div className="w-7 h-7 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center">
                                            <span className="text-white text-xs font-bold">
                                                {(user.user_metadata?.full_name || user.email || "U")[0].toUpperCase()}
                                            </span>
                                        </div>
                                        <FiChevronDown size={14} className={`transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {userMenuOpen && (
                                        <div className="absolute top-full right-0 mt-3 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden py-1">
                                            <div className="px-4 py-3 border-b border-gray-50">
                                                <p className="text-xs font-bold text-gray-800 truncate">
                                                    {user.user_metadata?.full_name || "Mi Cuenta"}
                                                </p>
                                                <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
                                            </div>
                                            <button
                                                onClick={() => { router.push("/perfil"); setUserMenuOpen(false); }}
                                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                                            >
                                                <FiUser size={15} />
                                                <span className="text-xs font-semibold">Mi Cuenta</span>
                                            </button>
                                            <button
                                                onClick={handleSignOut}
                                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors"
                                            >
                                                <FiLogOut size={15} />
                                                <span className="text-xs font-semibold">Cerrar Sesi\u00f3n</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <button
                                    className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-all"
                                    onClick={() => router.push("/iniciosesion")}
                                >
                                    <FiUser size={18} />
                                </button>
                            )}

                            {/* Cart */}
                            <button
                                className="relative p-2 rounded-full text-gray-400 hover:text-[#D4145A] hover:bg-pink-50 transition-all"
                                onClick={() => router.push("/Carrito")}
                            >
                                <FiShoppingCart size={18} />
                                {totalItems > 0 && (
                                    <span className="absolute -top-0.5 -right-0.5 bg-[#D4145A] text-[10px] text-white font-bold w-4.5 h-4.5 min-w-[18px] min-h-[18px] rounded-full flex items-center justify-center">
                                        {totalItems}
                                    </span>
                                )}
                            </button>
                        </div>

                        {/* Mobile Controls */}
                        <div className="lg:hidden flex items-center gap-3">
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
                                {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                            </button>
                        </div>
                    </div>

                    {/* Expandable Search Bar */}
                    <div className={`overflow-hidden transition-all duration-300 ${searchOpen ? 'max-h-20 mt-3 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="relative">
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Buscar flores, ramos, categor\u00edas..."
                                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-700 placeholder:text-gray-300 outline-none focus:border-[#D4145A]/30 focus:ring-2 focus:ring-[#D4145A]/10 transition-all"
                                autoFocus={searchOpen}
                            />
                            {/* Search Suggestions */}
                            {suggestions.length > 0 && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                                    {suggestions.map((plant) => (
                                        <Link
                                            key={plant.id}
                                            href={`/buscar?q=${plant.nombre}`}
                                            onClick={() => setSearchOpen(false)}
                                            className="flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                                        >
                                            <div className="w-10 h-10 relative flex-shrink-0">
                                                <Image src={plant.imagen} alt={plant.nombre} fill className="object-cover rounded-lg" />
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-sm font-semibold text-gray-800 truncate">{plant.nombre}</span>
                                                <span className="text-xs text-gray-400">{plant.categoria}</span>
                                            </div>
                                            <span className="ml-auto text-sm font-bold text-[#D4145A]">S/ {plant.precio}</span>
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
                    style={{ top: scrolled ? '56px' : '72px' }}
                >
                    <div className="flex flex-col p-6 space-y-1">
                        {navLinks.map(link => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`py-4 px-2 text-lg font-semibold border-b border-gray-50 transition-colors ${link.active ? "text-[#D4145A]" : "text-gray-700"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <button
                            onClick={() => { setModalQSOpen(true); setMobileMenuOpen(false); }}
                            className="py-4 px-2 text-lg font-semibold text-gray-700 border-b border-gray-50 text-left"
                        >
                            Nosotros
                        </button>

                        <div className="pt-6 space-y-3">
                            {user ? (
                                <>
                                    <div className="flex items-center gap-3 px-2 pb-4">
                                        <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center">
                                            <span className="text-white font-bold">
                                                {(user.user_metadata?.full_name || user.email || "U")[0].toUpperCase()}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-800">
                                                {user.user_metadata?.full_name || "Mi Cuenta"}
                                            </p>
                                            <p className="text-xs text-gray-400">{user.email}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => { router.push("/perfil"); setMobileMenuOpen(false); }}
                                        className="w-full bg-gray-50 py-3.5 rounded-xl font-semibold text-gray-600 flex items-center justify-center gap-2 text-sm"
                                    >
                                        <FiUser size={16} /> Mi Cuenta
                                    </button>
                                    <button
                                        onClick={handleSignOut}
                                        className="w-full bg-red-50 py-3.5 rounded-xl font-semibold text-red-500 flex items-center justify-center gap-2 text-sm"
                                    >
                                        <FiLogOut size={16} /> Cerrar Sesión
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => { router.push("/iniciosesion"); setMobileMenuOpen(false); }}
                                    className="w-full bg-gray-50 py-3.5 rounded-xl font-semibold text-gray-600 flex items-center justify-center gap-2 text-sm"
                                >
                                    <FiUser size={16} /> Iniciar Sesión / Regístrate
                                </button>
                            )}
                            <button
                                onClick={() => { router.push("/Carrito"); setMobileMenuOpen(false); }}
                                className="w-full bg-[#D4145A] py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 text-sm shadow-lg shadow-pink-200"
                            >
                                <FiShoppingCart size={16} /> Ver Carrito ({totalItems})
                            </button>
                        </div>
                    </div>
                </div>

                <ModalQS isOpen={modalQSOpen} onClose={() => setModalQSOpen(false)} />
            </nav >
        </>
    );
}
