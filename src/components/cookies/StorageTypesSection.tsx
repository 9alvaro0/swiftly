import { Settings, Shield, BarChart3 } from "lucide-react";

export default function StorageTypesSection() {
    return (
        <section>
            <div className="flex items-center gap-3 mb-4">
                <Settings className="w-6 h-6 text-blue-400" />
                <h2 className="text-2xl font-semibold text-white">Tipos de Almacenamiento</h2>
            </div>
            
            <div className="space-y-6">
                <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-3">
                        <Shield className="w-5 h-5 text-green-400" />
                        <h3 className="text-lg font-semibold text-white">Almacenamiento Esencial (localStorage)</h3>
                    </div>
                    <p className="mb-3 text-gray-300">
                        Datos necesarios para el funcionamiento de la aplicación:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4 text-gray-300">
                        <li><strong>auth-storage:</strong> Tu perfil de usuario y estado de autenticación</li>
                        <li><strong>Firebase Auth:</strong> Tokens de autenticación (gestionado automáticamente)</li>
                    </ul>
                    <div className="mt-3 text-sm text-green-400 bg-green-600/5 rounded p-2">
                        ✓ Estos datos nunca salen de tu navegador automáticamente
                    </div>
                </div>

                <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-3">
                        <BarChart3 className="w-5 h-5 text-blue-400" />
                        <h3 className="text-lg font-semibold text-white">Analíticas (Futuro)</h3>
                    </div>
                    <p className="text-gray-300 mb-2">
                        Actualmente <strong>no utilizamos</strong> cookies de analíticas, pero en el futuro podríamos implementar:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4 text-gray-400">
                        <li>Métricas de uso de tutoriales</li>
                        <li>Preferencias de contenido</li>
                        <li>Progreso de aprendizaje</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}