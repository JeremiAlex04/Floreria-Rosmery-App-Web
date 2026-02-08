"use client";

import React, { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiSave, FiImage, FiTag, FiDollarSign, FiInfo, FiLayers, FiCheck } from "react-icons/fi";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
        precio: 0,
        categoria: "Rosas",
        imagen: "",
        stock: 0,
        popular: false
    });

    const categories = [
        "Aniversario", "Arreglos en Caja", "Bodas", "Centros de Mesa", "Condolencias",
        "Cumpleaños", "Día del Padre", "Día de la Madre", "Girasoles", "Graduaciones",
        "Orquídeas", "Ramos de Mano", "Ramos Premium", "Rosas", "San Valentín", "Tulipanes"
    ];

    useEffect(() => {
        const fetchProduct = async () => {
            const { data, error } = await supabase
                .from("products")
                .select("*")
                .eq("id", id)
                .single();

            if (error) {
                console.error("Error fetching product:", error);
                alert("No se pudo cargar el producto.");
                router.push("/admin/productos");
            } else if (data) {
                setFormData({
                    nombre: data.nombre,
                    descripcion: data.descripcion || "",
                    precio: data.precio,
                    categoria: data.categoria,
                    imagen: data.imagen,
                    stock: data.stock,
                    popular: data.popular
                });
            }
            setLoading(false);
        };

        fetchProduct();
    }, [id, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const { error } = await supabase
            .from("products")
            .update(formData)
            .eq("id", id);

        if (error) {
            alert("Error al actualizar: " + error.message);
        } else {
            router.push("/admin/productos");
            router.refresh();
        }
        setSaving(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-12 h-12 border-4 border-[#D4145A] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/admin/productos" className="p-3 bg-white hover:bg-gray-50 rounded-2xl border border-gray-100 shadow-sm transition-all text-gray-500">
                    <FiArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-3xl font-black text-gray-800 tracking-tight">Editar Producto</h1>
                    <p className="text-gray-500 font-medium">Actualiza los detalles de este arreglo floral</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Panel Izquierdo: Información */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
                        <div className="flex items-center gap-2 text-[#D4145A] font-bold text-sm uppercase tracking-widest mb-2">
                            <FiInfo /> Datos Básicos
                        </div>

                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Nombre del Producto</label>
                            <input
                                type="text"
                                required
                                className="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#D4145A]/20 outline-none transition-all font-bold text-gray-700"
                                value={formData.nombre}
                                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Descripción</label>
                            <textarea
                                rows={4}
                                className="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#D4145A]/20 outline-none transition-all font-medium text-gray-600 resize-none"
                                value={formData.descripcion}
                                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Precio (S/)</label>
                                <div className="relative">
                                    <FiDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="number"
                                        step="0.01"
                                        required
                                        className="w-full pl-10 pr-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#D4145A]/20 outline-none transition-all font-black text-gray-700"
                                        value={formData.precio}
                                        onChange={(e) => setFormData({ ...formData, precio: parseFloat(e.target.value) })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Stock</label>
                                <input
                                    type="number"
                                    required
                                    className="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#D4145A]/20 outline-none transition-all font-black text-gray-700"
                                    value={formData.stock}
                                    onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-pink-50 text-[#D4145A] rounded-xl flex items-center justify-center">
                                <FiCheck />
                            </div>
                            <div>
                                <p className="font-bold text-gray-800 leading-none">Producto Popular</p>
                                <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-widest">Aparece en el inicio</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={formData.popular}
                                onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                            />
                            <div className="w-11 h-6 bg-gray-100 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4145A]"></div>
                        </label>
                    </div>
                </div>

                {/* Panel Derecho: Categoría e Imagen */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
                        <div className="flex items-center gap-2 text-[#D4145A] font-bold text-sm uppercase tracking-widest mb-2">
                            <FiLayers /> Clasificación
                        </div>
                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Categoría</label>
                            <div className="relative">
                                <FiTag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <select
                                    className="w-full pl-10 pr-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#D4145A]/20 outline-none transition-all font-bold text-gray-700 appearance-none cursor-pointer"
                                    value={formData.categoria}
                                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
                        <div className="flex items-center gap-2 text-[#D4145A] font-bold text-sm uppercase tracking-widest mb-2">
                            <FiImage /> Imagen del Producto
                        </div>
                        <div className="relative aspect-square rounded-2xl bg-gray-50 overflow-hidden border-2 border-dashed border-gray-100 group">
                            {formData.imagen ? (
                                <Image src={formData.imagen} alt="Preview" fill className="object-cover" />
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-300 gap-2">
                                    <FiImage size={48} />
                                    <span className="text-xs font-bold uppercase tracking-widest">Sin imagen</span>
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">URL de la Imagen</label>
                            <input
                                type="text"
                                required
                                className="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#D4145A]/20 outline-none transition-all font-medium text-gray-600 truncate"
                                value={formData.imagen}
                                onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
                                placeholder="https://ejemplo.com/imagen.jpg"
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full bg-[#D4145A] text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-[#B0124A] transition-all shadow-xl shadow-[#D4145A]/30 flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-70"
                        >
                            {saving ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <FiSave size={20} />
                                    <span>Guardar Cambios</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
