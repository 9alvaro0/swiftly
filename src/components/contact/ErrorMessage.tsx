interface ErrorMessageProps {
    error: string;
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
    return (
        <div className="mt-4 text-red-500 text-center">
            <p>{error}</p>
        </div>
    );
}