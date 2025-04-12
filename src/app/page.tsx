export default function Home() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Bienvenido a Mi Proyecto</h1>
            <p className="text-lg text-gray-700">
                Este es un proyecto base con Next.js y React para empezar a desarrollar tu aplicación.
            </p>
            <div className="bg-gray-100 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">Características</h2>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Arquitectura organizada</li>
                    <li>Componentes de layout reutilizables</li>
                    <li>Diseño responsive</li>
                    <li>Rutas configuradas</li>
                </ul>
            </div>
        </div>
    );
}
