"use client";

import { FiSearch, FiCreditCard, FiSmile } from "react-icons/fi";
import { useScrollReveal } from "../hooks/useScrollReveal";

const steps = [
    {
        stage: "Selección",
        icon: <FiSearch className="text-xl text-[#D4145A]" />,
        title: "Elige tu Arreglo",
        description: "Explora nuestra colección floral por ocasión, tipo de flor o estilo y personaliza tu dedicatoria.",
    },
    {
        stage: "Reserva",
        icon: <FiCreditCard className="text-xl text-[#D4145A]" />,
        title: "Pago Fácil y Seguro",
        description: "Completa tu pedido al instante con tarjeta, Yape, Plin o transferencia bancaria protegida.",
    },
    {
        stage: "Entrega",
        icon: <FiSmile className="text-xl text-[#D4145A]" />,
        title: "Momento Especial",
        description: "Cuidamos cada detalle de transporte para que tus flores lleguen frescas y radiantes al destinatario.",
    },
];

export default function ComoComprar() {
    const { ref, isVisible } = useScrollReveal();

    return (
        <section
            ref={ref}
            className={`transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)] will-change-transform ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
            <div className="text-center max-w-2xl mx-auto mb-14">
                <span className="inline-block px-4 py-1 rounded-full bg-pink-50 border border-pink-200/60 text-[#D4145A] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">
                    Proceso Artesanal
                </span>
                <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
                    ¿Cómo Preparamos tu Detalle?
                </h2>
                <p className="text-stone-500 text-sm sm:text-base mt-3 leading-relaxed">
                    Acompañamos cada pedido con dedicación, cuidando cada flor desde el cultivo hasta la entrega.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className="group relative p-3 rounded-[2.2rem] bg-stone-100/70 hover:bg-pink-100/30 ring-1 ring-stone-900/5 hover:ring-pink-300/40 transition-all duration-300 ease-[var(--ease-out-expo)] select-none"
                    >
                        <div className="relative rounded-[calc(2.2rem-0.6rem)] bg-white p-7 md:p-8 shadow-sm flex flex-col h-full text-left">
                            <div className="flex items-center justify-between mb-8">
                                <div className="w-13 h-13 rounded-2xl bg-pink-50 border border-pink-100/80 flex items-center justify-center group-hover:scale-105 group-hover:bg-[#D4145A] group-hover:text-white transition-all duration-300">
                                    {step.icon}
                                </div>
                                <span className="text-[11px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full bg-stone-50 text-stone-400 group-hover:text-[#D4145A] group-hover:bg-pink-50 transition-colors border border-stone-100">
                                    {step.stage}
                                </span>
                            </div>

                            <h3 className="font-editorial text-xl font-bold text-stone-900 mb-3 tracking-tight">
                                {step.title}
                            </h3>
                            <p className="text-stone-500 text-sm leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
