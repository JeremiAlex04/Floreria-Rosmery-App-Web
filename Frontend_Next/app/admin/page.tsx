"use client";

import React, { useEffect, useState } from "react";
import { FiTrendingUp, FiBox, FiUsers, FiDollarSign, FiPlus, FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface DashboardStats {
    totalSales: number;
    orderCount: number;
    productCount: number;
    customerCount: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats>({
        totalSales: 0,
        orderCount: 0,
        productCount: 0,
        customerCount: 0
    });
    const [recentOrders, setRecentOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                // 1. Fetch Products Count
                const { count: pCount } = await supabase
                    .from("products")
                    .select("*", { count: "exact", head: true });

                // 2. Fetch Orders Count & Total
                const { data: oData, count: oCount } = await supabase
                    .from("orders")
                    .select("total, user_id");

                const totalSales = oData?.reduce((acc, current) => acc + (current.total || 0), 0) || 0;

                // 3. Unique Customers
                const uniqueCustomers = new Set(oData?.map(o => o.user_id)).size;

                // 4. Recent Orders
                const { data: rOrders } = await supabase
                    .from("orders")
                    .select("*")
                    .order("created_at", { ascending: false })
                    .limit(5);

                setStats({
                    totalSales,
                    orderCount: oCount || 0,
                    productCount: pCount || 0,
                    customerCount: uniqueCustomers
                });
                setRecentOrders(rOrders || []);
            } catch (err) {
                console.error("Error loading dashboard data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const statCards = [
        { label: "Ventas Totales", value: `S/ ${stats.totalSales.toFixed(2)}`, icon: <FiDollarSign />, color: "bg-green-500", trend: "Datos en vivo" },
        { label: "Pedidos", value: stats.orderCount.toString(), icon: <FiShoppingCart />, color: "bg-blue-500", trend: "+ 5 hoy" },
        { label: "Productos", value: stats.productCount.toString(), icon: <FiBox />, color: "bg-purple-500", trend: "Inventario" },
        { label: "Clientes", value: stats.customerCount.toString(), icon: <FiUsers />, color: "bg-orange-500", trend: "Únicos" },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-12 h-12 border-4 border-[#D4145A] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

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
                {statCards.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg`}>
                                {stat.icon}
                            </div>
                            <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-gray-50 text-gray-400">
                                {stat.trend}
                            </span>
                        </div>
                        <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider">{stat.label}</h3>
                        <p className="text-2xl font-black text-gray-800 mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Recent Orders & Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Pedidos Recientes</h2>
                        <Link href="/admin/pedidos" className="text-[#D4145A] text-sm font-bold hover:underline">Ver todos</Link>
                    </div>

                    {recentOrders.length === 0 ? (
                        <div className="py-12 text-center text-gray-400">
                            <p>No hay pedidos registrados aún.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {recentOrders.map((order) => (
                                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-[#D4145A]/10 text-[#D4145A] rounded-full flex items-center justify-center">
                                            <FiShoppingCart />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-800 leading-none">#{order.id.slice(0, 8)}</p>
                                            <p className="text-[10px] text-gray-500 mt-1">
                                                {new Date(order.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-gray-800">S/ {order.total.toFixed(2)}</p>
                                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${order.status === 'Entregado' ? 'bg-green-100 text-green-700' :
                                            order.status === 'Cancelado' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-20 h-20 bg-pink-50 text-[#D4145A] rounded-full flex items-center justify-center text-3xl">
                        <FiTrendingUp />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">Rendimiento</h2>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Estas estadísticas se actualizan automáticamente cada vez que un cliente completa una compra.
                    </p>
                    <div className="w-full pt-4">
                        <Link href="/admin/productos" className="block w-full py-3 bg-gray-50 text-gray-600 rounded-xl font-bold hover:bg-gray-100 transition-all text-sm">
                            Gestionar Inventario
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
