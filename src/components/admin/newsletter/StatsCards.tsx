import { MdPeople, MdCheckCircle, MdCancel } from "react-icons/md";

interface StatsCardsProps {
    stats: {
        total: number;
        active: number;
        inactive: number;
    };
}

export default function StatsCards({ stats }: StatsCardsProps) {
    return (
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
    );
}