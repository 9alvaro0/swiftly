"use client";

import { useAuth } from '@/contexts/AuthContext';
import { redirect } from 'next/navigation';

export default function AdminPage() {
    const { user } = useAuth();

    if (!user || user.role !== 'admin') {
        redirect('/login');
    }

    return (
        <div className="bg-gray-100 p-6 rounded">
            <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Usuarios</h2>
                    <p>Gestión de usuarios</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Configuración</h2>
                    <p>Configuraciones del sistema</p>
                </div>
            </div>
        </div>
    );
}