import Link from "next/link";

export default function CookiesFooter() {
    return (
        <section className="pt-6 border-t border-gray-700">
            <div className="flex items-center justify-between">
                <p className="text-gray-400 text-sm">
                    <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES')}
                </p>
                <Link 
                    href="/"
                    className="text-blue-400 hover:text-blue-300 transition-colors text-sm underline"
                >
                    ← Volver al inicio
                </Link>
            </div>
        </section>
    );
}