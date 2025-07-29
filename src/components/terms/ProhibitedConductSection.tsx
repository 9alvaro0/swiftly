import { AlertTriangle } from "lucide-react";

export default function ProhibitedConductSection() {
    return (
        <section>
            <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                <h2 className="text-2xl font-semibold text-white">Conducta Prohibida</h2>
            </div>
            <p className="mb-4">
                Las siguientes actividades no están permitidas en aprendeSwift:
            </p>
            <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-6">
                <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-red-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-red-400 text-xs">🚫</span>
                                </div>
                                <div>
                                    <strong className="text-white">Contenido ofensivo:</strong>
                                    <p className="text-gray-300 text-sm mt-1">
                                        Contenido discriminatorio, ilegal o que incite al odio
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-red-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-red-400 text-xs">📧</span>
                                </div>
                                <div>
                                    <strong className="text-white">Spam:</strong>
                                    <p className="text-gray-300 text-sm mt-1">
                                        Envío de mensajes no solicitados o contenido repetitivo
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-red-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-red-400 text-xs">🔓</span>
                                </div>
                                <div>
                                    <strong className="text-white">Acceso no autorizado:</strong>
                                    <p className="text-gray-300 text-sm mt-1">
                                        Intentar acceder a cuentas de otros usuarios
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-red-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-red-400 text-xs">⚠️</span>
                                </div>
                                <div>
                                    <strong className="text-white">Interrumpir el servicio:</strong>
                                    <p className="text-gray-300 text-sm mt-1">
                                        Actividades que puedan dañar el funcionamiento
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-red-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-red-400 text-xs">🕵️</span>
                                </div>
                                <div>
                                    <strong className="text-white">Recopilar información:</strong>
                                    <p className="text-gray-300 text-sm mt-1">
                                        Recoger datos de otros usuarios sin consentimiento
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-red-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-red-400 text-xs">💰</span>
                                </div>
                                <div>
                                    <strong className="text-white">Uso comercial:</strong>
                                    <p className="text-gray-300 text-sm mt-1">
                                        Actividades comerciales sin autorización
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4 text-sm text-orange-400 bg-orange-600/10 rounded p-3">
                ⚡ <strong>Consecuencias:</strong> El incumplimiento puede resultar en suspensión temporal o permanente de tu cuenta
            </div>
        </section>
    );
}