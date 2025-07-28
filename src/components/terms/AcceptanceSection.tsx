import { Scale } from "lucide-react";

export default function AcceptanceSection() {
    return (
        <section>
            <div className="flex items-center gap-3 mb-4">
                <Scale className="w-6 h-6 text-blue-400" />
                <h2 className="text-2xl font-semibold text-white">Aceptación de Términos</h2>
            </div>
            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-6">
                <p className="mb-4">
                    Al acceder y usar aprendeSwift, aceptas estar sujeto a estos términos y condiciones. 
                    Si no estás de acuerdo con cualquier parte de estos términos, no debes usar nuestros servicios.
                </p>
                <div className="text-sm text-blue-400 bg-blue-600/5 rounded p-3">
                    💡 <strong>Importante:</strong> aprendeSwift es una plataforma educativa gratuita enfocada en enseñar Swift y desarrollo iOS
                </div>
            </div>
        </section>
    );
}