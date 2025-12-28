"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabase";
import { FiUser, FiMail, FiSave, FiAlertCircle, FiCheckCircle, FiLoader } from "react-icons/fi";
import Image from "next/image";

export default function PerfilPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                fullName: user.user_metadata?.full_name || "",
                email: user.email || "",
            });
        } else {
            // Si intenta entrar sin estar logueado, redirigir
            // Nota: Esto podría moverse a un middleware o un componente de protección de rutas
            const checkSession = async () => {
                const { data: { session } } = await supabase.auth.getSession();
                if (!session) {
                    router.push("/iniciosesion");
                }
            };
            checkSession();
        }
    }, [user, router]);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const { error } = await supabase.auth.updateUser({
                data: { full_name: formData.fullName },
            });

            if (error) throw error;

            setMessage({ type: 'success', text: "Perfil actualizado correctamente" });
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || "Error al actualizar perfil" });
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <FiLoader className="animate-spin text-4xl text-[#D4145A]" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                    {/* Cabecera del Perfil con degradado */}
                    <div className="bg-gradient-to-r from-[#FF6F91] to-[#D4145A] px-8 py-10 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-[#D4145A] text-4xl font-bold shadow-lg">
                                {formData.fullName.charAt(0).toUpperCase() || <FiUser />}
                            </div>
                            <div className="text-center md:text-left">
                                <h1 className="text-3xl font-bold">Hola, {formData.fullName.split(' ')[0]}</h1>
                                <p className="text-white/80 mt-1">Administra tu información personal</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 md:p-12">
                        {message && (
                            <div className={`mb-8 p-4 rounded-xl flex items-center gap-3 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                                {message.type === 'success' ? <FiCheckCircle size={20} /> : <FiAlertCircle size={20} />}
                                <span className="font-medium">{message.text}</span>
                            </div>
                        )}

                        <form onSubmit={handleUpdateProfile} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Campo Email (Solo lectura) */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                        <FiMail className="text-[#FF6F91]" /> Correo Electrónico
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            value={formData.email}
                                            disabled
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 font-medium cursor-not-allowed"
                                        />
                                        <span className="absolute right-4 top-3.5 text-xs text-gray-400 font-semibold bg-gray-100 px-2 py-0.5 rounded">
                                            No editable
                                        </span>
                                    </div>
                                </div>

                                {/* Campo Nombre */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                        <FiUser className="text-[#FF6F91]" /> Nombre Completo
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#FF6F91] focus:border-transparent transition-all"
                                        placeholder="Tu nombre completo"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`flex items-center gap-2 px-8 py-3 bg-[#D4145A] text-white rounded-xl font-bold hover:bg-[#B0124A] transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-[#D4145A]/20 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {loading ? <FiLoader className="animate-spin" /> : <FiSave />}
                                    {loading ? 'Guardando...' : 'Guardar Cambios'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Sección decorativa extra */}
                <div className="mt-8 text-center text-gray-500 text-sm">
                    <p>En Florería Rosmery protegemos tus datos personales.</p>
                </div>
            </div>
        </div>
    );
}
