// src/components/ui/ErrorMessage.tsx
interface ErrorMessageProps {
    message: string;
    className?: string;
}

export function ErrorMessage({ message, className = "" }: ErrorMessageProps) {
    return <p className={`text-red-500 text-sm mt-2 ${className}`}>{message}</p>;
}

// Backwards-compatible default export for contact form usage
export default function ErrorMessageDefault({ error, message, className }: { error?: string; message?: string; className?: string }) {
    const text = message || error || "";
    if (!text) return null;
    return (
        <div className={`mt-4 text-red-500 text-center ${className || ""}`}>
            <p>{text}</p>
        </div>
    );
}
