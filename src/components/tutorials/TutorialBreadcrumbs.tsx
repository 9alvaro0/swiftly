// src/components/tutorials/TutorialBreadcrumbs.tsx

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function TutorialBreadcrumbs() {
    return (
        <div className="flex items-center text-sm mb-8">
            <Link
                href="/tutorials"
                className="text-text-secondary hover:text-primary flex items-center group"
            >
                <ChevronLeft
                    size={16}
                    className="mr-1 group-hover:-translate-x-1 transition-transform"
                />
                Volver a tutoriales
            </Link>
        </div>
    );
}
