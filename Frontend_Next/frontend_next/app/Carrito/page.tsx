"use client";

import React from "react";
import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";

export default function CarritoPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Mi Carrito</h1>

                <div className="bg-white rounded-2xl shadow-sm p-8 flex flex-col items-center justify-center space-y-4">
                    <FiShoppingBag size={64} className="text-gray-300" />
                    <p className="text-xl text-gray-500">Tu carrito está vacío</p>
                    <Link
                        href="/"
                        className="mt-4 px-6 py-2 bg-[#D4145A] text-white rounded-full font-bold hover:bg-[#B0124A] transition-colors"
                    >
                        Volver al catálogo
                    </Link>
                </div>
            </div>
        </div>
    );
}
