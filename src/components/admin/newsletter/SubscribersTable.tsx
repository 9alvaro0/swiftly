import { MdEmail, MdCheckCircle, MdCancel } from "react-icons/md";

interface Subscriber {
    id?: string;
    email: string;
    isActive: boolean;
    createdAt?: Date;
    metadata?: {
        source?: string;
    };
}

interface SubscribersTableProps {
    subscribers: Subscriber[];
    updatingSubscribers: Set<string>;
    onToggleStatus: (subscriberId: string, currentStatus: boolean) => void;
    searchTerm?: string;
}

export default function SubscribersTable({ 
    subscribers, 
    updatingSubscribers, 
    onToggleStatus,
    searchTerm = ''
}: SubscribersTableProps) {
    return (
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
                                        onClick={() => onToggleStatus(subscriber.id || '', subscriber.isActive)}
                                        disabled={updatingSubscribers.has(subscriber.id || '')}
                                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors relative ${
                                            subscriber.isActive
                                                ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30'
                                                : 'bg-green-600/20 text-green-400 hover:bg-green-600/30'
                                        } ${updatingSubscribers.has(subscriber.id || '') ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {updatingSubscribers.has(subscriber.id || '') ? (
                                            <span className="flex items-center gap-2">
                                                <span className="animate-spin h-3 w-3 border-2 border-current border-t-transparent rounded-full" />
                                                Actualizando...
                                            </span>
                                        ) : (
                                            subscriber.isActive ? 'Desactivar' : 'Activar'
                                        )}
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
    );
}