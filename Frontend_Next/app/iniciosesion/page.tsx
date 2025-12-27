"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowLeft } from "react-icons/fi";

export default function InicioSesionPage() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Formulario enviado");
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Imagen de fondo optimizada con Next.js */}
            <Image
                src="/img/global/FondoInicioSesion.jpg"
                alt="Fondo de inicio de sesión"
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
                    <span className="text-lg">Volver al inicio</span>
                </Link>
            </div>

            <div className="max-w-md w-full space-y-8 p-6 md:p-10 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl relative z-10">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Inicio de Sesión
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Bienvenido de nuevo a Florería Rosmery
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px space-y-4">
                        <div>
                            <label htmlFor="user" className="block text-sm font-semibold text-gray-700 mb-1">Usuario o Correo</label>
                            <input
                                id="user"
                                name="user"
                                type="text"
                                required
                                className="appearance-none rounded-xl relative block w-full px-3 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF6F91] focus:border-transparent transition-all sm:text-sm"
                                placeholder="Tu nombre de usuario"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">Contraseña</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-xl relative block w-full px-3 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF6F91] focus:border-transparent transition-all sm:text-sm"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-[#D4145A] focus:ring-[#FF6F91] border-gray-300 rounded" />
                            <label htmlFor="remember-me" className="ml-2 block text-gray-900">Recordarme</label>
                        </div>
                        <Link href="#" className="font-medium text-[#D4145A] hover:text-[#B0124A]">¿Olvidaste tu contraseña?</Link>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-[#D4145A] hover:bg-[#B0124A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4145A] transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-[#D4145A]/20"
                        >
                            Iniciar Sesión
                        </button>
                    </div>

                    <div className="border-t border-gray-100 pt-6 text-center">
                        <p className="text-sm text-gray-600">
                            ¿No tienes una cuenta?{" "}
                            <Link href="/registro" className="font-bold text-[#D4145A] hover:text-[#B0124A] transition-colors underline-offset-4 hover:underline">
                                Regístrate aquí
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
