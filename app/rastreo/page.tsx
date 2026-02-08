"use client";
import React, { useState } from "react";
import { FiSearch, FiPackage, FiTruck, FiCheck, FiInfo } from "react-icons/fi";

const stepsOrder = [
    { label: "Recibido", icon: <FiPackage /> },
    { label: "Preparando", icon: <FiCheck /> },
    { label: "En Camino", icon: <FiTruck /> },
    { label: "Entregado", icon: <FiCheck /> },
];

export default function RastreoPage() {
    const [orderId, setOrderId] = useState("");
    const [status, setStatus] = useState<number | null>(null); // 0-3 index based on steps
    const [loading, setLoading] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulación de búsqueda
        setTimeout(() => {
            setLoading(false);
            setStatus(2); // Mock: En Camino
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="bg-[#1a1a1a] p-8 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-[#D4145A] rounded-full filter blur-3xl opacity-20 -translate-y-1/2 -translate-x-1/2"></div>
                    <h1 className="text-3xl font-black text-white mb-2 relative z-10">Rastrea tu Pedido</h1>
                    <p className="text-gray-400 text-sm relative z-10">Ingresa tu número de orden para ver el estado</p>
                </div>

                <div className="p-8 md:p-12">
                    <form onSubmit={handleSearch} className="mb-10">
                        <div className="relative">
                            <input
                                type="text"
                                value={orderId}
                                onChange={(e) => setOrderId(e.target.value)}
                                placeholder="Ej: ORD-12345"
                                className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-gray-100 focus:border-[#D4145A] rounded-2xl outline-none font-bold text-gray-800 transition-all placeholder:font-normal placeholder:text-gray-400"
                            />
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                        </div>
                        <button
                            disabled={!orderId || loading}
                            className="w-full mt-4 bg-[#D4145A] hover:bg-[#B0124A] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl transition-all shadow-lg hover:shadow-xl"
                        >
                            {loading ? "Buscando..." : "Ver Estado"}
                        </button>
                    </form>

                    {status !== null && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex justify-between relative mb-8">
                                {/* Connecting Line */}
                                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-100 -z-10 -translate-y-1/2 rounded-full"></div>
                                <div
                                    className="absolute top-1/2 left-0 h-1 bg-[#D4145A] -z-10 -translate-y-1/2 rounded-full transition-all duration-1000"
                                    style={{ width: `${(status / (stepsOrder.length - 1)) * 100}%` }}
                                ></div>

                                {stepsOrder.map((step, idx) => (
                                    <div key={idx} className="flex flex-col items-center gap-2 bg-white px-2">
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border-4 transition-all duration-500 ${idx <= status ? "border-[#D4145A] bg-[#D4145A] text-white" : "border-gray-100 bg-white text-gray-300"
                                                }`}
                                        >
                                            {step.icon}
                                        </div>
                                        <span className={`text-[10px] font-bold uppercase tracking-wider ${idx <= status ? "text-[#D4145A]" : "text-gray-300"
                                            }`}>
                                            {step.label}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-pink-50 border border-pink-100 rounded-xl p-4 flex gap-4 items-start">
                                <FiInfo className="text-[#D4145A] text-xl mt-0.5 shrink-0" />
                                <div>
                                    <h4 className="font-bold text-gray-800 text-sm">Tu pedido está en camino</h4>
                                    <p className="text-gray-600 text-xs mt-1">El repartidor está cerca de tu zona. Por favor mantente atento a tu teléfono.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
