import { BarChart3 } from "lucide-react";

export default function ThirdPartyServicesSection() {
    return (
        <section>
            <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="w-6 h-6 text-blue-400" />
                <h2 className="text-2xl font-semibold text-white">Servicios Externos</h2>
            </div>
            <p className="mb-4">
                Utilizamos los siguientes servicios que pueden almacenar datos:
            </p>
            <div className="space-y-3">
                <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">🔥 Firebase (Google)</h4>
                    <p className="text-gray-300 text-sm">
                        Gestiona la autenticación y base de datos. Utiliza localStorage para mantener tu sesión activa.
                    </p>
                </div>
                <div className="bg-gray-600/10 border border-gray-600/20 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">📊 Analytics</h4>
                    <p className="text-gray-300 text-sm">
                        <strong>Actualmente no utilizamos</strong> Google Analytics ni otras herramientas de seguimiento.
                    </p>
                </div>
            </div>
        </section>
    );
}