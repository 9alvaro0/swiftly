// src/app/admin/newsletter/page.tsx

"use client";

import { useState } from "react";
import { useAdminNewsletter } from "@/hooks/useAdminAPI";
import Spinner from "@/components/ui/Spinner";
import { MdEmail, MdPeople, MdCheckCircle, MdCancel } from "react-icons/md";

export default function AdminNewsletterPage() {
    const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');
    const [searchTerm, setSearchTerm] = useState('');
    
    const filterStatus = filter === 'active' ? 'active' : filter === 'inactive' ? 'inactive' : '';
    const { data: subscribers, isLoading: loading, error, refetch } = useAdminNewsletter(searchTerm, filterStatus);

    const toggleSubscriberStatus = async (subscriberId: string, currentStatus: boolean) => {
        try {
            // TODO: Implement API endpoint for updating subscriber status
            console.log('Toggle subscriber status:', subscriberId, currentStatus);
            alert('Funcionalidad de actualización de estado pendiente de implementar');
        } catch (error) {
            console.error("Error updating subscriber status:", error);
            alert("Error al actualizar el estado del suscriptor");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Spinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-8">
                <p className="text-red-400">{error}</p>
                <button 
                    onClick={() => refetch()}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Reintentar
                </button>
            </div>
        );
    }

    if (!subscribers) {
        return (
            <div className="text-center p-8">
                <p className="text-white/70">No hay datos de suscriptores disponibles</p>
            </div>
        );
    }

    const stats = {
        total: subscribers.length,
        active: subscribers.filter(s => s.isActive).length,
        inactive: subscribers.filter(s => !s.isActive).length,
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Suscriptores Newsletter</h1>
                <p className="text-white/70">Gestiona los suscriptores de tu newsletter</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                    <div className="flex items-center gap-4">
                        <div className="bg-blue-600/20 p-3 rounded-xl">
                            <MdPeople className="h-6 w-6 text-blue-400" />
                        </div>
                        <div>
                            <p className="text-white/70 text-sm">Total Suscriptores</p>
                            <p className="text-2xl font-bold text-white">{stats.total}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                    <div className="flex items-center gap-4">
                        <div className="bg-green-600/20 p-3 rounded-xl">
                            <MdCheckCircle className="h-6 w-6 text-green-400" />
                        </div>
                        <div>
                            <p className="text-white/70 text-sm">Activos</p>
                            <p className="text-2xl font-bold text-white">{stats.active}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                    <div className="flex items-center gap-4">
                        <div className="bg-red-600/20 p-3 rounded-xl">
                            <MdCancel className="h-6 w-6 text-red-400" />
                        </div>
                        <div>
                            <p className="text-white/70 text-sm">Inactivos</p>
                            <p className="text-2xl font-bold text-white">{stats.inactive}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                                filter === 'all'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                            }`}
                        >
                            Todos ({stats.total})
                        </button>
                        <button
                            onClick={() => setFilter('active')}
                            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                                filter === 'active'
                                    ? 'bg-green-600 text-white'
                                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                            }`}
                        >
                            Activos ({stats.active})
                        </button>
                        <button
                            onClick={() => setFilter('inactive')}
                            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                                filter === 'inactive'
                                    ? 'bg-red-600 text-white'
                                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                            }`}
                        >
                            Inactivos ({stats.inactive})
                        </button>
                    </div>

                    <div className="w-full sm:w-auto">
                        <input
                            type="text"
                            placeholder="Buscar por email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full sm:w-64 px-4 py-2 bg-white/10 border border-white/20 rounded-lg 
                                     text-white placeholder-white/50 focus:outline-none focus:ring-2 
                                     focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>
            </div>

            {/* Subscribers List */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-white/5 border-b border-white/10">
                            <tr>
                                <th className="text-left px-6 py-4 text-white/70 font-medium text-sm">
                                    Email
                                </th>
                                <th className="text-left px-6 py-4 text-white/70 font-medium text-sm">
                                    Estado
                                </th>
                                <th className="text-left px-6 py-4 text-white/70 font-medium text-sm">
                                    Fecha Suscripción
                                </th>
                                <th className="text-left px-6 py-4 text-white/70 font-medium text-sm">
                                    Fuente
                                </th>
                                <th className="text-right px-6 py-4 text-white/70 font-medium text-sm">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {subscribers.map((subscriber) => (
                                <tr
                                    key={subscriber.id}
                                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <MdEmail className="h-4 w-4 text-white/40" />
                                            <span className="text-white">{subscriber.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                                                subscriber.isActive
                                                    ? 'bg-green-600/20 text-green-400'
                                                    : 'bg-red-600/20 text-red-400'
                                            }`}
                                        >
                                            {subscriber.isActive ? (
                                                <MdCheckCircle className="h-3 w-3" />
                                            ) : (
                                                <MdCancel className="h-3 w-3" />
                                            )}
                                            {subscriber.isActive ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-white/70 text-sm">
                                        {subscriber.createdAt instanceof Date 
                                            ? subscriber.createdAt.toLocaleDateString('es-ES', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            })
                                            : 'N/A'
                                        }
                                    </td>
                                    <td className="px-6 py-4 text-white/70 text-sm">
                                        {subscriber.metadata?.source || 'website'}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => toggleSubscriberStatus(subscriber.id || '', subscriber.isActive)}
                                            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                                                subscriber.isActive
                                                    ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30'
                                                    : 'bg-green-600/20 text-green-400 hover:bg-green-600/30'
                                            }`}
                                        >
                                            {subscriber.isActive ? 'Desactivar' : 'Activar'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {subscribers.length === 0 && (
                    <div className="text-center py-12">
                        <MdEmail className="h-12 w-12 text-white/40 mx-auto mb-4" />
                        <p className="text-white/70">
                            {searchTerm ? 'No se encontraron suscriptores que coincidan con la búsqueda' : 'No hay suscriptores'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}