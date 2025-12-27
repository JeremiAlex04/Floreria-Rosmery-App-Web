"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowLeft, FiUser, FiMail, FiLock } from "react-icons/fi";

export default function RegistroPage() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Registro enviado");
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

            <div className="max-w-md w-full space-y-8 p-6 md:p-10 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl relative z-10 transition-all duration-300">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
                        Crea tu Cuenta
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Únete a Florería Rosmery y envía amor
                    </p>
                </div>
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
                                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF6F91] focus:border-transparent transition-all sm:text-sm"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-[#D4145A] hover:bg-[#B0124A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4145A] transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-[#D4145A]/20"
                        >
                            Registrarme
                        </button>
                    </div>

                    <div className="text-center mt-4">
                        <p className="text-xs text-gray-500">
                            Al registrarte, aceptas nuestros{" "}
                            <Link href="/terminos" className="text-[#D4145A] hover:underline">Términos</Link> y{" "}
                            <Link href="/politicas" className="text-[#D4145A] hover:underline">Privacidad</Link>.
                        </p>
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
