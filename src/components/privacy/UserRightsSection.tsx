import { Shield } from "lucide-react";

export default function UserRightsSection() {
    return (
        <section>
            <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-blue-400" />
                <h2 className="text-2xl font-semibold text-white">Tus Derechos</h2>
            </div>
            <p className="mb-4">
                Como usuario de aprendeSwift, tienes los siguientes derechos:
            </p>
            <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-6">
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-purple-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-purple-400 text-xs">👁️</span>
                            </div>
                            <div>
                                <strong className="text-white">Acceso:</strong>
                                <p className="text-gray-300 text-sm mt-1">
                                    Ver toda tu información personal almacenada
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-purple-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-purple-400 text-xs">✏️</span>
                            </div>
                            <div>
                                <strong className="text-white">Corrección:</strong>
                                <p className="text-gray-300 text-sm mt-1">
                                    Modificar datos incorrectos en tu perfil
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-purple-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-purple-400 text-xs">🗑️</span>
                            </div>
                            <div>
                                <strong className="text-white">Eliminación:</strong>
                                <p className="text-gray-300 text-sm mt-1">
                                    Borrar tu cuenta y datos asociados
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-purple-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-purple-400 text-xs">📧</span>
                            </div>
                            <div>
                                <strong className="text-white">Desuscripción:</strong>
                                <p className="text-gray-300 text-sm mt-1">
                                    Cancelar newsletter en cualquier momento
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-purple-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-purple-400 text-xs">📁</span>
                            </div>
                            <div>
                                <strong className="text-white">Portabilidad:</strong>
                                <p className="text-gray-300 text-sm mt-1">
                                    Exportar tus datos en formato legible
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-purple-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-purple-400 text-xs">🚫</span>
                            </div>
                            <div>
                                <strong className="text-white">Oposición:</strong>
                                <p className="text-gray-300 text-sm mt-1">
                                    Rechazar ciertos usos de tus datos
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4 text-sm text-green-400 bg-green-600/5 rounded p-3">
                💡 <strong>Tip:</strong> Puedes ejercer estos derechos contactándonos o gestionando tu perfil directamente en la aplicación
            </div>
        </section>
    );
}