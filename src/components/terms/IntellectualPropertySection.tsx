export default function IntellectualPropertySection() {
    return (
        <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Propiedad Intelectual</h2>
            <div className="space-y-4">
                <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-6">
                    <div className="flex items-start gap-3 mb-4">
                        <span className="text-2xl">📚</span>
                        <div>
                            <h4 className="font-semibold text-white mb-2">Contenido Educativo</h4>
                            <p className="text-gray-300 text-sm">
                                Los tutoriales y artículos en aprendeSwift están protegidos por derechos de autor. 
                                Puedes usarlos para aprendizaje personal, pero no redistribuirlos comercialmente sin autorización.
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-gray-600/10 border border-gray-600/20 rounded-lg p-6">
                    <div className="flex items-start gap-3 mb-4">
                        <span className="text-2xl">🍎</span>
                        <div>
                            <h4 className="font-semibold text-white mb-2">Marcas de Terceros</h4>
                            <p className="text-gray-300 text-sm">
                                Swift, iOS, Xcode y otras marcas pertenecen a Apple Inc. 
                                aprendeSwift es un proyecto educativo independiente no afiliado oficialmente con Apple.
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-6">
                    <div className="flex items-start gap-3 mb-4">
                        <span className="text-2xl">🆓</span>
                        <div>
                            <h4 className="font-semibold text-white mb-2">Uso Educativo</h4>
                            <p className="text-gray-300 text-sm">
                                Todo el contenido está disponible gratuitamente para fines educativos. 
                                Animamos el aprendizaje y compartir conocimiento de manera responsable.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}