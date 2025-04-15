import Link from "next/link";
import React from "react";

export default function CoursesPage() {
    // Datos de ejemplo para cursos
    const courses = [
        {
            id: "fundamentos-swift",
            title: "Fundamentos de Swift para principiantes",
            description: "Aprende Swift desde cero y construye una base sólida de programación.",
            level: "Principiante",
            duration: "8 semanas",
            lessons: 24,
            instructor: "María González",
            price: "$49.99",
            image: "/images/courses/swift-basics.jpg",
            featured: true,
        },
        {
            id: "swiftui-completo",
            title: "SwiftUI: Crea apps modernas para iOS",
            description: "Domina SwiftUI y crea interfaces modernas y reactivas.",
            level: "Intermedio",
            duration: "10 semanas",
            lessons: 32,
            instructor: "Carlos Rodríguez",
            price: "$69.99",
            image: "/images/courses/swiftui-master.jpg",
            featured: true,
        },
        {
            id: "swift-avanzado",
            title: "Swift Avanzado: Patrones y optimización",
            description: "Técnicas avanzadas, patrones de diseño y optimización de rendimiento.",
            level: "Avanzado",
            duration: "6 semanas",
            lessons: 18,
            instructor: "Laura Martínez",
            price: "$79.99",
            image: "/images/courses/advanced-swift.jpg",
            featured: false,
        },
        {
            id: "desarrollo-apis-swift",
            title: "Desarrollo de APIs RESTful con Swift y Vapor",
            description: "Aprende a crear APIs robustas usando Swift en el backend con Vapor.",
            level: "Intermedio",
            duration: "5 semanas",
            lessons: 15,
            instructor: "Alejandro Torres",
            price: "$59.99",
            image: "/images/courses/swift-apis.jpg",
            featured: false,
        },
        {
            id: "arquitectura-ios",
            title: "Arquitectura de aplicaciones iOS",
            description: "MVVM, Clean Architecture y mejores prácticas para aplicaciones escalables.",
            level: "Avanzado",
            duration: "7 semanas",
            lessons: 21,
            instructor: "Sofía López",
            price: "$89.99",
            image: "/images/courses/ios-architecture.jpg",
            featured: false,
        },
        {
            id: "testing-ios",
            title: "Testing en iOS: De lo básico a lo avanzado",
            description: "Implementa estrategias de prueba efectivas para tus aplicaciones iOS.",
            level: "Intermedio",
            duration: "4 semanas",
            lessons: 12,
            instructor: "Miguel Sánchez",
            price: "$49.99",
            image: "/images/courses/ios-testing.jpg",
            featured: false,
        },
    ];

    // Filtrar cursos destacados
    const featuredCourses = courses.filter((course) => course.featured);
    const regularCourses = courses.filter((course) => !course.featured);

    return (
        <div className="space-y-10">
            <div className="space-y-4">
                <h1 className="text-3xl font-bold">Cursos de Swift y SwiftUI</h1>
                <p className="text-lg text-gray-600">
                    Cursos completos y estructurados para dominar el desarrollo de aplicaciones iOS
                </p>
            </div>

            {/* Cursos destacados */}
            <section>
                <h2 className="text-2xl font-bold mb-6">Cursos destacados</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {featuredCourses.map((course) => (
                        <Link
                            key={course.id}
                            href={`/courses/${course.id}`}
                            className="flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="md:w-2/5 bg-gray-200 h-48 md:h-auto relative">
                                {/* Aquí iría la imagen del curso */}
                                <div className="absolute top-0 left-0 bg-yellow-500 text-white text-xs font-bold px-3 py-1 m-2 rounded">
                                    DESTACADO
                                </div>
                            </div>
                            <div className="md:w-3/5 p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                        {course.level}
                                    </span>
                                    <span className="text-lg font-bold text-blue-600">{course.price}</span>
                                </div>
                                <h3 className="font-bold text-xl mb-2">{course.title}</h3>
                                <p className="text-gray-600 mb-4">{course.description}</p>
                                <div className="flex items-center text-sm text-gray-500 mb-4">
                                    <span className="flex items-center mr-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        {course.duration}
                                    </span>
                                    <span className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                            />
                                        </svg>
                                        {course.lessons} lecciones
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <div className="mr-2 h-8 w-8 bg-gray-300 rounded-full"></div>
                                    <span className="text-sm text-gray-700">{course.instructor}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Todos los cursos */}
            <section>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Todos los cursos</h2>

                    <div className="flex items-center space-x-2">
                        <label
                            htmlFor="sort"
                            className="text-sm text-gray-600"
                        >
                            Ordenar por:
                        </label>
                        <select
                            id="sort"
                            className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option value="popular">Popularidad</option>
                            <option value="newest">Más recientes</option>
                            <option value="price-low">Precio: Menor a mayor</option>
                            <option value="price-high">Precio: Mayor a menor</option>
                        </select>
                    </div>
                </div>

                {/* Filtros */}
                <div className="flex flex-wrap gap-4 py-4 mb-6 bg-gray-50 p-4 rounded-lg">
                    <div>
                        <label
                            htmlFor="level"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Nivel
                        </label>
                        <select
                            id="level"
                            className="text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option value="">Todos</option>
                            <option value="beginner">Principiante</option>
                            <option value="intermediate">Intermedio</option>
                            <option value="advanced">Avanzado</option>
                        </select>
                    </div>
                    <div>
                        <label
                            htmlFor="duration"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Duración
                        </label>
                        <select
                            id="duration"
                            className="text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option value="">Cualquier duración</option>
                            <option value="short">Corto 5 semanas</option>
                            <option value="medium">Medio (5-8 semanas)</option>
                            <option value="long">Largo 8 semanas</option>
                        </select>
                    </div>
                    <div>
                        <label
                            htmlFor="price"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Precio
                        </label>
                        <select
                            id="price"
                            className="text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option value="">Todos</option>
                            <option value="low">Hasta $50</option>
                            <option value="medium">$50 - $75</option>
                            <option value="high">Más de $75</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {regularCourses.map((course) => (
                        <Link
                            key={course.id}
                            href={`/courses/${course.id}`}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
                        >
                            <div className="h-48 bg-gray-200 relative">{/* Aquí iría la imagen del curso */}</div>
                            <div className="p-5 flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                        {course.level}
                                    </span>
                                    <span className="text-lg font-bold text-blue-600">{course.price}</span>
                                </div>
                                <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                                <div className="flex items-center text-sm text-gray-500 mt-auto">
                                    <span className="flex items-center mr-3">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        {course.duration}
                                    </span>
                                    <span className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                            />
                                        </svg>
                                        {course.lessons} lecciones
                                    </span>
                                </div>
                            </div>
                            <div className="px-5 py-3 bg-gray-50 border-t flex items-center">
                                <div className="mr-2 h-6 w-6 bg-gray-300 rounded-full"></div>
                                <span className="text-sm text-gray-700">{course.instructor}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-blue-50 p-8 rounded-xl text-center">
                <h2 className="text-2xl font-bold mb-4">¿No encuentras lo que buscas?</h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                    Estamos constantemente añadiendo nuevos cursos. Si tienes alguna sugerencia o petición, háznolo
                    saber.
                </p>
                <Link
                    href="/contacto"
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Solicitar un curso
                </Link>
            </section>
        </div>
    );
}
