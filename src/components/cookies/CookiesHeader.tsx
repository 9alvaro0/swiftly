import { Cookie } from "lucide-react";

export default function CookiesHeader() {
    return (
        <div className="mb-12 text-center">
            <div className="flex justify-center mb-6">
                <div className="p-4 bg-blue-600/20 rounded-full">
                    <Cookie className="w-12 h-12 text-blue-400" />
                </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
                Política de Almacenamiento
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Transparencia sobre nuestro uso de almacenamiento local y tecnologías similares 
                en aprendeSwift.
            </p>
        </div>
    );
}