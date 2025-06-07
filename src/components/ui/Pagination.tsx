"use client";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
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
        <nav className="flex justify-center items-center gap-2 mt-6 select-none">
            <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg text-white/70 hover:bg-white/10 transition-all disabled:opacity-40"
                aria-label="Página anterior"
            >
                <FiChevronLeft size={18} />
            </button>

            <div className="flex gap-1">
                {getPageNumbers.map((page, index) =>
                    page === "ellipsis" ? (
                        <span
                            key={`ellipsis-${index}`}
                            className="px-3 py-2 text-white/40"
                        >
                            ...
                        </span>
                    ) : (
                        <button
                            key={`page-${page}`}
                            onClick={() => goToPage(page)}
                            className={`px-4 py-2 rounded-md backdrop-blur-md transition-all duration-200 ${
                                currentPage === page
                                    ? "bg-blue-600 text-white shadow shadow-blue-500/30"
                                    : "text-white/70 hover:bg-white/10"
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
                className="p-2 rounded-lg text-white/70 hover:bg-white/10 transition-all disabled:opacity-40"
                aria-label="Página siguiente"
            >
                <FiChevronRight size={18} />
            </button>
        </nav>
    );
}
