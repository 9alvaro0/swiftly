import { CheckCircle } from "lucide-react";

export default function SuccessMessage() {
    return (
        <div className="py-12 flex flex-col items-center justify-center text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mb-6" />
            <h3 className="text-xl font-medium text-white mb-2">¡Mensaje enviado!</h3>
            <p className="text-gray-300">
                Gracias por contactarnos. Te responderemos lo antes posible.
            </p>
        </div>
    );
}