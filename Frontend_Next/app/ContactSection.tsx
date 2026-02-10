"use client";

import { useEffect, useState } from "react";
import { FiPhone, FiMail, FiMapPin, FiClock, FiMessageCircle } from "react-icons/fi";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { supabase } from "../lib/supabase";

interface CompanySettings {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    schedule_mon_sat: string;
    map_iframe_url: string;
}

export default function ContactSection() {
    const { ref, isVisible } = useScrollReveal();
    const [settings, setSettings] = useState<CompanySettings | null>(null);

    useEffect(() => {
        const fetchSettings = async () => {
            const { data } = await supabase.from("company_settings").select("*").single();
            if (data) setSettings(data);
        };
        fetchSettings();
    }, []);

    if (!settings) return null;

    const contactInfo = [
        {
            icon: <FiPhone />,
            title: "Llámanos",
            detail: settings.phone,
            sub: "Lun - Sáb, " + settings.schedule_mon_sat,
        },
        {
            icon: <FiMessageCircle />,
            title: "WhatsApp",
            detail: settings.whatsapp,
            sub: "Respuesta en minutos",
        },
        {
            icon: <FiMail />,
            title: "Email",
            detail: settings.email,
            sub: "Respuesta en 24h",
        },
        {
            icon: <FiClock />,
            title: "Horario",
            detail: settings.schedule_mon_sat,
            sub: "Lunes a Sábado",
        },
    ];

    return (
        <section
            id="contacto-section"
            ref={ref}
            className={`py-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
            <div className="text-center mb-12">
                <span className="text-[#D4145A] font-bold tracking-wider uppercase text-sm">Estamos cerca</span>
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-2 tracking-tight">
                    Contáctanos
                </h2>
                <div className="h-1.5 w-16 bg-gray-200 mx-auto mt-4 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {contactInfo.map((item, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-2xl border border-gray-100 p-6 text-center hover:shadow-lg hover:shadow-pink-100/50 transition-all duration-300 hover:-translate-y-1 group"
                    >
                        <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center text-[#D4145A] text-xl mx-auto mb-4 group-hover:bg-[#D4145A] group-hover:text-white transition-colors duration-300">
                            {item.icon}
                        </div>
                        <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide mb-2">{item.title}</h3>
                        <p className="font-semibold text-gray-700 text-sm">{item.detail}</p>
                        <p className="text-xs text-gray-400 mt-1">{item.sub}</p>
                    </div>
                ))}
            </div>

            {/* Map Placeholder */}
            {settings.map_iframe_url && (
                <div className="mt-10 rounded-3xl overflow-hidden border border-gray-100 shadow-sm h-64 md:h-80">
                    <iframe
                        src={settings.map_iframe_url}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Ubicación Florería Rosmery"
                    />
                </div>
            )}
        </section>
    );
}
