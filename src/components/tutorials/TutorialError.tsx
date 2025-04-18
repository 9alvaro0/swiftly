// src/components/tutorials/TutorialError.tsx

interface TutorialErrorProps {
    message?: string;
}

export default function TutorialError({
    message = "Ocurrió un error al intentar cargar este tutorial. Por favor, inténtalo más tarde.",
}: TutorialErrorProps) {
    return (
        <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-2xl font-bold text-red-500">Error al cargar el tutorial</h1>
            <p className="mt-4">{message}</p>
        </div>
    );
}
