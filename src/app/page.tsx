import Link from "next/link";
import Image from "next/image";

export default function Home() {
    return (
        <div className="space-y-10">
            {/* Hero Section */}
            <section className="text-center py-10">
                <h1 className="text-4xl font-bold mb-4">Aprende Swift y SwiftUI</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Tutoriales, guías y recursos para convertirte en un desarrollador de iOS experimentado
                </p>
                <div className="mt-8 flex gap-4 justify-center">
                    <Link
                        href="/tutoriales"
                        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
                    >
                        Ver tutoriales
                    </Link>
                    <Link
                        href="/cursos"
                        className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300"
                    >
                        Explorar cursos
                    </Link>
                </div>
            </section>

            {/* Featured Tutorials */}
            <section>
                <h2 className="text-2xl font-bold mb-6">Tutoriales destacados</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="h-48 bg-gray-200 relative">
                            {/* Aquí iría una imagen pero la omitimos por ahora */}
                            <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs px-2 py-1 m-2 rounded">
                                SwiftUI
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-lg mb-2">Introducción a SwiftUI</h3>
                            <p className="text-gray-600 mb-3">
                                Aprende los fundamentos de SwiftUI y cómo construir interfaces declarativas.
                            </p>
                            <Link
                                href="/tutoriales/introduccion-swiftui"
                                className="text-blue-600 font-medium hover:underline"
                            >
                                Leer tutorial →
                            </Link>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="h-48 bg-gray-200 relative">
                            <div className="absolute top-0 right-0 bg-green-600 text-white text-xs px-2 py-1 m-2 rounded">
                                Swift
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-lg mb-2">Estructuras vs Clases en Swift</h3>
                            <p className="text-gray-600 mb-3">
                                Entiende las diferencias entre estructuras y clases, y cuándo usar cada una.
                            </p>
                            <Link
                                href="/tutoriales/estructuras-vs-clases"
                                className="text-blue-600 font-medium hover:underline"
                            >
                                Leer tutorial →
                            </Link>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="h-48 bg-gray-200 relative">
                            <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs px-2 py-1 m-2 rounded">
                                Avanzado
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-lg mb-2">Concurrencia en Swift</h3>
                            <p className="text-gray-600 mb-3">
                                Explora el moderno sistema de concurrencia de Swift con async/await.
                            </p>
                            <Link
                                href="/tutoriales/concurrencia-swift"
                                className="text-blue-600 font-medium hover:underline"
                            >
                                Leer tutorial →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cursos recomendados */}
            <section>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Cursos recomendados</h2>
                    <Link
                        href="/cursos"
                        className="text-blue-600 hover:underline"
                    >
                        Ver todos →
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Curso 1 */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
                        <div className="md:w-2/5 h-48 md:h-auto bg-gray-200 relative">
                            <div className="absolute top-0 left-0 bg-yellow-500 text-white text-xs font-bold px-3 py-1 m-2 rounded">
                                DESTACADO
                            </div>
                        </div>
                        <div className="md:w-3/5 p-5">
                            <div className="flex justify-between items-start mb-2">
                                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                    Principiante
                                </span>
                                <span className="text-lg font-bold text-blue-600">$49.99</span>
                            </div>
                            <h3 className="font-bold text-lg mb-2">Fundamentos de Swift para principiantes</h3>
                            <p className="text-gray-600 mb-3 text-sm">
                                Aprende Swift desde cero y construye una base sólida de programación.
                            </p>
                            <Link
                                href="/cursos/fundamentos-swift"
                                className="text-blue-600 font-medium text-sm"
                            >
                                Ver detalles →
                            </Link>
                        </div>
                    </div>

                    {/* Curso 2 */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
                        <div className="md:w-2/5 h-48 md:h-auto bg-gray-200 relative">
                            <div className="absolute top-0 left-0 bg-yellow-500 text-white text-xs font-bold px-3 py-1 m-2 rounded">
                                DESTACADO
                            </div>
                        </div>
                        <div className="md:w-3/5 p-5">
                            <div className="flex justify-between items-start mb-2">
                                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                    Intermedio
                                </span>
                                <span className="text-lg font-bold text-blue-600">$69.99</span>
                            </div>
                            <h3 className="font-bold text-lg mb-2">SwiftUI: Crea apps modernas para iOS</h3>
                            <p className="text-gray-600 mb-3 text-sm">
                                Domina SwiftUI y crea interfaces modernas y reactivas.
                            </p>
                            <Link
                                href="/cursos/swiftui-completo"
                                className="text-blue-600 font-medium text-sm"
                            >
                                Ver detalles →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Latest Blog Posts */}
            <section>
                <h2 className="text-2xl font-bold mb-6">Últimas publicaciones</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="flex gap-4 p-4 bg-white rounded-lg shadow-sm"
                        >
                            <div className="w-24 h-24 bg-gray-200 flex-shrink-0"></div>
                            <div>
                                <h3 className="font-semibold mb-1">Novedades de Swift {6 + i - 1}</h3>
                                <p className="text-gray-600 text-sm mb-2">Abril {10 + i}, 2025</p>
                                <p className="text-gray-700 text-sm line-clamp-2">
                                    Descubre las últimas características y mejoras en el lenguaje Swift.
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Newsletter */}
            <section className="bg-blue-50 p-8 rounded-xl">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-2xl font-bold mb-2">¿Quieres recibir nuevos tutoriales?</h2>
                    <p className="text-gray-600 mb-6">
                        Suscríbete a nuestro boletín y recibe tutoriales, noticias y recursos sobre Swift y SwiftUI.
                    </p>
                    <form className="flex gap-2 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Tu correo electrónico"
                            className="flex-grow px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Suscribirse
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}
