"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useMemo } from "react";

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
}

export default function Pagination({ totalItems, itemsPerPage }: PaginationProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const getPageNumbers = useMemo(() => {
        const pageNumbers: (number | "ellipsis")[] = [];
        const maxPagesToShow = 5;

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) pageNumbers.push(i);
                pageNumbers.push("ellipsis", totalPages);
            } else if (currentPage >= totalPages - 2) {
                pageNumbers.push(1, "ellipsis");
                for (let i = totalPages - 3; i <= totalPages; i++) pageNumbers.push(i);
            } else {
                pageNumbers.push(1, "ellipsis");
                for (let i = currentPage - 1; i <= currentPage + 1; i++) pageNumbers.push(i);
                pageNumbers.push("ellipsis", totalPages);
            }
        }

        return pageNumbers;
    }, [currentPage, totalPages]);

    if (totalPages <= 1) return null;

    const createPageUrl = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());
        return `${pathname}?${params.toString()}`;
    };

    const goToPage = (page: number) => {
        router.push(createPageUrl(page), { scroll: false });
    };

    return (
        <nav
            className="flex justify-center items-center space-x-1"
            aria-label="Paginación"
        >
            <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-md text-text-secondary hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50"
                aria-label="Página anterior"
            >
                <ChevronLeft size={16} />
            </button>

            <div className="flex space-x-1">
                {getPageNumbers.map((page, index) =>
                    page === "ellipsis" ? (
                        <span
                            key={`ellipsis-${index}`}
                            className="px-3 py-2 text-text-secondary"
                        >
                            ...
                        </span>
                    ) : (
                        <button
                            key={`page-${page}`}
                            onClick={() => goToPage(page)}
                            className={`px-3 py-1 rounded-md ${
                                currentPage === page
                                    ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-medium"
                                    : "text-text-primary hover:bg-neutral-100 dark:hover:bg-neutral-800"
                            }`}
                            aria-current={currentPage === page ? "page" : undefined}
                            aria-label={`Página ${page}`}
                        >
                            {page}
                        </button>
                    )
                )}
            </div>

            <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md text-text-secondary hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50"
                aria-label="Página siguiente"
            >
                <ChevronRight size={16} />
            </button>
        </nav>
    );
}
