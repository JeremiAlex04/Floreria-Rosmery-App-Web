"use client";

import { FiTruck, FiShield, FiSmile, FiClock } from "react-icons/fi";
import { useScrollReveal } from "../hooks/useScrollReveal";

const beneficios = [
    {
        icon: <FiTruck className="text-2xl" />,
        title: "Envío Gratis",
        description: "En pedidos mayores a S/ 150",
    },
    {
        icon: <FiShield className="text-2xl" />,
        title: "Pago Seguro",
        description: "100% protegido con cifrado SSL",
    },
    {
        icon: <FiSmile className="text-2xl" />,
        title: "Flores Frescas",
        description: "Directo del campo a tu hogar",
    },
    {
        icon: <FiClock className="text-2xl" />,
        title: "Entrega Hoy",
        description: "Pide antes de las 2:00 PM",
    },
];

export default function Beneficios() {
    const { ref, isVisible } = useScrollReveal();

    return (
        <section
            ref={ref}
            className={`py-10 bg-white transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {beneficios.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-4 p-5 rounded-2xl hover:bg-pink-50/50 transition-all duration-300 group"
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <div className="p-3 bg-pink-50 rounded-xl text-[#D4145A] group-hover:bg-[#D4145A] group-hover:text-white transition-colors duration-300 flex-shrink-0">
                                {item.icon}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 text-sm">
                                    {item.title}
                                </h3>
                                <p className="text-xs text-gray-400 font-medium mt-0.5">
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
