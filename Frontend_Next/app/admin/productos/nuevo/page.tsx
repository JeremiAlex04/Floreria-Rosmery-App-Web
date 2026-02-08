"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiChevronLeft, FiSave, FiImage, FiTag, FiDollarSign, FiLayers } from "react-icons/fi";
import Link from "next/link";
import { supabase } from "../../../../lib/supabase";

const CATEGORIES = [
    'Aniversario', 'Arreglos en Caja', 'Bodas', 'Centros de Mesa', 'Condolencias',
    'Cumpleaños', 'Día del Padre', 'Día de la Madre', 'Girasoles', 'Graduaciones',
    'Orquídeas', 'Ramos de Mano', 'Ramos Premium', 'Rosas', 'San Valentín', 'Tulipanes'
];

export default function NewProductPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        nombre: "",
        precio: "",
        categoria: "Aniversario",
        imagen: "",
        popular: false,
        stock: "100",
        descripcion: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.from("products").insert([
            {
                ...formData,
                precio: parseFloat(formData.precio),
                stock: parseInt(formData.stock),
            },
        ]);

        if (error) {
            alert("Error al guardar: " + error.message);
        } else {
            router.push("/admin/productos");
        }
        setLoading(false);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/productos"
                    className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-500 hover:text-[#D4145A] transition-all shadow-sm"
                >
                    <FiChevronLeft size={24} />
                </Link>
                <div>
                    <h1 className="text-3xl font-black text-gray-800 tracking-tight">Nuevo Producto</h1>
                    <p className="text-gray-500 font-medium">Completa los datos para el nuevo arreglo</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-black text-gray-700 uppercase tracking-widest flex items-center gap-2">
                                <FiTag className="text-[#D4145A]" /> Nombre del Producto
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="Ej: Ramo Amor Eterno"
                                className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#D4145A]/20 focus:bg-white rounded-2xl outline-none transition-all font-bold text-gray-800"
                                value={formData.nombre}
                                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-black text-gray-700 uppercase tracking-widest flex items-center gap-2">
                                <FiLayers className="text-[#D4145A]" /> Descripción
                            </label>
                            <textarea
                                rows={4}
                                placeholder="Describe los detalles de este arreglo floral..."
                                className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#D4145A]/20 focus:bg-white rounded-2xl outline-none transition-all font-medium text-gray-700"
                                value={formData.descripcion}
                                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                            ></textarea>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-black text-gray-700 uppercase tracking-widest flex items-center gap-2">
                                    <FiDollarSign className="text-[#D4145A]" /> Precio (S/)
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    required
                                    placeholder="0.00"
                                    className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#D4145A]/20 focus:bg-white rounded-2xl outline-none transition-all font-bold text-gray-800"
                                    value={formData.precio}
                                    onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-black text-gray-700 uppercase tracking-widest flex items-center gap-2">
                                    Stock Inicial
                                </label>
                                <input
                                    type="number"
                                    required
                                    className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#D4145A]/20 focus:bg-white rounded-2xl outline-none transition-all font-bold text-gray-800"
                                    value={formData.stock}
                                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Context */}
                <div className="space-y-6">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                        <div className="space-y-4">
                            <label className="text-sm font-black text-gray-700 uppercase tracking-widest">Organización</label>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase">Categoría</label>
                                <select
                                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-transparent focus:border-[#D4145A]/20 outline-none font-bold text-gray-800"
                                    value={formData.categoria}
                                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                                >
                                    {CATEGORIES.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <label className="flex items-center gap-3 cursor-pointer p-4 bg-gray-50 rounded-2xl hover:bg-pink-50 transition-all select-none group">
                                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${formData.popular ? 'bg-[#D4145A] border-[#D4145A]' : 'border-gray-300'}`}>
                                    {formData.popular && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                </div>
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={formData.popular}
                                    onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                                />
                                <span className="font-bold text-gray-600 group-hover:text-[#D4145A]">Marcar como Popular</span>
                            </label>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-4">
                        <label className="text-sm font-black text-gray-700 uppercase tracking-widest flex items-center gap-2">
                            <FiImage className="text-[#D4145A]" /> Imagen
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="URL de la imagen (ej: /img/1.jpg)"
                            className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-[#D4145A]/20 focus:bg-white rounded-xl outline-none font-medium text-gray-700 text-sm"
                            value={formData.imagen}
                            onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
                        />
                        <p className="text-[10px] text-gray-400 leading-relaxed font-medium">Por ahora usa rutas locales o URLs externas. Pronto agregaremos subida de fotos.</p>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 bg-[#D4145A] text-white py-5 rounded-3xl font-black uppercase tracking-widest hover:bg-[#B0124A] transition-all shadow-xl shadow-[#D4145A]/30 disabled:opacity-50"
                    >
                        {loading ? "Guardando..." : (
                            <>
                                <FiSave size={20} />
                                <span>Publicar Flor</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
