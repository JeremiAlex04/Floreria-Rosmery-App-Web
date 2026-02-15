"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiShoppingBag, FiTrash2, FiMinus, FiPlus, FiArrowLeft } from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import { supabase } from "@/lib/supabase";
import { useAuth } from "../../context/AuthContext";

export default function CarritoPage() {
    const router = useRouter();
    const { cart, removeFromCart, addToCart, decreaseQuantity, totalPrice, totalItems, clearCart } = useCart();
    const { user } = useAuth();
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<string>("Yape");
    const [voucherFile, setVoucherFile] = useState<File | null>(null);
    const [voucherPreview, setVoucherPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setVoucherFile(file);
            setVoucherPreview(URL.createObjectURL(file));
        }
    };

    const handleCheckout = async () => {
        if (cart.length === 0) return;
        if (!user) {
            alert("Debes iniciar sesión para realizar un pedido.");
            return;
        }
        if (!voucherFile) {
            alert("Por favor, sube una captura de tu comprobante de pago.");
            return;
        }

        setIsCheckingOut(true);
        try {
            // 1. Subir Voucher a Supabase Storage
            const fileExt = voucherFile.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `vouchers/${Date.now()}_${fileName}`;

            const { error: uploadError, data: uploadData } = await supabase.storage
                .from('vouchers')
                .upload(filePath, voucherFile);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('vouchers')
                .getPublicUrl(filePath);

            // 2. Crear Pedido en Supabase
            const { data: order, error: orderError } = await supabase
                .from('orders')
                .insert({
                    user_id: user.id,
                    total: totalPrice,
                    status: 'Pendiente',
                    payment_method: paymentMethod,
                    voucher_url: publicUrl,
                    shipping_address: {}, // Implementar formulario de dirección después
                    contact_info: { email: user.email }
                })
                .select()
                .single();

            if (orderError) throw orderError;

            // 3. Crear Items del Pedido
            const orderItems = cart.map(item => ({
                order_id: order.id,
                product_id: item.id,
                quantity: item.quantity,
                price_at_purchase: item.precio
            }));

            const { error: itemsError } = await supabase
                .from('order_items')
                .insert(orderItems);

            if (itemsError) throw itemsError;

            alert("¡Pedido realizado con éxito! Un administrador validará tu pago pronto.");
            clearCart();
            router.push("/perfil"); // Redirigir al perfil del usuario

        } catch (error: any) {
            console.error("Checkout error:", error);
            alert("Hubo un problema al procesar el pedido: " + error.message);
        } finally {
            setIsCheckingOut(false);
        }
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
                                <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 items-center sm:items-stretch">
                                    <div className="w-24 h-24 relative rounded-xl overflow-hidden flex-shrink-0">
                                        <Image src={item.imagen} alt={item.nombre} fill className="object-cover" />
                                    </div>
                                    <div className="flex-grow min-w-0 w-full sm:w-auto text-center sm:text-left">
                                        <h3 className="font-bold text-gray-800 truncate">{item.nombre}</h3>
                                        <p className="text-sm text-gray-400">{item.categoria}</p>
                                        <div className="flex items-center justify-between mt-2">
                                            <p className="font-black text-[#D4145A]">S/ {item.precio.toFixed(2)}</p>

                                            {/* Controles de Cantidad */}
                                            <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl border border-gray-100">
                                                <button
                                                    onClick={() => decreaseQuantity(item.id)}
                                                    className="p-1.5 hover:bg-white hover:text-[#D4145A] rounded-lg transition-all text-gray-400"
                                                >
                                                    <FiMinus size={16} />
                                                </button>
                                                <span className="w-8 text-center font-bold text-gray-700">{item.quantity}</span>
                                                <button
                                                    onClick={() => addToCart(item)}
                                                    className="p-1.5 hover:bg-white hover:text-[#D4145A] rounded-lg transition-all text-gray-400"
                                                >
                                                    <FiPlus size={16} />
                                                </button>
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

                        <div className="lg:col-span-1 space-y-6">
                            {/* Selector de Pago */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h2 className="text-lg font-bold text-gray-800 mb-4">Método de Pago</h2>
                                <div className="space-y-3">
                                    {["Yape", "Plin", "Transferencia BCP"].map(method => (
                                        <label key={method} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${paymentMethod === method ? 'border-[#D4145A] bg-pink-50' : 'border-gray-100'}`}>
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                className="accent-[#D4145A]"
                                                checked={paymentMethod === method}
                                                onChange={() => setPaymentMethod(method)}
                                            />
                                            <span className={`font-bold text-sm ${paymentMethod === method ? 'text-[#D4145A]' : 'text-gray-600'}`}>{method}</span>
                                        </label>
                                    ))}
                                </div>

                                <div className="mt-6 pt-6 border-t border-gray-100 italic text-[10px] text-gray-400">
                                    <p>Envía tu pago al: **995 699 910** a nombre de Florería Rosmery.</p>
                                </div>
                            </div>

                            {/* Subir Voucher */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h2 className="text-lg font-bold text-gray-800 mb-4">Comprobante de Pago</h2>
                                <div className="relative group">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    />
                                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center gap-2 group-hover:border-[#D4145A]/30 transition-colors">
                                        {voucherPreview ? (
                                            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                                                <Image src={voucherPreview} alt="Preview" fill className="object-cover" />
                                            </div>
                                        ) : (
                                            <>
                                                <div className="w-10 h-10 bg-gray-50 flex items-center justify-center rounded-full text-gray-400">
                                                    <FiPlus />
                                                </div>
                                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Subir captura del pago</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Resumen */}
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
                                <button
                                    onClick={handleCheckout}
                                    disabled={isCheckingOut}
                                    className="w-full bg-[#D4145A] text-white py-4 rounded-xl font-bold hover:bg-[#B0124A] transition-all shadow-lg hover:shadow-[#D4145A]/30 active:scale-95 mb-4 disabled:opacity-50"
                                >
                                    {isCheckingOut ? "Procesando..." : "Confirmar Pedido"}
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
