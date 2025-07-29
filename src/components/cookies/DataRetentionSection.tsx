export default function DataRetentionSection() {
    return (
        <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Retención de Datos</h2>
            <p className="mb-4">
                Nuestro enfoque de almacenamiento:
            </p>
            <div className="bg-gray-600/10 border border-gray-600/20 rounded-lg p-6">
                <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <div>
                            <strong className="text-white">localStorage:</strong> 
                            <span className="text-gray-300 ml-2">Permanece hasta que lo borres manualmente o cierres sesión</span>
                        </div>
                    </li>
                    <li className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                        <div>
                            <strong className="text-white">Firebase Auth:</strong> 
                            <span className="text-gray-300 ml-2">Los tokens se renuevan automáticamente pero expiran por seguridad</span>
                        </div>
                    </li>
                    <li className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                        <div>
                            <strong className="text-white">Cookies tradicionales:</strong> 
                            <span className="text-gray-300 ml-2">No utilizamos cookies persistentes actualmente</span>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    );
}