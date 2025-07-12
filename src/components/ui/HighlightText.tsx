// src/components/ui/HighlightText.tsx

interface HighlightTextProps {
    text: string;
    searchTerm: string;
    className?: string;
}

export default function HighlightText({ text, searchTerm, className = "" }: HighlightTextProps) {
    if (!searchTerm || searchTerm.length < 2) {
        return <span className={className}>{text}</span>;
    }

    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);

    return (
        <span className={className}>
            {parts.map((part, index) => {
                if (regex.test(part)) {
                    return (
                        <mark
                            key={index}
                            className="bg-yellow-200 dark:bg-yellow-900/50 text-yellow-900 dark:text-yellow-200 px-0.5 rounded"
                        >
                            {part}
                        </mark>
                    );
                }
                return part;
            })}
        </span>
    );
}