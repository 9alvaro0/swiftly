export default function TerminationSection() {
    return (
        <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Terminación del Servicio</h2>
            <div className="space-y-4">
                <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-6">
                    <div className="flex items-start gap-3">
                        <span className="text-red-400 text-xl">🔒</span>
                        <div>
                            <h4 className="font-semibold text-white mb-2">Suspensión por Violación</h4>
                            <p className="text-gray-300 text-sm mb-3">
                                Podemos suspender o terminar tu acceso si violas estos términos. 
                                Esto incluye conducta prohibida o uso indebido de la plataforma.
                            </p>
                            <div className="text-xs text-gray-400 bg-red-600/5 rounded p-2">
                                Proceso: Advertencia → Suspensión temporal → Suspensión permanente
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-6">
                    <div className="flex items-start gap-3">
                        <span className="text-green-400 text-xl">✋</span>
                        <div>
                            <h4 className="font-semibold text-white mb-2">Cancelación Voluntaria</h4>
                            <p className="text-gray-300 text-sm mb-3">
                                Puedes eliminar tu cuenta en cualquier momento desde tu perfil. 
                                Esto eliminará tus datos personales según nuestra política de privacidad.
                            </p>
                            <div className="text-xs text-gray-400 bg-green-600/5 rounded p-2">
                                Tus datos se eliminan automáticamente al cerrar la cuenta
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-6">
                    <div className="flex items-start gap-3">
                        <span className="text-blue-400 text-xl">📄</span>
                        <div>
                            <h4 className="font-semibold text-white mb-2">Contenido Publicado</h4>
                            <p className="text-gray-300 text-sm">
                                Si eres administrador o editor y has publicado contenido, 
                                este puede permanecer disponible para la comunidad educativa 
                                incluso después de cerrar tu cuenta (sin tu información personal).
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}