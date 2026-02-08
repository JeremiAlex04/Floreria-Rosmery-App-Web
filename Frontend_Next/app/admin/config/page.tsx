"use client";

import React, { useState } from "react";
import { FiDatabase, FiRefreshCw, FiAlertTriangle } from "react-icons/fi";
import { seedProducts } from "../../../lib/seed";

export default function ConfigPage() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<string | null>(null);

    const handleSeed = async () => {
        if (!confirm("Esto subirá los 48 productos del archivo estático a tu base de datos de Supabase. ¿Continuar?")) return;

        setLoading(true);
        setStatus("Procesando...");

        try {
            const result = await seedProducts();
            if (result.success) {
                setStatus(`¡Éxito! Se migraron ${result.count} productos.`);
            } else {
                setStatus("Error: " + (result.error as any).message);
            }
        } catch (err: any) {
            setStatus("Error inesperado: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-black text-gray-800 tracking-tight">Configuración del Sistema</h1>
                <p className="text-gray-500 font-medium">Gestiona los aspectos internos de la plataforma</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8">
                <div className="w-16 h-16 bg-pink-50 text-[#D4145A] rounded-2xl flex items-center justify-center text-3xl shrink-0">
                    <FiDatabase />
                </div>
                <div className="flex-1 space-y-2">
                    <h2 className="text-xl font-bold text-gray-800">Migración de Datos</h2>
                    <p className="text-gray-500 text-sm max-w-xl">
                        Sincroniza los productos desde el archivo estático local (`API_Plantas.ts`) hacia tu base de datos real en Supabase.
                    </p>
                    {status && (
                        <div className={`p-4 rounded-xl text-sm font-bold ${status.includes('Error') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                            {status}
                        </div>
                    )}
                </div>
                <button
                    onClick={handleSeed}
                    disabled={loading}
                    className="flex items-center gap-2 bg-[#D4145A] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-[#B0124A] transition-all shadow-lg shadow-[#D4145A]/20 disabled:opacity-50"
                >
                    {loading ? <FiRefreshCw className="animate-spin" /> : <FiDatabase />}
                    <span>Migrar Productos</span>
                </button>
            </div>

            <div className="bg-orange-50 p-8 rounded-3xl border border-orange-100 flex gap-6 items-start">
                <FiAlertTriangle className="text-orange-500 text-2xl shrink-0 mt-1" />
                <div className="space-y-1">
                    <h3 className="font-bold text-orange-800">Nota de Seguridad</h3>
                    <p className="text-orange-700/80 text-sm leading-relaxed">
                        Asegúrate de haber ejecutado primero el script SQL en tu panel de Supabase para que las tablas existan antes de intentar la migración.
                    </p>
                </div>
            </div>
        </div>
    );
}
