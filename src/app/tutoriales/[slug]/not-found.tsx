import Link from "next/link";

export default function TutorialNotFound() {
    return (
        <div className="py-16 px-4 text-center max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-4 text-text-primary">Tutorial no encontrado</h1>
            <p className="text-xl text-text-secondary mb-8">
                El tutorial que estás buscando no existe o no está disponible en este momento.
            </p>
            <Link
                href="/tutoriales"
                className="inline-block bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark transition-colors"
            >
                Ver todos los tutoriales
            </Link>
        </div>
    );
}
