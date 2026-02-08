"use client";

import React, { useEffect, useState } from "react";
import { FiSearch, FiFilter, FiCheckCircle, FiClock, FiTruck, FiXCircle, FiPackage, FiMoreVertical } from "react-icons/fi";
import { supabase } from "@/lib/supabase";

interface Order {
    id: string;
    created_at: string;
    total: number;
    status: string;
    user_id: string;
    contact_info: any;
    shipping_address: any;
}

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("Todos");

    const statusOptions = ["Todos", "Recibido", "Preparando", "En Camino", "Entregado", "Cancelado"];

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("orders")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching orders:", error);
        } else {
            setOrders(data || []);
        }
        setLoading(false);
    };

    const updateOrderStatus = async (orderId: string, newStatus: string) => {
        const { error } = await supabase
            .from("orders")
            .update({ status: newStatus })
            .eq("id", orderId);

        if (error) {
            alert("Error al actualizar el estado: " + error.message);
        } else {
            setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
        }
    };

    const filteredOrders = orders.filter(o => {
        const matchesSearch = o.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "Todos" || o.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Entregado': return 'bg-green-100 text-green-700 border-green-200';
            case 'Cancelado': return 'bg-red-100 text-red-700 border-red-200';
            case 'Preparando': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'En Camino': return 'bg-blue-100 text-blue-700 border-blue-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Entregado': return <FiCheckCircle />;
            case 'Cancelado': return <FiXCircle />;
            case 'Preparando': return <FiPackage />;
            case 'En Camino': return <FiTruck />;
            default: return <FiClock />;
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-gray-800 tracking-tight">Gestión de Pedidos</h1>
                <p className="text-gray-500 font-medium">Visualiza y actualiza el estado de las compras</p>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar por ID de pedido..."
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#D4145A]/20 outline-none transition-all shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    {statusOptions.map(option => (
                        <button
                            key={option}
                            onClick={() => setStatusFilter(option)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${statusFilter === option
                                ? 'bg-[#D4145A] text-white border-[#D4145A] shadow-md'
                                : 'bg-white text-gray-500 border-gray-100 hover:bg-gray-50'
                                }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>

            {/* Orders List */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Pedido ID</th>
                                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Fecha</th>
                                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Total</th>
                                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Estado</th>
                                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400 font-medium whitespace-nowrap">
                                        Cargando pedidos...
                                    </td>
                                </tr>
                            ) : filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400 font-medium">
                                        No se encontraron pedidos.
                                    </td>
                                </tr>
                            ) : (
                                filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <span className="font-bold text-gray-800">#{order.id.slice(0, 8)}</span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 font-medium">
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 font-black text-gray-800">
                                            S/ {order.total.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black uppercase ${getStatusStyle(order.status)}`}>
                                                {getStatusIcon(order.status)}
                                                {order.status}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <select
                                                value={order.status}
                                                onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                                className="bg-gray-50 border border-gray-100 rounded-lg text-[10px] font-bold py-1 px-2 outline-none focus:ring-1 focus:ring-[#D4145A]"
                                            >
                                                {statusOptions.filter(o => o !== "Todos").map(opt => (
                                                    <option key={opt} value={opt}>{opt}</option>
                                                ))}
                                            </select>
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
