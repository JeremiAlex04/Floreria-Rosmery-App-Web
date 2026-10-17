import Link from "next/link";
import { FiPhone, FiTruck, FiInstagram, FiFacebook, FiMapPin, FiArrowUpRight } from "react-icons/fi";

export default function TopBar() {
    return (
        <header className="relative z-50 bg-[#161214] text-stone-200 text-xs border-b border-white/[0.08]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-col md:flex-row justify-between items-center gap-2">

                {/* Contacto & Taller Floral */}
                <div className="flex items-center gap-4 sm:gap-6 text-[11px] tracking-wide text-stone-300">
                    <a
                        href="tel:+51912053432"
                        className="group flex items-center gap-2 hover:text-white transition-colors duration-200"
                    >
                        <span className="w-5 h-5 rounded-full bg-white/[0.08] flex items-center justify-center text-[#FF6F91] group-hover:scale-110 transition-transform duration-200">
                            <FiPhone size={11} />
                        </span>
                        <span>Concierge: <strong className="font-semibold text-white tracking-normal">912 053 432</strong></span>
                    </a>
                    <span className="hidden md:inline-flex items-center gap-1.5 text-stone-400">
                        <FiMapPin size={11} className="text-[#FF6F91]" />
                        <span>Atelier: Av. Las Flores 123, Miraflores</span>
                    </span>
                </div>

                {/* USP Central - Luxury Badge */}
                <div className="hidden lg:flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6F91] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4145A]"></span>
                    </span>
                    <span className="text-[11px] font-medium tracking-[0.04em] text-stone-200">
                        Entrega Express Privada en menos de 2 horas en Lima
                    </span>
                </div>

                {/* Redes & Enlace de Rastreo con Micro-CTA */}
                <div className="flex items-center gap-4 text-[11px]">
                    <div className="flex items-center gap-3 border-r border-white/10 pr-4">
                        <Link
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram de Florería Rosmery"
                            className="text-stone-400 hover:text-[#FF6F91] transition-transform duration-200 hover:scale-110"
                        >
                            <FiInstagram size={13} />
                        </Link>
                        <Link
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook de Florería Rosmery"
                            className="text-stone-400 hover:text-[#FF6F91] transition-transform duration-200 hover:scale-110"
                        >
                            <FiFacebook size={13} />
                        </Link>
                    </div>

                    <Link
                        href="/rastreo"
                        className="group flex items-center gap-1 text-stone-300 hover:text-white font-medium transition-colors duration-200"
                    >
                        <span>Rastrear Envío</span>
                        <FiArrowUpRight
                            size={12}
                            className="text-stone-400 group-hover:text-[#FF6F91] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                        />
                    </Link>
                </div>
            </div>
        </header>
    );
}
