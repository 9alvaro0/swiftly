import { Eye } from "lucide-react";

export default function InformationCollectedSection() {
    return (
        <section>
            <div className="flex items-center gap-3 mb-4">
                <Eye className="w-6 h-6 text-blue-400" />
                <h2 className="text-2xl font-semibold text-white">Información que Recopilamos</h2>
            </div>
            <p className="mb-4">
                En aprendeSwift, solo recopilamos información necesaria para brindarte 
                una mejor experiencia de aprendizaje:
            </p>
            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-6">
                <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                            <strong className="text-white">Información de perfil:</strong>
                            <p className="text-gray-300 text-sm mt-1">
                                Nombre, email y avatar cuando te registras (gestionado por Firebase Auth)
                            </p>
                        </div>
                    </li>
                    <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                            <strong className="text-white">Contenido que publicas:</strong>
                            <p className="text-gray-300 text-sm mt-1">
                                Posts y tutoriales que creas (solo administradores y editores)
                            </p>
                        </div>
                    </li>
                    <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                            <strong className="text-white">Suscripción newsletter:</strong>
                            <p className="text-gray-300 text-sm mt-1">
                                Email solo si te suscribes voluntariamente al newsletter
                            </p>
                        </div>
                    </li>
                    <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                            <strong className="text-white">Almacenamiento local:</strong>
                            <p className="text-gray-300 text-sm mt-1">
                                Tu sesión y preferencias en localStorage (no enviamos cookies al servidor)
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    );
}