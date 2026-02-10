"use client";

import { useState } from "react";
import { FiX, FiSearch, FiTruck, FiCheckCircle, FiPackage, FiClock } from "react-icons/fi";
import { supabase } from "../../lib/supabase";

interface OrderTrackingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function OrderTrackingModal({ isOpen, onClose }: OrderTrackingModalProps) {
    const [orderId, setOrderId] = useState("");
    const [status, setStatus] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleTrack = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setStatus(null);

        try {
            // Validar formato UUID simple (opcional)
            if (orderId.length < 5) {
                setError("El código de pedido parece muy corto.");
                setLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from("orders")
                .select("status")
                .eq("id", orderId)
                .single();

            if (error || !data) {
                setError("No encontramos un pedido con ese código.");
            } else {
                setStatus(data.status);
            }
        } catch (err) {
            setError("Error al buscar el pedido.");
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = (currentStatus: string) => {
        switch (currentStatus) {
            case "Pendiente": return <FiClock className="text-yellow-500 animate-pulse" size={40} />;
            case "Preparando": return <FiPackage className="text-blue-500 animate-bounce" size={40} />;
            case "En Camino": return <FiTruck className="text-purple-500 animate-pulse" size={40} />;
            case "Entregado": return <FiCheckCircle className="text-green-500" size={40} />;
            default: return <FiSearch className="text-gray-400" size={40} />;
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
            <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <FiX size={24} />
                </button>

                <div className="bg-[#D4145A] p-6 text-white text-center">
                    <FiTruck size={40} className="mx-auto mb-2 opacity-80" />
                    <h2 className="text-2xl font-black uppercase tracking-tight">Rastrea tu Pedido</h2>
                    <p className="text-pink-100 text-sm">Ingresa tu código de seguimiento</p>
                </div>

                <div className="p-6">
                    <form onSubmit={handleTrack} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Código de Pedido (ID)</label>
                            <input
                                type="text"
                                value={orderId}
                                onChange={(e) => setOrderId(e.target.value)}
                                placeholder="Ej: 550e8400-e29b..."
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D4145A]/20 focus:border-[#D4145A] outline-none transition-all font-mono text-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#D4145A] text-white py-3 rounded-xl font-bold hover:bg-[#B0124A] transition-all disabled:opacity-50 flex justify-center items-center gap-2"
                        >
                            {loading ? <div className="spinner-sm" /> : <FiSearch />}
                            Rastrear Ahora
                        </button>
                    </form>

                    {error && (
                        <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold text-center animate-shake">
                            {error}
                        </div>
                    )}

                    {status && (
                        <div className="mt-6 text-center animate-slideUp">
                            <div className="inline-flex justify-center items-center w-20 h-20 bg-gray-50 rounded-full mb-3 shadow-inner">
                                {getStatusIcon(status)}
                            </div>
                            <h3 className="text-lg font-black text-gray-800">Estado Actual:</h3>
                            <div className="inline-block px-4 py-1.5 rounded-full bg-[#D4145A]/10 text-[#D4145A] font-bold mt-1 text-lg uppercase tracking-wide">
                                {status}
                            </div>
                            <p className="text-xs text-gray-400 mt-4 max-w-xs mx-auto">
                                Si tienes dudas, contáctanos al WhatsApp.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
