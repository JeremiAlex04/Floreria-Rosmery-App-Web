"use client";

import { FiTruck, FiShield, FiSmile, FiClock } from "react-icons/fi";

const beneficios = [
    {
        icon: <FiTruck className="text-3xl text-[#D4145A]" />,
        title: "Envío Gratis",
        description: "En pedidos mayores a S/ 150",
    },
    {
        icon: <FiShield className="text-3xl text-[#D4145A]" />,
        title: "Pago Seguro",
        description: "100% protegido con cifrado SSL",
    },
    {
        icon: <FiSmile className="text-3xl text-[#D4145A]" />,
        title: "Flores Frescas",
        description: "Directo del campo a tu hogar",
    },
    {
        icon: <FiClock className="text-3xl text-[#D4145A]" />,
        title: "Entrega Hoy",
        description: "Pide antes de las 2:00 PM",
    },
];

export default function Beneficios() {
    return (
        <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {beneficios.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-5 p-6 rounded-2xl border border-gray-50 hover:shadow-xl hover:shadow-pink-500/5 transition-all duration-300 group"
                        >
                            <div className="p-4 bg-pink-50 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                {item.icon}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 text-lg uppercase tracking-tight">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-400 font-medium">
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
