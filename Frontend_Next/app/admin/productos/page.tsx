"use client";

import React, { useEffect, useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiFilter, FiBox } from "react-icons/fi";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

interface Product {
    id: number;
    nombre: string;
    precio: number;
    categoria: string;
    imagen: string;
    popular: boolean;
    stock: number;
}

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching products:", error);
        } else {
            setProducts(data || []);
        }
        setLoading(false);
    };

    const deleteProduct = async (id: number) => {
        if (!confirm("¿Estás seguro de eliminar este producto?")) return;

        const { error } = await supabase.from("products").delete().eq("id", id);
        if (error) {
            alert("Error al eliminar: " + error.message);
        } else {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    const filteredProducts = products.filter(p =>
        p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-800 tracking-tight">Gestión de Productos</h1>
                    <p className="text-gray-500 font-medium">Administra tu inventario de arreglos florales</p>
                </div>
                <Link
                    href="/admin/productos/nuevo"
                    className="flex items-center justify-center gap-2 bg-[#D4145A] text-white px-6 py-3 rounded-2xl font-bold hover:bg-[#B0124A] transition-all shadow-lg shadow-[#D4145A]/20"
                >
                    <FiPlus size={20} />
                    <span>Nuevo Producto</span>
                </Link>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre o categoría..."
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#D4145A]/20 outline-none transition-all shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="flex items-center justify-center gap-2 bg-white border border-gray-100 text-gray-600 px-6 py-3 rounded-2xl font-bold hover:bg-gray-50 transition-all shadow-sm">
                    <FiFilter />
                    <span>Filtros</span>
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Producto</th>
                                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Categoría</th>
                                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Precio</th>
                                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Stock</th>
                                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Estado</th>
                                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-400 font-medium">Cargando productos...</td>
                                </tr>
                            ) : filteredProducts.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center gap-2 text-gray-400">
                                            <FiBox size={40} />
                                            <p className="font-medium">No se encontraron productos</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100">
                                                    <Image src={product.imagen} alt={product.nombre} fill className="object-cover" />
                                                </div>
                                                <span className="font-bold text-gray-800">{product.nombre}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 font-medium">{product.categoria}</td>
                                        <td className="px-6 py-4 font-black text-gray-800">S/ {product.precio}</td>
                                        <td className="px-6 py-4">
                                            <span className={`font-bold ${product.stock < 10 ? 'text-red-500' : 'text-gray-600'}`}>
                                                {product.stock} und.
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.popular && (
                                                <span className="bg-pink-100 text-[#D4145A] text-[10px] font-black px-2 py-1 rounded-full uppercase">Popular</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/admin/productos/editar/${product.id}`}
                                                    className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                                                >
                                                    <FiEdit2 size={18} />
                                                </Link>
                                                <button
                                                    onClick={() => deleteProduct(product.id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                >
                                                    <FiTrash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
