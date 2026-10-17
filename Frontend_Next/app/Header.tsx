"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { plants, Plant } from "./API_Plantas";
import ModalQS from "./ModalQS";
import TopBar from "./components/TopBar";
import OrderTrackingModal from "./components/OrderTrackingModal";
import {
    FiSearch,
    FiShoppingCart,
    FiUser,
    FiLogOut,
    FiChevronDown,
    FiHeart,
    FiGift,
    FiSun,
    FiAward,
    FiTruck,
    FiArrowUpRight,
    FiGrid,
    FiClock,
    FiX
} from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

// Apple physics: resistencia progresiva al sobrepasar el límite (rubber-banding)
const rubberband = (overshoot: number, dimension: number, constant = 0.55) =>
    (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));

// Apple physics: proyección de momentum cinético
const project = (velocity: number, decelerationRate = 0.998) =>
    ((velocity / 1000) * decelerationRate) / (1 - decelerationRate);

type DragState = { grabOffset: number; offset: number; samples: { y: number; t: number }[] };

const QUICK_SEARCH_TAGS = ["Rosas", "Aniversario", "Cajas", "Tulipanes", "Condolencias"];

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
    const [megaMenuOpen, setMegaMenuOpen] = useState(false);
    const [trackingModalOpen, setTrackingModalOpen] = useState(false);
    const [modalQSOpen, setModalQSOpen] = useState(false);

    const userMenuRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const sheetRef = useRef<HTMLDivElement>(null);
    const drag = useRef<DragState | null>(null);

    // Scroll listener para activar el estado translúcido flotante
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 12);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Limpiar estados al navegar
    useEffect(() => {
        setQuery("");
        setSuggestions([]);
        setMobileMenuOpen(false);
        setUserMenuOpen(false);
        setSearchOpen(false);
        setMegaMenuOpen(false);
    }, [pathname]);

    // Bloquear scroll de body cuando el sheet móvil está abierto
    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileMenuOpen]);

    // Shortcut de teclado (Cmd+K o Esc)
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                setSearchOpen((prev) => !prev);
            }
            if (e.key === "Escape") {
                setMobileMenuOpen(false);
                setUserMenuOpen(false);
                setMegaMenuOpen(false);
                setSearchOpen(false);
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    // Enfocar input al abrir buscador
    useEffect(() => {
        if (searchOpen) {
            setTimeout(() => searchInputRef.current?.focus(), 50);
        }
    }, [searchOpen]);

    // Click fuera del menú de usuario
    useEffect(() => {
        if (!userMenuOpen) return;
        const onDown = (e: PointerEvent) => {
            if (!userMenuRef.current?.contains(e.target as Node)) setUserMenuOpen(false);
        };
        document.addEventListener("pointerdown", onDown);
        return () => document.removeEventListener("pointerdown", onDown);
    }, [userMenuOpen]);

    // Búsqueda inteligente de productos
    useEffect(() => {
        if (query.trim().length > 1) {
            const normalized = query.toLowerCase();
            const filtered = plants.filter((plant) =>
                plant.nombre.toLowerCase().includes(normalized) ||
                plant.categoria?.toLowerCase().includes(normalized) ||
                plant.ocasion?.some((o) => o.toLowerCase().includes(normalized))
            ).slice(0, 5);
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    }, [query]);

    const handleSignOut = async () => {
        await signOut();
        router.push("/");
    };

    /* ---------- Hoja inferior móvil con física háptica ---------- */
    const onSheetPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        const sheet = sheetRef.current;
        if (!sheet || drag.current) return;
        if ((e.target as HTMLElement).closest("button, a, input")) return;
        e.currentTarget.setPointerCapture(e.pointerId);

        const current = new DOMMatrixReadOnly(getComputedStyle(sheet).transform).m42;
        sheet.style.transition = "none";
        sheet.style.transform = `translateY(${current}px)`;
        drag.current = {
            grabOffset: e.clientY - current,
            offset: current,
            samples: [{ y: e.clientY, t: e.timeStamp }],
        };
    };

    const onSheetPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        const d = drag.current;
        const sheet = sheetRef.current;
        if (!d || !sheet) return;
        const raw = e.clientY - d.grabOffset;
        d.offset = raw < 0 ? -rubberband(-raw, sheet.offsetHeight) : raw;
        sheet.style.transform = `translateY(${d.offset}px)`;
        d.samples.push({ y: e.clientY, t: e.timeStamp });
        if (d.samples.length > 5) d.samples.shift();
    };

    const onSheetPointerUp = () => {
        const d = drag.current;
        const sheet = sheetRef.current;
        drag.current = null;
        if (!d || !sheet) return;

        const first = d.samples[0];
        const last = d.samples[d.samples.length - 1];
        const dt = last.t - first.t;
        const velocity = dt > 0 ? ((last.y - first.y) / dt) * 1000 : 0;
        const projected = d.offset + project(velocity);

        sheet.style.transition = "";
        sheet.style.transform = "";
        if (projected > sheet.offsetHeight * 0.38) setMobileMenuOpen(false);
    };

    const mobileLinks = [
        { label: "Inicio", href: "/", active: pathname === "/" },
        { label: "Catálogo Exclusivo", href: "/catalogo", active: pathname.startsWith("/catalogo") },
        { label: "Eventos & Bodas", href: "/eventos", active: pathname.startsWith("/eventos") },
    ];

    const luxuryIconButton =
        "relative p-2.5 rounded-full text-stone-700 hover:text-[#D4145A] hover:bg-stone-900/[0.04] transition-[color,background-color,transform] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.92] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4145A]/30";

    return (
        <>
            <TopBar />

            {/* Floating Luxury Architectural Navigation */}
            <nav
                className={`sticky top-0 left-0 right-0 z-40 transition-[padding,background-color,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${scrolled
                    ? "py-2.5 bg-white/85 backdrop-blur-2xl backdrop-saturate-[1.8] border-b border-stone-900/[0.06] shadow-[0_20px_40px_-20px_rgba(212,20,90,0.1),inset_0_1px_0_rgba(255,255,255,0.95)]"
                    : "py-4 bg-white/95 border-b border-transparent"
                    }`}
                role="navigation"
                aria-label="Navegación principal de lujo"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between">

                        {/* Logo con escala física suave */}
                        <Link
                            href="/"
                            className="relative z-10 flex items-center transition-transform duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97]"
                        >
                            <Image
                                src="/img/img-logo/logov2.png"
                                alt="Logo Florería Rosmery - Alta Floristería"
                                width={scrolled ? 155 : 190}
                                height={44}
                                priority
                                className="h-auto w-auto transition-[width,height] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
                            />
                        </Link>

                        {/* Menú Central Editorial */}
                        <ul className="hidden lg:flex items-center gap-9 relative">
                            <li>
                                <Link
                                    href="/"
                                    aria-current={pathname === "/" ? "page" : undefined}
                                    className={`relative text-[12px] font-semibold tracking-[0.14em] uppercase transition-colors duration-200 ${pathname === "/"
                                        ? "text-[#D4145A]"
                                        : "text-stone-700 hover:text-stone-950"
                                        }`}
                                >
                                    Inicio
                                    {pathname === "/" && (
                                        <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-[#D4145A] rounded-full" />
                                    )}
                                </Link>
                            </li>

                            {/* Disparador de Mega Menú */}
                            <li
                                onMouseEnter={() => setMegaMenuOpen(true)}
                                onMouseLeave={() => setMegaMenuOpen(false)}
                                className="relative py-3"
                            >
                                <button
                                    onClick={() => setMegaMenuOpen((v) => !v)}
                                    aria-expanded={megaMenuOpen}
                                    aria-haspopup="true"
                                    className={`group flex items-center gap-1.5 text-[12px] font-semibold tracking-[0.14em] uppercase transition-colors duration-200 ${megaMenuOpen || pathname.startsWith("/catalogo")
                                        ? "text-[#D4145A]"
                                        : "text-stone-700 hover:text-stone-950"
                                        }`}
                                >
                                    <span>Colecciones</span>
                                    <FiChevronDown
                                        className={`transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${megaMenuOpen ? "rotate-180 text-[#D4145A]" : "text-stone-400 group-hover:text-stone-700"}`}
                                        size={14}
                                    />
                                </button>

                                {/* MEGA MENÚ: ARQUITECTURA DOUBLE-BEZEL (DOPPELRAND) */}
                                <div
                                    className={`absolute top-full left-1/2 -translate-x-1/2 w-[760px] origin-top transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${megaMenuOpen
                                        ? "opacity-100 scale-100 translate-y-0 visible pointer-events-auto"
                                        : "opacity-0 scale-[0.98] -translate-y-2 invisible pointer-events-none"
                                        }`}
                                >
                                    {/* Capa Exterior (Outer Shell) */}
                                    <div className="p-2 rounded-[2rem] bg-stone-900/[0.04] ring-1 ring-black/[0.06] shadow-[0_30px_70px_-20px_rgba(40,10,20,0.18)]">
                                        {/* Núcleo Interior (Inner Core) */}
                                        <div className="p-7 rounded-[calc(2rem-0.5rem)] bg-white/95 backdrop-blur-3xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.95)]">
                                            <div className="grid grid-cols-12 gap-7">

                                                {/* Columna 1: Por Ocasión */}
                                                <div className="col-span-4 space-y-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className="rounded-full px-2.5 py-0.5 text-[9px] uppercase tracking-[0.2em] font-semibold bg-rose-50 text-[#D4145A] border border-rose-100/60">
                                                            Momentos
                                                        </span>
                                                        <span className="text-xs font-semibold tracking-wider text-stone-900 uppercase">Por Ocasión</span>
                                                    </div>
                                                    <ul className="space-y-1">
                                                        <li>
                                                            <Link
                                                                href="/catalogo?categoria=Aniversario"
                                                                className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-rose-50/60 transition-colors duration-150"
                                                            >
                                                                <span className="flex items-center gap-2.5 text-xs font-medium text-stone-700 group-hover:text-[#D4145A]">
                                                                    <FiHeart className="text-[#FF6F91]" size={14} /> Aniversario Romántico
                                                                </span>
                                                                <FiArrowUpRight size={13} className="text-stone-300 group-hover:text-[#D4145A] transition-colors" />
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link
                                                                href="/catalogo?categoria=Cumpleaños"
                                                                className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-rose-50/60 transition-colors duration-150"
                                                            >
                                                                <span className="flex items-center gap-2.5 text-xs font-medium text-stone-700 group-hover:text-[#D4145A]">
                                                                    <FiGift className="text-[#D4145A]" size={14} /> Celebración Cumpleaños
                                                                </span>
                                                                <FiArrowUpRight size={13} className="text-stone-300 group-hover:text-[#D4145A] transition-colors" />
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link
                                                                href="/catalogo?categoria=Condolencias"
                                                                className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-rose-50/60 transition-colors duration-150"
                                                            >
                                                                <span className="flex items-center gap-2.5 text-xs font-medium text-stone-700 group-hover:text-[#D4145A]">
                                                                    <FiSun className="text-amber-500" size={14} /> Condolencias & Respeto
                                                                </span>
                                                                <FiArrowUpRight size={13} className="text-stone-300 group-hover:text-[#D4145A] transition-colors" />
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>

                                                {/* Columna 2: Alta Selección */}
                                                <div className="col-span-4 space-y-4 border-l border-stone-100 pl-6">
                                                    <div className="flex items-center gap-2">
                                                        <span className="rounded-full px-2.5 py-0.5 text-[9px] uppercase tracking-[0.2em] font-semibold bg-stone-100 text-stone-700 border border-stone-200">
                                                            Atelier
                                                        </span>
                                                        <span className="text-xs font-semibold tracking-wider text-stone-900 uppercase">Destacados</span>
                                                    </div>
                                                    <ul className="space-y-1">
                                                        <li>
                                                            <Link
                                                                href="/catalogo?popular=true"
                                                                className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-rose-50/60 transition-colors duration-150"
                                                            >
                                                                <span className="flex items-center gap-2.5 text-xs font-medium text-stone-700 group-hover:text-[#D4145A]">
                                                                    <FiAward className="text-amber-600" size={14} /> Colección Bestsellers
                                                                </span>
                                                                <span className="text-[10px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">Top</span>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link
                                                                href="/catalogo"
                                                                className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-rose-50/60 transition-colors duration-150"
                                                            >
                                                                <span className="flex items-center gap-2.5 text-xs font-medium text-stone-700 group-hover:text-[#D4145A]">
                                                                    <FiGrid className="text-[#D4145A]" size={14} /> Catálogo Completo
                                                                </span>
                                                                <FiArrowUpRight size={13} className="text-stone-300 group-hover:text-[#D4145A] transition-colors" />
                                                            </Link>
                                                        </li>
                                                    </ul>

                                                    <div className="mt-4 p-3 rounded-xl bg-stone-50 border border-stone-200/60">
                                                        <p className="text-[11px] text-stone-600 flex items-center gap-1.5 font-medium">
                                                            <FiClock className="text-[#D4145A]" size={12} />
                                                            <span>Pedidos personalizados con 24h de anticipación</span>
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Columna 3: Arreglo de la Semana (Tarjeta Doppelrand + Button-in-Button) */}
                                                <div className="col-span-4">
                                                    <div className="p-1 rounded-2xl bg-stone-900/[0.04] ring-1 ring-black/[0.05]">
                                                        <div className="p-3.5 rounded-[calc(1rem-0.25rem)] bg-gradient-to-b from-[#FFF7F9] to-white border border-rose-100/80 space-y-3">
                                                            <div className="relative h-28 w-full rounded-xl overflow-hidden shadow-sm">
                                                                <Image
                                                                    src="/img/productos_nuevos/1.jpg"
                                                                    alt="Amor Eterno - Rosas Deluxe"
                                                                    fill
                                                                    className="object-cover"
                                                                />
                                                                <span className="absolute top-2 left-2 rounded-full px-2 py-0.5 text-[9px] uppercase tracking-wider font-semibold bg-white/90 backdrop-blur-md text-[#D4145A] shadow-sm">
                                                                    Edición Atelier
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <h5 className="text-xs font-bold text-stone-900">Rosas Amor Eterno</h5>
                                                                <p className="text-[11px] text-stone-500 line-clamp-1">36 Rosas rojas importadas</p>
                                                                <div className="flex items-center justify-between mt-2 pt-2 border-t border-rose-100/60">
                                                                    <span className="text-xs font-bold text-[#D4145A] tabular-nums">S/ 180.00</span>
                                                                    {/* Button-in-Button Trailing CTA */}
                                                                    <Link
                                                                        href="/catalogo?categoria=Aniversario"
                                                                        className="group flex items-center gap-2 pl-3 pr-1 py-1 rounded-full bg-[#161214] hover:bg-[#D4145A] text-white text-[11px] font-medium transition-all duration-200 active:scale-[0.96]"
                                                                    >
                                                                        <span>Ver</span>
                                                                        <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
                                                                            <FiArrowUpRight size={11} />
                                                                        </span>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <Link
                                    href="/eventos"
                                    aria-current={pathname.startsWith("/eventos") ? "page" : undefined}
                                    className={`relative text-[12px] font-semibold tracking-[0.14em] uppercase transition-colors duration-200 ${pathname.startsWith("/eventos")
                                        ? "text-[#D4145A]"
                                        : "text-stone-700 hover:text-stone-950"
                                        }`}
                                >
                                    Eventos & Bodas
                                    {pathname.startsWith("/eventos") && (
                                        <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-[#D4145A] rounded-full" />
                                    )}
                                </Link>
                            </li>

                            <li>
                                <button
                                    onClick={() => setModalQSOpen(true)}
                                    className="text-[12px] font-semibold tracking-[0.14em] uppercase text-stone-700 hover:text-stone-950 transition-colors duration-200"
                                >
                                    Nosotros
                                </button>
                            </li>
                        </ul>

                        {/* Acciones de Escritorio de Alta Fidelidad */}
                        <div className="hidden lg:flex items-center gap-2">

                            {/* Botón Buscador Spotlight con indicador de atajo */}
                            <button
                                onClick={() => setSearchOpen(!searchOpen)}
                                aria-label="Abrir buscador (Cmd+K)"
                                aria-expanded={searchOpen}
                                className="group flex items-center gap-2 pl-3 pr-2.5 py-1.5 rounded-full bg-stone-900/[0.04] hover:bg-stone-900/[0.07] text-stone-600 hover:text-stone-900 transition-all duration-200 active:scale-[0.96] ring-1 ring-black/[0.04]"
                            >
                                <FiSearch size={14} className="text-stone-500 group-hover:text-[#D4145A] transition-colors" />
                                <span className="text-xs font-normal text-stone-500">Buscar...</span>
                                <kbd className="hidden xl:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono text-stone-500 bg-white shadow-xs border border-stone-200/80">
                                    ⌘K
                                </kbd>
                            </button>

                            {/* Menú de Usuario / Perfil */}
                            {user ? (
                                <div className="relative" ref={userMenuRef}>
                                    <button
                                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                                        aria-expanded={userMenuOpen}
                                        aria-haspopup="menu"
                                        className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-stone-900/[0.04] hover:bg-stone-900/[0.07] ring-1 ring-black/[0.04] transition-all duration-200 active:scale-[0.96]"
                                    >
                                        <span className="w-7 h-7 bg-gradient-to-br from-[#D4145A] to-[#FF6F91] rounded-full flex items-center justify-center text-white text-xs font-bold shadow-xs">
                                            {(user.user_metadata?.full_name || user.email || "U")[0].toUpperCase()}
                                        </span>
                                        <span className="text-xs font-medium text-stone-800 max-w-[100px] truncate">
                                            {user.user_metadata?.full_name?.split(" ")[0] || "Mi Cuenta"}
                                        </span>
                                        <FiChevronDown size={13} className={`text-stone-500 transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`} />
                                    </button>

                                    {/* Dropdown de usuario con Doppelrand */}
                                    <div
                                        role="menu"
                                        className={`absolute top-full right-0 mt-3 w-64 origin-top-right transition-all duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] ${userMenuOpen
                                            ? "opacity-100 scale-100 visible pointer-events-auto"
                                            : "opacity-0 scale-[0.96] invisible pointer-events-none"
                                            }`}
                                    >
                                        <div className="p-1.5 rounded-[1.5rem] bg-stone-900/[0.04] ring-1 ring-black/[0.06] shadow-[0_20px_40px_-15px_rgba(30,10,20,0.2)]">
                                            <div className="rounded-[calc(1.5rem-0.375rem)] bg-white/95 backdrop-blur-2xl overflow-hidden divide-y divide-stone-100">
                                                <div className="px-4 py-3 bg-stone-50/50">
                                                    <p className="text-xs font-semibold text-stone-900 truncate">{user.user_metadata?.full_name || "Mi Cuenta"}</p>
                                                    <p className="text-[11px] text-stone-500 truncate">{user.email}</p>
                                                </div>
                                                <div className="p-1 space-y-0.5">
                                                    <button
                                                        role="menuitem"
                                                        onClick={() => { router.push("/perfil"); setUserMenuOpen(false); }}
                                                        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-stone-700 hover:bg-rose-50/70 hover:text-[#D4145A] transition-colors"
                                                    >
                                                        <FiUser size={15} /><span>Mi Perfil & Direcciones</span>
                                                    </button>
                                                    <button
                                                        role="menuitem"
                                                        onClick={() => { setTrackingModalOpen(true); setUserMenuOpen(false); }}
                                                        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-stone-700 hover:bg-rose-50/70 hover:text-[#D4145A] transition-colors"
                                                    >
                                                        <FiTruck size={15} /><span>Rastrear Pedido</span>
                                                    </button>
                                                </div>
                                                <div className="p-1">
                                                    <button
                                                        role="menuitem"
                                                        onClick={handleSignOut}
                                                        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
                                                    >
                                                        <FiLogOut size={15} /><span>Cerrar Sesión</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={() => router.push("/iniciosesion")}
                                    className="group flex items-center gap-2 pl-3.5 pr-2 py-1.5 rounded-full bg-stone-900/[0.04] hover:bg-stone-900/[0.07] ring-1 ring-black/[0.04] text-stone-800 text-xs font-medium transition-all duration-200 active:scale-[0.96]"
                                >
                                    <span>Ingresar</span>
                                    <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-stone-700 shadow-2xs group-hover:text-[#D4145A] transition-colors">
                                        <FiUser size={12} />
                                    </span>
                                </button>
                            )}

                            {/* Botón Carrito con Island Badge */}
                            <button
                                aria-label={`Carrito, ${totalItems} productos`}
                                onClick={() => router.push("/Carrito")}
                                className="group relative flex items-center gap-2 pl-3.5 pr-3 py-1.5 rounded-full bg-[#161214] hover:bg-[#D4145A] text-white text-xs font-medium transition-all duration-200 active:scale-[0.96] shadow-sm"
                            >
                                <FiShoppingCart size={15} className="group-hover:scale-105 transition-transform" />
                                <span>Bolsa</span>
                                <span className="inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-white text-[#D4145A] text-[10px] font-bold tabular-nums">
                                    {totalItems > 99 ? "99+" : totalItems}
                                </span>
                            </button>
                        </div>

                        {/* Controles Móviles */}
                        <div className="lg:hidden flex items-center gap-1.5">
                            <button
                                onClick={() => setSearchOpen(!searchOpen)}
                                aria-label="Buscar"
                                className={luxuryIconButton}
                            >
                                <FiSearch size={19} />
                            </button>

                            <button
                                aria-label={`Carrito, ${totalItems} productos`}
                                onClick={() => router.push("/Carrito")}
                                className={luxuryIconButton}
                            >
                                <FiShoppingCart size={19} />
                                {totalItems > 0 && (
                                    <span className="absolute top-1 right-1 bg-[#D4145A] text-[10px] text-white font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center tabular-nums ring-2 ring-white">
                                        {totalItems > 99 ? "99+" : totalItems}
                                    </span>
                                )}
                            </button>

                            {/* Hamburger Morphing Button (Líneas cinéticas que se transforman en X) */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                                aria-expanded={mobileMenuOpen}
                                aria-controls="mobile-sheet"
                                className="w-10 h-10 rounded-full bg-stone-900/[0.04] flex flex-col items-center justify-center gap-1.5 text-stone-800 transition-all duration-200 active:scale-[0.92]"
                            >
                                <span
                                    className={`w-5 h-[2px] bg-stone-800 rounded-full transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${mobileMenuOpen ? "translate-y-[4px] rotate-45" : ""
                                        }`}
                                />
                                <span
                                    className={`w-5 h-[2px] bg-stone-800 rounded-full transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${mobileMenuOpen ? "-translate-y-[4px] -rotate-45" : ""
                                        }`}
                                />
                            </button>
                        </div>
                    </div>

                    {/* SPOTLIGHT SEARCH / COMMAND PALETTE (DOPPELRAND ARCHITECTURE) */}
                    <div
                        className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${searchOpen ? "max-h-96 mt-3 opacity-100 visible" : "max-h-0 mt-0 opacity-0 invisible"
                            }`}
                    >
                        {/* Outer Shell */}
                        <div className="p-1.5 rounded-[1.75rem] bg-stone-900/[0.05] ring-1 ring-black/[0.06] shadow-[0_20px_45px_-15px_rgba(20,5,15,0.15)] mb-3">
                            {/* Inner Core */}
                            <div className="p-3 rounded-[calc(1.75rem-0.375rem)] bg-white/95 backdrop-blur-2xl">
                                <div className="relative flex items-center">
                                    <FiSearch className="absolute left-3.5 text-stone-400" size={17} />
                                    <input
                                        ref={searchInputRef}
                                        type="text"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Buscar rosas, ramos de aniversario, tulipanes o arreglos fúnebres..."
                                        aria-label="Buscar flores y arreglos"
                                        className="w-full pl-11 pr-24 py-2.5 bg-stone-50 border border-stone-200/80 rounded-xl text-sm text-stone-900 placeholder:text-stone-400 outline-none focus:bg-white focus:border-[#D4145A] focus:ring-3 focus:ring-[#D4145A]/15 transition-all duration-200"
                                    />
                                    <div className="absolute right-2 flex items-center gap-1.5">
                                        {query && (
                                            <button
                                                onClick={() => setQuery("")}
                                                aria-label="Limpiar búsqueda"
                                                className="w-6 h-6 rounded-full bg-stone-200/80 flex items-center justify-center text-stone-600 hover:bg-stone-300 text-xs transition-colors"
                                            >
                                                ✕
                                            </button>
                                        )}
                                        <button
                                            onClick={() => setSearchOpen(false)}
                                            className="px-2 py-1 text-[11px] font-medium text-stone-500 hover:text-stone-800 transition-colors"
                                        >
                                            Cerrar
                                        </button>
                                    </div>
                                </div>

                                {/* Pills de búsqueda rápida sugerida */}
                                <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-stone-100 overflow-x-auto no-scrollbar">
                                    <span className="text-[10px] uppercase tracking-wider text-stone-400 font-medium whitespace-nowrap">
                                        Sugerencias:
                                    </span>
                                    {QUICK_SEARCH_TAGS.map((tag) => (
                                        <button
                                            key={tag}
                                            onClick={() => setQuery(tag)}
                                            className="px-2.5 py-1 rounded-full text-xs font-medium bg-stone-100 hover:bg-rose-50 hover:text-[#D4145A] text-stone-600 transition-colors duration-150 whitespace-nowrap active:scale-[0.96]"
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>

                                {/* Resultados de la búsqueda */}
                                {suggestions.length > 0 && (
                                    <div className="mt-3 pt-3 border-t border-stone-100 space-y-1 max-h-60 overflow-y-auto">
                                        {suggestions.map((plant) => (
                                            <Link
                                                key={plant.id}
                                                href={`/buscar?q=${encodeURIComponent(plant.nombre)}`}
                                                onClick={() => setSearchOpen(false)}
                                                className="group flex items-center gap-3.5 p-2 rounded-xl hover:bg-rose-50/60 transition-colors duration-150"
                                            >
                                                <div className="w-11 h-11 relative rounded-lg overflow-hidden flex-shrink-0 bg-stone-100 border border-stone-200/60">
                                                    <Image
                                                        src={plant.imagen}
                                                        alt={plant.nombre}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs font-semibold text-stone-900 group-hover:text-[#D4145A] truncate transition-colors">
                                                        {plant.nombre}
                                                    </p>
                                                    <p className="text-[11px] text-stone-400 truncate">{plant.categoria}</p>
                                                </div>
                                                <div className="text-right flex items-center gap-2">
                                                    <span className="text-xs font-bold text-stone-900 tabular-nums">S/ {plant.precio}</span>
                                                    <span className="w-6 h-6 rounded-full bg-stone-100 group-hover:bg-[#D4145A] group-hover:text-white flex items-center justify-center text-stone-400 transition-colors">
                                                        <FiArrowUpRight size={12} />
                                                    </span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </nav>

            {/* Velo translúcido para móvil */}
            <div
                aria-hidden="true"
                onClick={() => setMobileMenuOpen(false)}
                className={`lg:hidden fixed inset-0 z-[65] bg-stone-950/40 backdrop-blur-xs transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
            />

            {/* Hoja móvil con física háptica Apple y arquitectura Doppelrand */}
            <div
                id="mobile-sheet"
                ref={sheetRef}
                role="dialog"
                aria-modal="true"
                aria-label="Menú de Navegación"
                inert={!mobileMenuOpen}
                className={`mobile-sheet lg:hidden fixed inset-x-0 bottom-0 z-[70] max-h-[88dvh] flex flex-col rounded-t-[32px] bg-white/95 backdrop-blur-2xl shadow-[0_-20px_60px_-15px_rgba(30,10,20,0.3),inset_0_1px_0_rgba(255,255,255,0.95)] pb-[env(safe-area-inset-bottom)] transition-transform duration-[380ms] ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform ${mobileMenuOpen ? "translate-y-0" : "translate-y-full"
                    }`}
            >
                {/* Zona de agarre háptico */}
                <div
                    onPointerDown={onSheetPointerDown}
                    onPointerMove={onSheetPointerMove}
                    onPointerUp={onSheetPointerUp}
                    onPointerCancel={onSheetPointerUp}
                    className="touch-none select-none cursor-grab active:cursor-grabbing px-6 pt-3.5 pb-2"
                >
                    <div className="mx-auto h-1.5 w-11 rounded-full bg-stone-300" />
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                            <span className="rounded-full px-2.5 py-0.5 text-[9px] uppercase tracking-[0.2em] font-semibold bg-rose-50 text-[#D4145A] border border-rose-100">
                                Atelier
                            </span>
                            <span className="text-base font-semibold tracking-tight text-stone-900">Menú Rosmery</span>
                        </div>
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            aria-label="Cerrar menú"
                            className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 transition-transform duration-100 ease-out active:scale-[0.9]"
                        >
                            <FiX size={16} />
                        </button>
                    </div>
                </div>

                <div className="overflow-y-auto overscroll-contain px-5 pb-8 space-y-4">

                    {/* Enlaces Principales con Doppelrand container */}
                    <div className="p-1 rounded-2xl bg-stone-900/[0.03] ring-1 ring-black/[0.04]">
                        <ul className="rounded-[calc(1rem-0.25rem)] bg-white divide-y divide-stone-100 overflow-hidden shadow-2xs">
                            {mobileLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        aria-current={link.active ? "page" : undefined}
                                        className={`flex items-center justify-between px-4 py-3.5 text-sm font-medium transition-colors ${link.active ? "text-[#D4145A] bg-rose-50/50" : "text-stone-800"
                                            }`}
                                    >
                                        <span>{link.label}</span>
                                        <FiArrowUpRight
                                            size={15}
                                            className={link.active ? "text-[#D4145A]" : "text-stone-300"}
                                        />
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <button
                                    onClick={() => { setModalQSOpen(true); setMobileMenuOpen(false); }}
                                    className="w-full flex items-center justify-between px-4 py-3.5 text-sm font-medium text-stone-800 hover:bg-stone-50 transition-colors"
                                >
                                    <span>Historia & Nosotros</span>
                                    <FiArrowUpRight size={15} className="text-stone-300" />
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Acciones de Cuenta / Rastreo con Nested Buttons */}
                    <div className="grid grid-cols-2 gap-3 pt-1">
                        <button
                            onClick={() => { router.push(user ? "/perfil" : "/iniciosesion"); setMobileMenuOpen(false); }}
                            className="group flex items-center justify-between pl-4 pr-2 py-3 rounded-2xl font-semibold text-xs bg-[#161214] text-white shadow-sm transition-all duration-200 active:scale-[0.97]"
                        >
                            <span>{user ? "Mi Cuenta" : "Ingresar"}</span>
                            <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                                <FiUser size={13} />
                            </span>
                        </button>
                        <button
                            onClick={() => { setTrackingModalOpen(true); setMobileMenuOpen(false); }}
                            className="group flex items-center justify-between pl-4 pr-2 py-3 rounded-2xl font-semibold text-xs bg-stone-100 hover:bg-stone-200/80 text-stone-800 transition-all duration-200 active:scale-[0.97]"
                        >
                            <span>Rastrear</span>
                            <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-stone-700 shadow-2xs group-hover:scale-105 transition-transform">
                                <FiTruck size={13} />
                            </span>
                        </button>
                    </div>

                    {/* Soporte WhatsApp Concierge */}
                    <div className="p-3.5 rounded-2xl bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-100/80 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-stone-900">¿Deseas atención personalizada?</p>
                            <p className="text-[11px] text-stone-500">Floristas dedicados disponibles</p>
                        </div>
                        <a
                            href="https://wa.me/51912053432"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-full bg-[#D4145A] text-white text-[11px] font-semibold shadow-xs"
                        >
                            WhatsApp
                        </a>
                    </div>
                </div>
            </div>

            <ModalQS isOpen={modalQSOpen} onClose={() => setModalQSOpen(false)} />
            <OrderTrackingModal isOpen={trackingModalOpen} onClose={() => setTrackingModalOpen(false)} />
        </>
    );
}
