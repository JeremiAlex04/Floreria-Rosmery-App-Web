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

            <div className="max-w-md w-full space-y-8 p-10 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl relative z-10">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Inicio de Sesión
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Bienvenido de nuevo a Florería Rosmery
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mb-4">
                            <label htmlFor="user" className="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
                            <input
                                id="user"
                                name="user"
                                type="text"
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#FF6F91] focus:border-[#FF6F91] focus:z-10 sm:text-sm"
                                placeholder="Tu nombre de usuario"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#FF6F91] focus:border-[#FF6F91] focus:z-10 sm:text-sm"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#D4145A] hover:bg-[#B0124A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4145A] transition-colors"
                        >
                            Iniciar Sesión
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
