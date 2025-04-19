// src/components/ui/SectionHeader.tsx

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeaderProps {
    title: string;
    link: string;
    subtitle?: string;
}

export default function SectionHeader({ title, link, subtitle }: SectionHeaderProps) {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
                <h2 className="text-2xl font-bold text-white">{title}</h2>
                {subtitle && <p className="text-white/60 mt-1 text-sm md:text-base max-w-2xl">{subtitle}</p>}
            </div>

            <Link
                href={link}
                className="group flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
                <span className="mr-1">Ver todos</span>
                <ArrowRight
                    size={16}
                    className="transform group-hover:translate-x-1 transition-transform duration-200"
                />
            </Link>
        </div>
    );
}
