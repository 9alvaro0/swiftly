import { Mail } from "lucide-react";

export default function SharingInfoSection() {
    return (
        <section>
            <div className="flex items-center gap-3 mb-4">
                <Mail className="w-6 h-6 text-blue-400" />
                <h2 className="text-2xl font-semibold text-white">Compartir Información</h2>
            </div>
            <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-6 mb-4">
                <p className="text-white font-semibold mb-2">
                    🛡️ Compromiso de Privacidad
                </p>
                <p className="text-gray-300">
                    <strong>No vendemos, alquilamos ni compartimos</strong> tu información personal 
                    con terceros para fines comerciales.
                </p>
            </div>
            
            <p className="mb-4">
                Únicamente compartimos información en estos casos específicos:
            </p>
            
            <div className="space-y-3">
                <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">🔥 Firebase (Google)</h4>
                    <p className="text-gray-300 text-sm">
                        Nuestro proveedor de autenticación y base de datos. Maneja tu perfil según 
                        su política de privacidad.
                    </p>
                </div>
                
                <div className="bg-gray-600/10 border border-gray-600/20 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">⚖️ Requerimientos Legales</h4>
                    <p className="text-gray-300 text-sm">
                        Solo cuando sea requerido por ley o autoridades competentes.
                    </p>
                </div>
                
                <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">✋ Con tu Consentimiento</h4>
                    <p className="text-gray-300 text-sm">
                        Solo cuando hayas dado tu consentimiento explícito para casos específicos.
                    </p>
                </div>
            </div>
        </section>
    );
}