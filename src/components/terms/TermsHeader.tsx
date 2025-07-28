import { FileText } from "lucide-react";

export default function TermsHeader() {
    return (
        <div className="mb-12 text-center">
            <div className="flex justify-center mb-6">
                <div className="p-4 bg-blue-600/20 rounded-full">
                    <FileText className="w-12 h-12 text-blue-400" />
                </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
                Términos y Condiciones
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Estos términos rigen el uso de aprendeSwift y establecen las reglas para 
                una comunidad de aprendizaje respetuosa y productiva sobre Swift.
            </p>
        </div>
    );
}