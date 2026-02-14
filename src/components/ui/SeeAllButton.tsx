// src/components/ui/SeeAllButton.tsx

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SeeAllButtonProps {
    link: string;
    selectedAccent?: string;
}

export default function SeeAllButton({ link, selectedAccent }: SeeAllButtonProps) {
    return (
        <Link
            href={link}
            className={`group flex items-center px-4 py-2 rounded-lg bg-gradient-to-r ${selectedAccent} border-[1px] font-medium transition-all`}
        >
            <span className="mr-1">Ver todos</span>
            <ArrowRight
                size={16}
                className="transform group-hover:translate-x-1 transition-transform duration-200"
            />
        </Link>
    );
}
