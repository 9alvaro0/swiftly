import { FiArrowRight } from "react-icons/fi";
import Input from "@/components/ui/Input";
import Spinner from "@/components/ui/Spinner";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";

interface ContactFormProps {
    formState: {
        name: string;
        email: string;
        message: string;
    };
    errors: {
        name?: string;
        email?: string;
        message?: string;
    };
    isSubmitting: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

export default function ContactForm({ 
    formState, 
    errors, 
    isSubmitting, 
    handleChange, 
    handleSubmit 
}: ContactFormProps) {
    return (
        <form onSubmit={handleSubmit} className="space-y-2">
            <Input
                id="name"
                label="Nombre"
                value={formState.name}
                onChange={handleChange}
                placeholder="Tu nombre"
                error={errors.name}
                className="bg-gray-800 text-white border-gray-600"
            />

            <Input
                id="email"
                label="Correo electrónico"
                value={formState.email}
                onChange={handleChange}
                placeholder="tucorreo@ejemplo.com"
                error={errors.email}
                className="bg-gray-800 text-white border-gray-600"
            />

            <Textarea
                id="message"
                label="Mensaje"
                value={formState.message}
                onChange={handleChange}
                placeholder="Escribe tu mensaje aquí..."
                error={errors.message}
                className="bg-gray-800 text-white border-gray-600 resize-none"
            />

            <div className="pt-6">
                <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-all duration-300 py-3 px-4 flex items-center justify-center font-medium"
                >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center">
                            <Spinner />
                            Enviando...
                        </span>
                    ) : (
                        <span className="flex items-center justify-center">
                            Enviar mensaje <FiArrowRight className="ml-2 h-4 w-4" />
                        </span>
                    )}
                </Button>
            </div>
        </form>
    );
}