"use client";

import Image from "next/image";
import Link from "next/link";
import { FiPhone, FiMapPin, FiInstagram, FiFacebook, FiMessageCircle, FiArrowUpRight } from "react-icons/fi";
import { SiTiktok } from "react-icons/si";
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal } from "react-icons/fa";

const WHATSAPP_URL = `https://wa.me/51912053432?text=${encodeURIComponent(
    "Hola Florería Rosmery, quiero un arreglo personalizado."
)}`;

const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6F91] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1c1316]";

const socials = [
    { label: "Instagram", href: "https://www.instagram.com/", icon: FiInstagram },
    { label: "Facebook", href: "https://www.facebook.com/", icon: FiFacebook },
    { label: "TikTok", href: "https://www.tiktok.com/", icon: SiTiktok },
];

const shopLinks = [
    { label: "Inicio", href: "/" },
    { label: "Catálogo completo", href: "/catalogo" },
    { label: "Cumpleaños", href: "/catalogo?categoria=Cumpleaños" },
    { label: "Aniversario", href: "/catalogo?categoria=Aniversario" },
    { label: "Lo más vendido", href: "/catalogo?popular=true" },
    { label: "Eventos", href: "/eventos" },
];

const legalLinks = [
    { label: "Términos y condiciones", href: "/terminos" },
    { label: "Políticas de privacidad", href: "/politicas" },
    { label: "Libro de reclamaciones", href: "/reclamaciones" },
];

const linkClass = `text-sm text-stone-400 hover:text-white transition-colors duration-150 rounded-sm ${focusRing}`;
const headingClass = "text-white font-semibold text-sm mb-5";

export default function Footer() {
    return (
        <footer id="contacto" className="relative bg-[#1c1316] text-stone-300 overflow-hidden">
            {/* Resplandor ambiental sutil con el tono de marca */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full bg-[#D4145A]/10 blur-3xl"
            />

            {/* CTA superior */}
            <div className="relative max-w-7xl mx-auto px-4 pt-14 pb-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-12">
                    <div className="max-w-xl">
                        <p className="text-[#FF6F91] text-sm font-medium mb-2">Arreglos a medida</p>
                        <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight leading-[1.1] [text-wrap:balance]">
                            ¿Tienes una ocasión especial en mente?
                        </h2>
                        <p className="text-stone-400 text-sm mt-3 leading-relaxed">
                            Cuéntanos la idea y nuestros floristas te arman una propuesta por WhatsApp.
                        </p>
                    </div>
                    <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group inline-flex items-center gap-2 self-start md:self-auto bg-[#D4145A] hover:bg-[#B0124A] text-white px-7 py-3.5 rounded-full font-semibold text-sm shadow-lg shadow-[#D4145A]/25 transition-[background-color,transform] duration-150 ease-out active:scale-[0.97] ${focusRing}`}
                    >
                        Escribir a un florista
                        <FiArrowUpRight className="transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                </div>
            </div>

            {/* Footer principal */}
            <div className="relative max-w-7xl mx-auto px-4 pb-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

                    {/* Marca */}
                    <div className="lg:col-span-4 space-y-6">
                        <Link href="/" className={`inline-block rounded-sm ${focusRing}`} aria-label="Florería Rosmery, ir al inicio">
                            <Image
                                src="/img/img-logo/logov2.png"
                                alt="Logo Florería Rosmery"
                                width={180}
                                height={40}
                                className="brightness-0 invert"
                            />
                        </Link>
                        <p className="text-sm leading-relaxed text-stone-400 max-w-xs">
                            Arreglos florales frescos para cada momento importante. Entregamos en Lima desde 2010.
                        </p>
                        <ul className="flex items-center gap-3" aria-label="Redes sociales">
                            {socials.map(({ label, href, icon: Icon }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className={`w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-stone-300 hover:bg-[#D4145A] hover:border-[#D4145A] hover:text-white transition-[background-color,border-color,color,transform] duration-150 ease-out active:scale-[0.95] ${focusRing}`}
                                    >
                                        <Icon size={18} />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tienda */}
                    <nav className="lg:col-span-2" aria-label="Tienda">
                        <h3 className={headingClass}>Tienda</h3>
                        <ul className="space-y-3">
                            {shopLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className={linkClass}>{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Contacto */}
                    <div className="lg:col-span-3">
                        <h3 className={headingClass}>Contacto</h3>
                        <address className="not-italic space-y-4">
                            <a href="tel:+5112458365" className={`flex items-start gap-3 group rounded-sm ${focusRing}`}>
                                <FiPhone className="text-[#FF6F91] mt-0.5 shrink-0" />
                                <span className="text-sm">
                                    <span className="block text-white font-medium tabular-nums group-hover:text-[#FF6F91] transition-colors duration-150">(01) 245-8365</span>
                                    <span className="block text-stone-500 text-xs mt-0.5">Lunes a sábado, 8:00 a 20:00</span>
                                </span>
                            </a>
                            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`flex items-start gap-3 group rounded-sm ${focusRing}`}>
                                <FiMessageCircle className="text-[#FF6F91] mt-0.5 shrink-0" />
                                <span className="text-sm">
                                    <span className="block text-white font-medium tabular-nums group-hover:text-[#FF6F91] transition-colors duration-150">+51 912 053 432</span>
                                    <span className="block text-stone-500 text-xs mt-0.5">WhatsApp, todos los días</span>
                                </span>
                            </a>
                            <a
                                href="https://www.google.com/maps/search/?api=1&query=Av.+Flores+123+Miraflores+Lima"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-start gap-3 group rounded-sm ${focusRing}`}
                            >
                                <FiMapPin className="text-[#FF6F91] mt-0.5 shrink-0" />
                                <span className="text-sm">
                                    <span className="block text-white font-medium group-hover:text-[#FF6F91] transition-colors duration-150">Av. Flores 123</span>
                                    <span className="block text-stone-500 text-xs mt-0.5">Miraflores, Lima</span>
                                </span>
                            </a>
                        </address>
                    </div>

                    {/* Legal y pagos */}
                    <div className="lg:col-span-3">
                        <h3 className={headingClass}>Información legal</h3>
                        <ul className="space-y-3">
                            {legalLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className={linkClass}>{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-8">
                            <p className="text-xs text-stone-500 mb-3">Medios de pago</p>
                            <ul className="flex items-center gap-3 text-stone-400" aria-label="Medios de pago aceptados">
                                <li><FaCcVisa className="text-3xl" aria-label="Visa" /></li>
                                <li><FaCcMastercard className="text-3xl" aria-label="Mastercard" /></li>
                                <li><FaCcAmex className="text-3xl" aria-label="American Express" /></li>
                                <li><FaCcPaypal className="text-3xl" aria-label="PayPal" /></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Barra inferior */}
            <div className="relative border-t border-white/10 bg-[#150e10]">
                <div className="max-w-7xl mx-auto px-4 pt-6 pb-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-stone-500">
                    <p>© {new Date().getFullYear()} Florería Rosmery. Todos los derechos reservados.</p>
                    <p>Desarrollado por Jeremi Olivares Chavez</p>
                </div>
            </div>
        </footer>
    );
}
