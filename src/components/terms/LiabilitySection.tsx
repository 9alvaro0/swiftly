export default function LiabilitySection() {
    return (
        <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Limitación de Responsabilidad</h2>
            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-6">
                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <span className="text-yellow-400 text-xl">⚠️</span>
                        <div>
                            <h4 className="font-semibold text-white mb-2">Servicio &quot;Tal Como Es&quot;</h4>
                            <p className="text-gray-300 text-sm">
                                aprendeSwift se proporciona &quot;tal como es&quot;. No garantizamos que el servicio 
                                será libre de errores o ininterrumpido.
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                        <span className="text-yellow-400 text-xl">🛡️</span>
                        <div>
                            <h4 className="font-semibold text-white mb-2">Contenido Educativo</h4>
                            <p className="text-gray-300 text-sm">
                                Aunque nos esforzamos por proporcionar información precisa sobre Swift e iOS, 
                                no somos responsables de daños derivados del uso del contenido educativo.
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                        <span className="text-yellow-400 text-xl">🔧</span>
                        <div>
                            <h4 className="font-semibold text-white mb-2">Mantenimiento</h4>
                            <p className="text-gray-300 text-sm">
                                Podemos realizar mantenimiento o actualizaciones que temporalmente 
                                interrumpan el servicio. Te notificaremos cuando sea posible.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4 text-sm text-blue-400 bg-blue-600/5 rounded p-3">
                💡 <strong>Recuerda:</strong> aprendeSwift es un proyecto educativo gratuito. Siempre verifica la información en fuentes oficiales de Apple
            </div>
        </section>
    );
}