import { FileText } from "lucide-react";

export default function UserContentSection() {
    return (
        <section>
            <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-blue-400" />
                <h2 className="text-2xl font-semibold text-white">Contenido de Usuario</h2>
            </div>
            <p className="mb-4">
                Cuando publicas contenido en aprendeSwift (solo administradores y editores):
            </p>
            <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-6">
                <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-purple-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-purple-400 text-xs">👤</span>
                                </div>
                                <div>
                                    <strong className="text-white">Mantienes la propiedad:</strong>
                                    <p className="text-gray-300 text-sm mt-1">
                                        Tu contenido sigue siendo tuyo
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-purple-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-purple-400 text-xs">📄</span>
                                </div>
                                <div>
                                    <strong className="text-white">Licencia de uso:</strong>
                                    <p className="text-gray-300 text-sm mt-1">
                                        Nos permites mostrarlo en aprendeSwift
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-purple-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-purple-400 text-xs">✅</span>
                                </div>
                                <div>
                                    <strong className="text-white">Garantizas derechos:</strong>
                                    <p className="text-gray-300 text-sm mt-1">
                                        Tienes derecho a publicar ese contenido
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-purple-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-purple-400 text-xs">🆕</span>
                                </div>
                                <div>
                                    <strong className="text-white">Contenido original:</strong>
                                    <p className="text-gray-300 text-sm mt-1">
                                        Es original y no infringe derechos de terceros
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-purple-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-purple-400 text-xs">🛡️</span>
                                </div>
                                <div>
                                    <strong className="text-white">Moderación:</strong>
                                    <p className="text-gray-300 text-sm mt-1">
                                        Podemos moderarlo según nuestras políticas
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-purple-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-purple-400 text-xs">🍎</span>
                                </div>
                                <div>
                                    <strong className="text-white">Sobre Swift/iOS:</strong>
                                    <p className="text-gray-300 text-sm mt-1">
                                        El contenido debe ser relevante para Swift/iOS
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4 text-sm text-gray-400 bg-gray-600/10 rounded p-3">
                <strong>Nota:</strong> Solo usuarios con rol de administrador o editor pueden crear contenido público
            </div>
        </section>
    );
}