"use client";

import { FiPhone, FiMail, FiClock, FiMessageCircle, FiArrowUpRight } from "react-icons/fi";
import { useScrollReveal } from "../hooks/useScrollReveal";

const contactChannels = [
    {
        icon: <FiMessageCircle className="text-2xl text-emerald-600" />,
        title: "WhatsApp Directo",
        detail: "+51 912 053 432",
        sub: "Respuesta en pocos minutos",
        href: "https://wa.me/51912053432?text=Hola%20Florer%C3%ADa%20Rosmery%2C%20deseo%20consultar%20por%20un%20arreglo%20floral",
        isExternal: true,
        actionLabel: "Chatear ahora",
    },
    {
        icon: <FiPhone className="text-2xl text-[#D4145A]" />,
        title: "Atención Telefónica",
        detail: "(01) 245-8365",
        sub: "Lun - Sáb, 9:00 AM - 7:00 PM",
        href: "tel:012458365",
        isExternal: false,
        actionLabel: "Llamar a tienda",
    },
    {
        icon: <FiMail className="text-2xl text-rose-500" />,
        title: "Correo Electrónico",
        detail: "contacto@floreriarosmery.com",
        sub: "Atención a pedidos especiales",
        href: "mailto:contacto@floreriarosmery.com",
        isExternal: false,
        actionLabel: "Escribir email",
    },
    {
        icon: <FiClock className="text-2xl text-amber-600" />,
        title: "Horario de Envío",
        detail: "9:00 AM - 8:00 PM",
        sub: "Lunes a Domingo (con reserva)",
        href: "#",
        isExternal: false,
        actionLabel: "Ver zonas",
    },
];

export default function ContactSection() {
    const { ref, isVisible } = useScrollReveal();

    return (
        <section
            id="contacto-section"
            ref={ref}
            className={`transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)] will-change-transform ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
            <div className="text-center max-w-2xl mx-auto mb-14">
                <span className="inline-block px-4 py-1 rounded-full bg-pink-50 border border-pink-200/60 text-[#D4145A] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">
                    Atención Personalizada
                </span>
                <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
                    ¿Deseas una Consulta Especial?
                </h2>
                <p className="text-stone-500 text-sm sm:text-base mt-3 leading-relaxed">
                    Estamos listos para asesorarte en la elección del ramo perfecto para cualquier ocasión.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
                {contactChannels.map((item, i) => (
                    <a
                        key={i}
                        href={item.href}
                        target={item.isExternal ? "_blank" : undefined}
                        rel={item.isExternal ? "noopener noreferrer" : undefined}
                        style={{ touchAction: "manipulation" }}
                        className="group relative p-2.5 rounded-[2.2rem] bg-stone-100/70 hover:bg-pink-100/30 ring-1 ring-stone-900/5 hover:ring-pink-300/40 transition-all duration-300 ease-[var(--ease-out-expo)] flex flex-col justify-between select-none"
                    >
                        <div className="relative rounded-[calc(2.2rem-0.6rem)] bg-white p-6 shadow-sm flex flex-col justify-between h-full">
                            <div>
                                <div className="flex items-center justify-between mb-5">
                                    <div className="w-12 h-12 rounded-2xl bg-stone-50 border border-stone-200/60 flex items-center justify-center group-hover:scale-105 transition-transform">
                                        {item.icon}
                                    </div>
                                    <span className="w-8 h-8 rounded-full bg-stone-50 group-hover:bg-[#D4145A] group-hover:text-white flex items-center justify-center text-stone-400 transition-colors">
                                        <FiArrowUpRight className="text-sm" />
                                    </span>
                                </div>
                                <h3 className="font-editorial text-lg font-bold text-stone-900 mb-1">
                                    {item.title}
                                </h3>
                                <p className="font-semibold text-stone-800 text-sm tracking-tight">
                                    {item.detail}
                                </p>
                                <p className="text-xs text-stone-400 mt-1">
                                    {item.sub}
                                </p>
                            </div>

                            <div className="mt-5 pt-3 border-t border-stone-100">
                                <span className="text-[11px] font-bold text-[#D4145A] uppercase tracking-wider group-hover:underline">
                                    {item.actionLabel} &rarr;
                                </span>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}
