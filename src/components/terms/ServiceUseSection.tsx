import { Users } from "lucide-react";

export default function ServiceUseSection() {
    return (
        <section>
            <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-blue-400" />
                <h2 className="text-2xl font-semibold text-white">Uso del Servicio</h2>
            </div>
            <p className="mb-4">
                Al usar aprendeSwift, te comprometes a:
            </p>
            <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-6">
                <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-green-400 text-xs">✓</span>
                        </div>
                        <div>
                            <strong className="text-white">Información veraz:</strong>
                            <p className="text-gray-300 text-sm mt-1">
                                Proporcionar información precisa y actualizada en tu perfil
                            </p>
                        </div>
                    </li>
                    <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-green-400 text-xs">🔒</span>
                        </div>
                        <div>
                            <strong className="text-white">Seguridad de cuenta:</strong>
                            <p className="text-gray-300 text-sm mt-1">
                                Mantener la seguridad de tu cuenta (Firebase Auth se encarga de esto)
                            </p>
                        </div>
                    </li>
                    <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-green-400 text-xs">🚫</span>
                        </div>
                        <div>
                            <strong className="text-white">No dañar el servicio:</strong>
                            <p className="text-gray-300 text-sm mt-1">
                                No realizar actividades que puedan dañar la plataforma
                            </p>
                        </div>
                    </li>
                    <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-green-400 text-xs">©</span>
                        </div>
                        <div>
                            <strong className="text-white">Respetar derechos:</strong>
                            <p className="text-gray-300 text-sm mt-1">
                                Respetar los derechos de propiedad intelectual de Swift, Apple y otros
                            </p>
                        </div>
                    </li>
                    <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-green-400 text-xs">⚖️</span>
                        </div>
                        <div>
                            <strong className="text-white">Cumplir la ley:</strong>
                            <p className="text-gray-300 text-sm mt-1">
                                Cumplir con todas las leyes aplicables
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    );
}