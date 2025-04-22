import { BiErrorCircle } from "react-icons/bi";

interface DetailErrorProps {
  message?: string;
}

export default function DetailError({
  message = "Ocurrió un error al intentar cargar este contenido. Por favor, inténtalo más tarde.",
}: DetailErrorProps) {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
      <div className="bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-2xl p-8 max-w-xl shadow-sm">
        <div className="flex justify-center mb-4">
          <BiErrorCircle className="text-red-500 dark:text-red-400 w-12 h-12" />
        </div>
        <h1 className="text-2xl font-semibold text-red-600 dark:text-red-400">
          Error al cargar el contenido
        </h1>
        <p className="mt-4 text-gray-700 dark:text-gray-300">{message}</p>
      </div>
    </div>
  );
}
