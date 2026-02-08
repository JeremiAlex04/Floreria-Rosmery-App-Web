"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
    const phoneNumber = "51995699910";
    const message = "Hola _Florería Rosmery_ 🌹, me gustaría realizar una consulta.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-[60] group flex items-center gap-3"
            aria-label="Contactar por WhatsApp"
        >
            <div className="bg-white text-gray-800 px-4 py-2 rounded-xl shadow-xl border border-gray-100 opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap hidden md:block">
                <p className="font-bold text-sm">¿En qué podemos ayudarte?</p>
            </div>

            <div className="relative">
                <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping"></span>
                <div className="relative bg-[#25D366] text-white p-4 rounded-full shadow-2xl transition-transform duration-300 hover:scale-110 active:scale-95 flex items-center justify-center">
                    <FaWhatsapp size={32} />
                </div>
            </div>
        </a>
    );
}
