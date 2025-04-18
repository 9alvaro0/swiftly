'use client'

import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

export default function CourseDetailPage() {
    const routeParams = useParams();
    const course = {
        id: routeParams.slug,
        title: "Fundamentos de Swift para principiantes",
        description:
            "Un curso completo para principiantes que cubre todos los aspectos fundamentales del lenguaje Swift, desde variables y tipos de datos hasta protocolos y extensiones. Este curso te dará una base sólida para empezar a desarrollar aplicaciones iOS.",
        level: "Principiante",
        duration: "8 semanas",
        lessons: 24,
        instructor: {
            name: "María González",
            bio: "Desarrolladora iOS con más de 8 años de experiencia. Ha trabajado en varias aplicaciones de éxito y es una instructora certificada por Apple.",
            image: "/images/instructors/maria-gonzalez.jpg",
        },
        price: "$49.99",
        rating: {
            value: 4.8,
            count: 342,
        },
        updated: "Abril 2025",
        language: "Español",
        includes: [
            "24 lecciones en video",
            "Acceso de por vida",
            "15 ejercicios prácticos",
            "5 proyectos completos",
            "Certificado de finalización",
            "Acceso a comunidad privada",
        ],
        requirements: [
            "No se requiere experiencia previa en programación",
            "Mac con Xcode instalado (se explica en el curso)",
            "Conexión a internet para descargar recursos",
        ],
        modules: [
            {
                title: "Introducción a Swift y Xcode",
                lessons: [
                    { title: "Bienvenida al curso", duration: "5:20", preview: true },
                    { title: "Instalación de Xcode", duration: "10:15", preview: true },
                    { title: "Tu primer programa en Swift", duration: "15:30", preview: false },
                    { title: "Navegando por Xcode", duration: "12:45", preview: false },
                ],
            },
            {
                title: "Fundamentos del lenguaje",
                lessons: [
                    { title: "Variables y constantes", duration: "18:10", preview: false },
                    { title: "Tipos de datos básicos", duration: "20:05", preview: false },
                    { title: "Operadores", duration: "15:45", preview: false },
                    { title: "Control de flujo", duration: "25:30", preview: false },
                    { title: "Ejercicio práctico: Calculadora simple", duration: "30:00", preview: false },
                ],
            },
            {
                title: "Colecciones y funciones",
                lessons: [
                    { title: "Arrays", duration: "22:15", preview: false },
                    { title: "Diccionarios", duration: "18:40", preview: false },
                    { title: "Sets", duration: "12:20", preview: false },
                    { title: "Funciones básicas", duration: "24:10", preview: false },
                    { title: "Parámetros y retornos", duration: "20:35", preview: false },
                    { title: "Proyecto: Creando una lista de tareas", duration: "45:00", preview: false },
                ],
            },
            // Más módulos...
        ],
        students: 1245,
        relatedCourses: [
            { id: "swiftui-completo", title: "SwiftUI: Crea apps modernas para iOS" },
            { id: "swift-avanzado", title: "Swift Avanzado: Patrones y optimización" },
        ],
    };

    return (
        <div className="max-w-6xl mx-auto">
            {/* Breadcrumbs */}
            <div className="text-sm mb-6">
                <Link
                    href="/courses"
                    className="text-blue-600 hover:underline"
                >
                    Cursos
                </Link>
                <span className="mx-2">/</span>
                <span className="text-gray-500">{course.title}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Columna principal */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Cabecera del curso */}
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className=" text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                {course.level}
                            </span>
                            <span className="text-sm text-gray-500">Última actualización: {course.updated}</span>
                        </div>

                        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
                        <p className="text-lg text-gray-600 mb-4">{course.description}</p>

                        <div className="flex items-center mb-4">
                            <div className="flex items-center">
                                {/* Estrellas del rating */}
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`w-5 h-5 ${
                                            i < Math.floor(course.rating.value) ? "text-yellow-400" : "text-gray-300"
                                        }`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                                <span className="ml-2 text-sm font-bold text-gray-700">{course.rating.value}</span>
                                <span className="ml-1 text-sm text-gray-500">({course.rating.count} valoraciones)</span>
                            </div>

                            <span className="mx-4 text-gray-300">|</span>

                            <div className="flex items-center">
                                <svg
                                    className="w-5 h-5 mr-1 text-gray-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                </svg>
                                <span className="text-sm text-gray-500">{course.students} estudiantes</span>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                            <div>
                                <p className="font-medium">{course.instructor.name}</p>
                                <p className="text-sm text-gray-500">Instructor</p>
                            </div>
                        </div>
                    </div>

                    {/* Contenido del curso */}
                    <div className="rounded-lg border shadow-sm p-6">
                        <h2 className="text-2xl font-bold mb-6">Contenido del curso</h2>

                        <div className="mb-4">
                            <div className="flex justify-between text-sm text-gray-500 mb-2">
                                <span>{course.modules.length} módulos</span>
                                <span>{course.lessons} lecciones</span>
                                <span>{course.duration} de duración total</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {course.modules.map((module, moduleIndex) => (
                                <div
                                    key={moduleIndex}
                                    className="border rounded-lg overflow-hidden"
                                >
                                    <div className="bg-gray-50 p-4 flex justify-between items-center">
                                        <h3 className="font-medium">{module.title}</h3>
                                        <span className="text-sm text-gray-500">{module.lessons.length} lecciones</span>
                                    </div>

                                    <div className="divide-y">
                                        {module.lessons.map((lesson, lessonIndex) => (
                                            <div
                                                key={lessonIndex}
                                                className="p-4 flex justify-between items-center hover:bg-gray-50"
                                            >
                                                <div className="flex items-center">
                                                    {lesson.preview ? (
                                                        <svg
                                                            className="w-5 h-5 mr-3 text-blue-600"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                                            />
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                    ) : (
                                                        <svg
                                                            className="w-5 h-5 mr-3 text-gray-400"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                                            />
                                                        </svg>
                                                    )}
                                                    <span className={lesson.preview ? "text-blue-600" : ""}>
                                                        {lesson.title}
                                                        {lesson.preview && (
                                                            <span className="ml-2 text-xs font-medium">(Preview)</span>
                                                        )}
                                                    </span>
                                                </div>
                                                <span className="text-sm text-gray-500">{lesson.duration}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Requisitos */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Requisitos</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            {course.requirements.map((req, index) => (
                                <li
                                    key={index}
                                    className="text-gray-600"
                                >
                                    {req}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Instructor */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Sobre el instructor</h2>
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                            <div className="md:w-1/4 flex-shrink-0">
                                <div className="h-32 w-32 rounded-full"></div>
                            </div>
                            <div className="md:w-3/4">
                                <h3 className="text-xl font-bold mb-2">{course.instructor.name}</h3>
                                <p className="text-gray-600 mb-4">{course.instructor.bio}</p>
                            </div>
                        </div>
                    </div>

                    {/* Cursos relacionados */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Cursos relacionados</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {course.relatedCourses.map((related) => (
                                <Link
                                    key={related.id}
                                    href={`/courses/${related.id}`}
                                    className="p-4 border rounded-lg hover:bg-blue-50 transition-colors"
                                >
                                    <h3 className="font-medium">{related.title}</h3>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <div className="rounded-lg border shadow-sm p-6 sticky top-24">
                        <div className="h-48 bg-gray-200 mb-4 rounded"></div>

                        <div className="mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-3xl font-bold">{course.price}</span>
                            </div>
                        </div>

                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded mb-3">
                            Comprar ahora
                        </button>

                        <button className="w-full bg-white hover:bg-gray-100 text-gray-800 font-medium py-3 px-4 rounded border mb-6">
                            Añadir al carrito
                        </button>

                        <div className="space-y-4">
                            <h3 className="font-bold text-lg">Este curso incluye:</h3>
                            <ul className="space-y-2">
                                {course.includes.map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start"
                                    >
                                        <svg
                                            className="w-5 h-5 mr-2 text-green-500 flex-shrink-0"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                        <span className="text-gray-600">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-500 mb-2">¿No estás seguro? Ofrecemos una</p>
                            <p className="font-medium">Garantía de devolución de 30 días</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
