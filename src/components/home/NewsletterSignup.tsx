// src/components/home/NewsletterSignup.tsx
export default function NewsletterSignup() {
    return (
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
                        className="btn-primary"
                    >
                        Suscribirse
                    </button>
                </form>
            </div>
        </section>
    );
}
