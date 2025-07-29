import Link from "next/link";

export default function TermsContactSection() {
    return (
        <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Contacto</h2>
            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center">
                        <span className="text-blue-400 text-xl">💬</span>
                    </div>
                    <div>
                        <p className="text-white font-medium mb-2">
                            ¿Tienes preguntas sobre estos términos?
                        </p>
                        <Link 
                            href="/contact" 
                            className="text-blue-400 hover:text-blue-300 transition-colors underline"
                        >
                            Contáctanos a través del formulario
                        </Link>
                        <p className="text-gray-400 text-sm mt-1">
                            Responderemos tus consultas sobre términos y condiciones en un plazo máximo de 72 horas
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}