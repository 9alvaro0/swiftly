interface FilterControlsProps {
    filter: 'all' | 'active' | 'inactive';
    setFilter: (filter: 'all' | 'active' | 'inactive') => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    stats: {
        total: number;
        active: number;
        inactive: number;
    };
}

export default function FilterControls({ 
    filter, 
    setFilter, 
    searchTerm, 
    setSearchTerm, 
    stats 
}: FilterControlsProps) {
    return (
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
    );
}