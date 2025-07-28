// src/app/admin/newsletter/page.tsx

"use client";

import { useState } from "react";
import { useAdminNewsletter } from "@/hooks/useAdminAPI";
import { auth } from "@/services/firebase/config";
import { toast } from "sonner";
import StatsCards from "@/components/admin/newsletter/StatsCards";
import FilterControls from "@/components/admin/newsletter/FilterControls";
import SubscribersTable from "@/components/admin/newsletter/SubscribersTable";
import NewsletterPageSkeleton from "@/components/admin/newsletter/skeletons/NewsletterPageSkeleton";

export default function AdminNewsletterPage() {
    const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [updatingSubscribers, setUpdatingSubscribers] = useState<Set<string>>(new Set());
    
    const filterStatus = filter === 'active' ? 'active' : filter === 'inactive' ? 'inactive' : '';
    const { data: subscribers, isLoading: loading, error, refetch } = useAdminNewsletter(searchTerm, filterStatus);

    const toggleSubscriberStatus = async (subscriberId: string, currentStatus: boolean) => {
        if (!auth.currentUser) {
            toast.error('No estás autenticado');
            return;
        }

        // Add to updating set to show loading state
        setUpdatingSubscribers(prev => new Set([...prev, subscriberId]));

        try {
            const token = await auth.currentUser.getIdToken();
            const response = await fetch('/api/admin/newsletter', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    subscriberId,
                    currentStatus
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al actualizar el estado');
            }

            toast.success(data.message || 'Estado actualizado correctamente');
            
            // Refetch data to update the UI
            await refetch();
        } catch (error) {
            console.error("Error updating subscriber status:", error);
            toast.error(error instanceof Error ? error.message : "Error al actualizar el estado del suscriptor");
        } finally {
            // Remove from updating set
            setUpdatingSubscribers(prev => {
                const newSet = new Set(prev);
                newSet.delete(subscriberId);
                return newSet;
            });
        }
    };

    if (loading) {
        return <NewsletterPageSkeleton />;
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

            <StatsCards stats={stats} />

            <FilterControls 
                filter={filter}
                setFilter={setFilter}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                stats={stats}
            />

            <SubscribersTable 
                subscribers={subscribers}
                updatingSubscribers={updatingSubscribers}
                onToggleStatus={toggleSubscriberStatus}
                searchTerm={searchTerm}
            />
        </div>
    );
}