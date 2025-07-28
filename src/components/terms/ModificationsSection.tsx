export default function ModificationsSection() {
    return (
        <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Modificaciones</h2>
            <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-6">
                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <span className="text-purple-400 text-xl">📝</span>
                        <div>
                            <h4 className="font-semibold text-white mb-2">Cambios en los Términos</h4>
                            <p className="text-gray-300 text-sm">
                                Nos reservamos el derecho de modificar estos términos. Te notificaremos 
                                sobre cambios importantes y tendrás la oportunidad de revisar los nuevos términos.
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                        <span className="text-purple-400 text-xl">🔔</span>
                        <div>
                            <h4 className="font-semibold text-white mb-2">Notificación</h4>
                            <p className="text-gray-300 text-sm">
                                Los cambios se comunicarán a través de la aplicación o por email 
                                (si estás suscrito al newsletter).
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                        <span className="text-purple-400 text-xl">⏰</span>
                        <div>
                            <h4 className="font-semibold text-white mb-2">Periodo de Gracia</h4>
                            <p className="text-gray-300 text-sm">
                                Tendrás 30 días para revisar los cambios. Si continúas usando 
                                aprendeSwift después de este periodo, aceptas los nuevos términos.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4 text-sm text-purple-400 bg-purple-600/5 rounded p-3">
                📅 <strong>Historial:</strong> Mantenemos un registro de cambios para que puedas ver qué ha cambiado
            </div>
        </section>
    );
}