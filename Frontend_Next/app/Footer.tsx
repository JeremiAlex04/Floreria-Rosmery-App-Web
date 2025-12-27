"use client";

import Image from "next/image";
import Link from "next/link";
import { FiPhone, FiMail, FiMapPin, FiInstagram, FiFacebook, FiTwitter, FiMessageCircle } from "react-icons/fi";
import { SiTiktok } from "react-icons/si";
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal } from "react-icons/fa";

export default function Footer() {
    return (
        <footer id="contacto" className="bg-[#1a1a1a] text-gray-300">
            {/* Newsletter / Seccion Superior Opcional */}
            <div>
                <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                    <div>
                        <h4 className="text-white font-bold text-xl">¿Necesitas algo especial?</h4>
                        <p className="text-gray-400 text-sm mt-1">Nuestros floristas están listos para ayudarte con arreglos personalizados.</p>
                    </div>
                    <Link href="#contacto" className="bg-[#D4145A] hover:bg-[#B0124A] text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105">
                        Hablar con un experto
                    </Link>
                </div>
            </div>

            {/* Footer Principal */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Branding & Bio */}
                    <div className="space-y-6">
                        <Link href="/">
                            <Image
                                src="/img/img-logo/logov2.png"
                                alt="Logo Florería Rosmery"
                                width={200}
                                height={45}
                                className="brightness-0 invert"
                            />
                        </Link>
                        <p className="text-sm leading-relaxed text-gray-400">
                            Llevamos alegría y frescura a cada rincón de Lima desde 2010. Especialistas en arreglos florales premium para cada momento inolvidable.
                        </p>
                        <div className="flex items-center space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#D4145A] hover:text-white transition-all">
                                <FiInstagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#D4145A] hover:text-white transition-all">
                                <FiFacebook size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#D4145A] hover:text-white transition-all">
                                <SiTiktok size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Enlaces Rápidos */}
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Nuestra Tienda</h4>
                        <ul className="space-y-4">
                            <li><Link href="/" className="hover:text-white transition-colors text-sm">Inicio</Link></li>
                            <li><Link href="/catalogo" className="hover:text-white transition-colors text-sm">Catálogo Completo</Link></li>
                            <li><Link href="/catalogo?categoria=rosas" className="hover:text-white transition-colors text-sm">Rosas Premium</Link></li>
                            <li><Link href="/catalogo?categoria=ofertas" className="hover:text-white transition-colors text-sm">Ofertas Especiales</Link></li>
                        </ul>
                    </div>

                    {/* Contacto & Ayuda */}
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Servicio al Cliente</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <FiPhone className="text-[#FF6F91] mt-1 shrink-0" />
                                <div className="text-sm">
                                    <p className="text-white font-medium">(01) 245-8365</p>
                                    <p className="text-gray-500 text-xs">Atención Lun - Sáb</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <FiMessageCircle className="text-[#FF6F91] mt-1 shrink-0" />
                                <div className="text-sm">
                                    <p className="text-white font-medium">+51 912 053 432</p>
                                    <p className="text-gray-500 text-xs">WhatsApp 24/7</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <FiMapPin className="text-[#FF6F91] mt-1 shrink-0" />
                                <div className="text-sm">
                                    <p className="text-white font-medium">Av. Flores 123</p>
                                    <p className="text-gray-500 text-xs">Miraflores, Lima</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Legales & Libro */}
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Información Legal</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/terminos" className="hover:text-white transition-colors">Términos y condiciones</Link></li>
                            <li><Link href="/politicas" className="hover:text-white transition-colors">Políticas de privacidad</Link></li>
                            <li><Link href="/reclamaciones" className="hover:text-white transition-colors">Libro de reclamaciones</Link></li>
                            <li className="pt-4">
                                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                    <p className="text-[10px] text-gray-500 leading-tight">Aceptamos todos los medios de pago:</p>
                                    <div className="flex gap-3 mt-3 opacity-70">
                                        <FaCcVisa className="text-3xl text-white hover:text-[#D4145A] transition-colors" />
                                        <FaCcMastercard className="text-3xl text-white hover:text-[#D4145A] transition-colors" />
                                        <FaCcAmex className="text-3xl text-white hover:text-[#D4145A] transition-colors" />
                                        <FaCcPaypal className="text-3xl text-white hover:text-[#D4145A] transition-colors" />
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>

            <div className="bg-[#111111] py-8">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-gray-500">
                        © {new Date().getFullYear()} FLORERIA ROSMERY. Todos los derechos reservados.
                    </p>
                    <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">
                        Proyecto en desarrollo por: Jeremi Olivares Chavez
                    </p>
                </div>
            </div>
        </footer>
    );
}
