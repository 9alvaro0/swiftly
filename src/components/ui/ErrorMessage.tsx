// src/components/ui/ErrorMessage.tsx
interface ErrorMessageProps {
    message: string;
    className?: string;
}

export function ErrorMessage({ message, className = "" }: ErrorMessageProps) {
    return <p className={`text-red-500 text-sm mt-2 ${className}`}>{message}</p>;
}
