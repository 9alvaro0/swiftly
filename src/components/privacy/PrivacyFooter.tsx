import Link from "next/link";

export default function PrivacyFooter() {
    return (
        <section className="pt-6 border-t border-gray-700">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <p className="text-gray-400 text-sm">
                        <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES')}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                        Esta política puede actualizarse ocasionalmente para reflejar cambios en nuestras prácticas
                    </p>
                </div>
                <div className="flex gap-4 text-sm">
                    <Link 
                        href="/cookies"
                        className="text-blue-400 hover:text-blue-300 transition-colors underline"
                    >
                        Política de Cookies
                    </Link>
                    <Link 
                        href="/"
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        ← Inicio
                    </Link>
                </div>
            </div>
        </section>
    );
}