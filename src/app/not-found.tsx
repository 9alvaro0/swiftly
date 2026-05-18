import Link from "next/link";

export default function NotFound() {
    return (
        <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center min-h-[60vh]">
            <div className="max-w-xl">
                <h1 className="text-8xl font-bold text-blue-400 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-white mb-4">
                    Página no encontrada
                </h2>
                <p className="text-gray-400 mb-8">
                    La página que buscas no existe o ha sido movida.
                </p>
                <Link
                    href="/"
                    className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                    Volver al inicio
                </Link>
            </div>
        </div>
    );
}
