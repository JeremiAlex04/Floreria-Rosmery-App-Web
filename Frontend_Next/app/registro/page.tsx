"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiUser, FiMail, FiLock, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { supabase } from "../../lib/supabase";

export default function RegistroPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error: signUpError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        full_name: formData.name,
                    },
                },
            });

            if (signUpError) throw signUpError;

            setSuccess(true);
            // Redirigir después de un momento
            setTimeout(() => {
                router.push("/iniciosesion");
            }, 3000);

        } catch (err: any) {
            setError(err.message || "Ocurrió un error al registrarse");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Imagen de fondo optimizada con Next.js */}
            <Image
                src="/img/global/FondoInicioSesion.jpg"
                alt="Fondo de registro"
                fill
                priority
                className="object-cover z-0"
                quality={85}
            />

            {/* Overlay para mejorar legibilidad */}
            <div className="absolute inset-0 bg-black/40 z-0"></div>

            {/* Botón para volver */}
            <div className="absolute top-8 left-8 z-10">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-white hover:text-[#FF6F91] transition-colors font-bold drop-shadow-md"
                >
                    <FiArrowLeft size={24} />
                    <span className="text-lg text-white">Volver al inicio</span>
                </Link>
            </div>

            <div className="max-w-md w-full space-y-8 p-6 md:p-10 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl relative z-10">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
                        Crea tu Cuenta
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Únete a Florería Rosmery y envía amor
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-center gap-3 text-red-700 animate-shake">
                        <FiAlertCircle className="shrink-0" />
                        <p className="text-xs font-medium">{error}</p>
                    </div>
                )}

                {success && (
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg flex items-center gap-3 text-green-700">
                        <FiCheckCircle className="shrink-0" />
                        <p className="text-xs font-medium">¡Registro exitoso! Por favor revisa tu correo para confirmar (si está activado).</p>
                    </div>
                )}

                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
                                <FiUser className="text-[#FF6F91]" /> Nombre Completo
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF6F91] focus:border-transparent transition-all sm:text-sm"
                                placeholder="Ej. Juan Pérez"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
                                <FiMail className="text-[#FF6F91]" /> Correo Electrónico
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF6F91] focus:border-transparent transition-all sm:text-sm"
                                placeholder="correo@ejemplo.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
                                <FiLock className="text-[#FF6F91]" /> Contraseña
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF6F91] focus:border-transparent transition-all sm:text-sm"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-[#D4145A] hover:bg-[#B0124A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4145A] transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-[#D4145A]/20 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? "Registrando..." : "Registrarme"}
                        </button>
                    </div>

                    <div className="border-t border-gray-100 pt-6 text-center">
                        <p className="text-sm text-gray-600">
                            ¿Ya tienes una cuenta?{" "}
                            <Link href="/iniciosesion" className="font-bold text-[#D4145A] hover:text-[#B0124A] transition-colors underline-offset-4 hover:underline">
                                Inicia sesión aquí
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
