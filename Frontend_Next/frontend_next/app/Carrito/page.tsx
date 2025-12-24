"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiShoppingBag, FiTrash2, FiMinus, FiPlus, FiArrowLeft } from "react-icons/fi";
import { useCart } from "../../context/CartContext";

export default function CarritoPage() {
    const { cart, removeFromCart, addToCart, totalPrice, totalItems } = useCart();

    const handleRemoveOne = (id: number) => {
        // Podríamos implementar una función para reducir cantidad, 
        // pero por ahora addToCart aumentará y removeFromCart quitará todo el rubro.
        removeFromCart(id);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/" className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-600">
                        <FiArrowLeft size={24} />
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">Mi Carrito ({totalItems})</h1>
                </div>

                {cart.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm p-16 flex flex-col items-center justify-center space-y-6">
                        <div className="p-6 bg-gray-50 rounded-full">
                            <FiShoppingBag size={64} className="text-gray-300" />
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-gray-800">Tu carrito está vacío</p>
                            <p className="text-gray-500">¡Parece que aún no has añadido nada!</p>
                        </div>
                        <Link
                            href="/"
                            className="px-8 py-3 bg-[#D4145A] text-white rounded-xl font-bold hover:bg-[#B0124A] transition-all transform hover:scale-105 active:scale-95 shadow-lg"
                        >
                            Explorar catálogo
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Lista de Productos */}
                        <div className="lg:col-span-2 space-y-4">
                            {cart.map((item) => (
                                <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 items-center">
                                    <div className="w-24 h-24 relative rounded-xl overflow-hidden flex-shrink-0">
                                        <Image src={item.imagen} alt={item.nombre} fill className="object-cover" />
                                    </div>
                                    <div className="flex-grow min-w-0">
                                        <h3 className="font-bold text-gray-800 truncate">{item.nombre}</h3>
                                        <p className="text-sm text-gray-400">{item.categoria}</p>
                                        <div className="flex items-center justify-between mt-2">
                                            <p className="font-black text-[#D4145A]">S/ {item.precio.toFixed(2)}</p>
                                            <div className="flex items-center gap-3 bg-gray-50 px-3 py-1 rounded-lg">
                                                <span className="text-sm font-bold text-gray-600">Cant: {item.quantity}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="p-3 text-gray-300 hover:text-red-500 transition-colors"
                                        title="Eliminar"
                                    >
                                        <FiTrash2 size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Resumen */}
                        <div className="lg:col-span-1">
                            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 sticky top-24">
                                <h2 className="text-xl font-bold text-gray-800 mb-6">Resumen de compra</h2>
                                <div className="space-y-4 mb-6 text-gray-600">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>S/ {totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Envío</span>
                                        <span className="text-green-500 font-bold">Gratis</span>
                                    </div>
                                    <div className="h-px bg-gray-100 my-4"></div>
                                    <div className="flex justify-between text-xl font-black text-gray-900">
                                        <span>Total</span>
                                        <span>S/ {totalPrice.toFixed(2)}</span>
                                    </div>
                                </div>
                                <button className="w-full bg-[#D4145A] text-white py-4 rounded-xl font-bold hover:bg-[#B0124A] transition-all shadow-lg hover:shadow-[#D4145A]/30 active:scale-95 mb-4">
                                    Continuar compra
                                </button>
                                <Link href="/" className="block text-center text-sm font-bold text-[#FF6F91] hover:text-[#D4145A] transition-colors">
                                    Seguir comprando
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
