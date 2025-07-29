import { Shield } from "lucide-react";

export default function PrivacyHeader() {
    return (
        <div className="mb-12 text-center">
            <div className="flex justify-center mb-6">
                <div className="p-4 bg-blue-600/20 rounded-full">
                    <Shield className="w-12 h-12 text-blue-400" />
                </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
                Política de Privacidad
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Tu privacidad es importante para nosotros. Esta política explica cómo recopilamos, 
                usamos y protegemos tu información personal en aprendeSwift.
            </p>
        </div>
    );
}