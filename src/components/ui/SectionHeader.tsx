// src/components/ui/SectionHeader.tsx

import Link from "next/link";

interface SectionHeaderProps {
    title: string;
    link: string;
}

export default function SectionHeader({ title, link }: SectionHeaderProps) {
    return (
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-text-primary">{title}</h2>
            <Link
                href={link}
                className="text-text-primary font-medium hover:underline flex items-center"
            >
                Ver todos
                <span className="ml-1">→</span>
            </Link>
        </div>
    );
}
