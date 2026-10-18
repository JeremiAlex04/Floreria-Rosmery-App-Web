"use client";

import { FiTruck, FiShield, FiHeart, FiClock } from "react-icons/fi";
import { useScrollReveal } from "../hooks/useScrollReveal";

const beneficios = [
    {
        icon: <FiTruck className="text-xl" />,
        title: "Envío Especializado",
        description: "Transporte cuidadoso y delicado en Lima y Callao",
    },
    {
        icon: <FiClock className="text-xl" />,
        title: "Entrega el Mismo Día",
        description: "Puntualidad y frescura garantizada en tu sorpresa",
    },
    {
        icon: <FiHeart className="text-xl" />,
        title: "Flores de Autor",
        description: "Selección artesanal directa de cultivo de alta calidad",
    },
    {
        icon: <FiShield className="text-xl" />,
        title: "Atención Dedicada",
        description: "Cada detalle preparado con cariño y soporte continuo",
    },
];

export default function Beneficios() {
    const { ref, isVisible } = useScrollReveal(0.05);

    return (
        <section
            ref={ref}
            className={`py-12 border-y border-stone-200/60 bg-white/70 backdrop-blur-sm transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)] will-change-transform ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {beneficios.map((item, index) => (
                        <div
                            key={index}
                            className="group p-5 rounded-[1.5rem] bg-stone-50/70 hover:bg-pink-50/50 border border-stone-200/50 hover:border-pink-200/60 transition-all duration-300 ease-[var(--ease-out-expo)] flex items-start gap-4 select-none"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-stone-200/60 flex items-center justify-center text-[#D4145A] group-hover:scale-105 group-hover:bg-[#D4145A] group-hover:text-white transition-all duration-300 shrink-0">
                                {item.icon}
                            </div>
                            <div className="flex flex-col">
                                <h3 className="font-bold text-stone-900 text-sm md:text-base tracking-tight">
                                    {item.title}
                                </h3>
                                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
