import Link from "next/link";

export default function ContactSection() {
    return (
        <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Contacto</h2>
            <p>
                Si tienes preguntas sobre nuestro uso de almacenamiento local, puedes contactarnos:{" "}
                <Link 
                    href="/contact" 
                    className="text-blue-400 hover:text-blue-300 transition-colors underline"
                >
                    a través del formulario de contacto
                </Link>
            </p>
        </section>
    );
}