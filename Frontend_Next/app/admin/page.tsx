"use client";

import React from "react";
import { FiTrendingUp, FiBox, FiUsers, FiDollarSign, FiPlus } from "react-icons/fi";
import Link from "next/link";

const stats = [
    { label: "Ventas Totales", value: "S/ 12,450", icon: <FiDollarSign />, color: "bg-green-500", trend: "+12.5%" },
    { label: "Pedidos", value: "84", icon: <FiTrendingUp />, color: "bg-blue-500", trend: "+5.2%" },
    { label: "Productos", value: "48", icon: <FiBox />, color: "bg-purple-500", trend: "0%" },
    { label: "Clientes", value: "1,200", icon: <FiUsers />, color: "bg-orange-500", trend: "+8.1%" },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-800 tracking-tight">Dashboard</h1>
                    <p className="text-gray-500 font-medium">Bienvenido al panel de control de Florería Rosmery</p>
                </div>
                <Link
                    href="/admin/productos/nuevo"
                    className="flex items-center justify-center gap-2 bg-[#D4145A] text-white px-6 py-3 rounded-2xl font-bold hover:bg-[#B0124A] transition-all shadow-lg shadow-[#D4145A]/20"
                >
                    <FiPlus size={20} />
                    <span>Nuevo Producto</span>
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg`}>
                                {stat.icon}
                            </div>
                            <span className={`text-xs font-bold px-2 py-1 rounded-lg ${stat.trend.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-500'}`}>
                                {stat.trend}
                            </span>
                        </div>
                        <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider">{stat.label}</h3>
                        <p className="text-2xl font-black text-gray-800 mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Recent Activity / Charts Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Pedidos Recientes</h2>
                        <Link href="/admin/pedidos" className="text-[#D4145A] text-sm font-bold hover:underline">Ver todos</Link>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((id) => (
                            <div key={id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                    <div>
                                        <p className="font-bold text-gray-800">Pedido #ORD-{1000 + id}</p>
                                        <p className="text-xs text-gray-500">Hace {id * 2} horas</p>
                                    </div>
                                </div>
                                <span className="text-sm font-bold text-gray-800">S/ {(id + 1) * 50}</span>
                                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-[10px] font-bold rounded-full uppercase">Preparando</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-20 h-20 bg-pink-50 text-[#D4145A] rounded-full flex items-center justify-center text-3xl">
                        <FiTrendingUp />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">Análisis de Ventas</h2>
                    <p className="text-gray-500 max-w-xs">Aquí aparecerán tus gráficos de rendimiento una vez que tengas ventas reales.</p>
                </div>
            </div>
        </div>
    );
}
