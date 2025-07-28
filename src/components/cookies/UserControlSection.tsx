import { Shield } from "lucide-react";

export default function UserControlSection() {
    return (
        <section>
            <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-blue-400" />
                <h2 className="text-2xl font-semibold text-white">Tu Control</h2>
            </div>
            <p className="mb-4">
                Tienes control total sobre tus datos:
            </p>
            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-6">
                <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-blue-400 text-xs">1</span>
                        </div>
                        <div>
                            <strong className="text-white">Borrar datos locales:</strong>
                            <p className="text-gray-300 text-sm mt-1">
                                Ve a configuración de tu navegador &gt; Almacenamiento &gt; Borrar datos del sitio
                            </p>
                        </div>
                    </li>
                    <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-blue-400 text-xs">2</span>
                        </div>
                        <div>
                            <strong className="text-white">Navegación privada:</strong>
                            <p className="text-gray-300 text-sm mt-1">
                                Usa modo incógnito para evitar almacenamiento permanente
                            </p>
                        </div>
                    </li>
                    <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-blue-400 text-xs">3</span>
                        </div>
                        <div>
                            <strong className="text-white">Cerrar sesión:</strong>
                            <p className="text-gray-300 text-sm mt-1">
                                Al cerrar sesión en la app, se limpian automáticamente tus datos locales
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    );
}