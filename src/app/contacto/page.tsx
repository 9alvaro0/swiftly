export default function ContactPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Contacto</h1>
            <p className="text-lg text-gray-700 mb-8">
                Estamos aquí para responder tus preguntas. Completa el formulario y nos pondremos en contacto contigo
                pronto.
            </p>

            <form className="max-w-lg mx-auto">
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-gray-700 mb-2"
                    >
                        Nombre
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Tu nombre"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-gray-700 mb-2"
                    >
                        Correo electrónico
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="tucorreo@ejemplo.com"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="message"
                        className="block text-gray-700 mb-2"
                    >
                        Mensaje
                    </label>
                    <textarea
                        id="message"
                        rows={5}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Escribe tu mensaje aquí..."
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Enviar mensaje
                </button>
            </form>
        </div>
    );
}
