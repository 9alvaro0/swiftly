import { Database } from "lucide-react";

export default function HowWeUseInfoSection() {
    return (
        <section>
            <div className="flex items-center gap-3 mb-4">
                <Database className="w-6 h-6 text-blue-400" />
                <h2 className="text-2xl font-semibold text-white">Cómo Usamos tu Información</h2>
            </div>
            <p className="mb-4">
                Utilizamos tu información exclusivamente para:
            </p>
            <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-6">
                <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-green-400 text-xs">✓</span>
                        </div>
                        <div>
                            <strong className="text-white">Funcionamiento del sitio:</strong>
                            <p className="text-gray-300 text-sm mt-1">
                                Autenticación, gestión de sesiones y funcionalidades básicas
                            </p>
                        </div>
                    </li>
                    <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-green-400 text-xs">✓</span>
                        </div>
                        <div>
                            <strong className="text-white">Contenido personalizado:</strong>
                            <p className="text-gray-300 text-sm mt-1">
                                Mostrar tu perfil y contenido que has creado
                            </p>
                        </div>
                    </li>
                    <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-green-400 text-xs">✓</span>
                        </div>
                        <div>
                            <strong className="text-white">Newsletter (opcional):</strong>
                            <p className="text-gray-300 text-sm mt-1">
                                Envío de tutoriales solo si te has suscrito voluntariamente
                            </p>
                        </div>
                    </li>
                    <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-green-400 text-xs">✓</span>
                        </div>
                        <div>
                            <strong className="text-white">Comunicación directa:</strong>
                            <p className="text-gray-300 text-sm mt-1">
                                Responder tus consultas a través del formulario de contacto
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="mt-4 text-sm text-gray-400 bg-gray-600/10 rounded p-3">
                <strong>No utilizamos:</strong> Google Analytics, tracking, publicidad dirigida ni análisis de comportamiento
            </div>
        </section>
    );
}