import Link from "next/link";

export default function PrivacyContactSection() {
    return (
        <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Contacto</h2>
            <p className="mb-4">
                Si tienes preguntas sobre esta política de privacidad o quieres ejercer alguno de tus derechos:
            </p>
            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center">
                        <span className="text-blue-400 text-xl">💬</span>
                    </div>
                    <div>
                        <p className="text-white font-medium">Contáctanos</p>
                        <Link 
                            href="/contact" 
                            className="text-blue-400 hover:text-blue-300 transition-colors underline"
                        >
                            A través del formulario de contacto
                        </Link>
                        <p className="text-gray-400 text-sm mt-1">
                            Te responderemos en un plazo máximo de 72 horas
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}