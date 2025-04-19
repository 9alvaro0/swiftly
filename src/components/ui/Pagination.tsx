import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }: PaginationProps) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // No mostrar paginación si solo hay una página
    if (totalPages <= 1) return null;

    // Determinar qué páginas mostrar
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5; // Ajusta según necesites

        if (totalPages <= maxPagesToShow) {
            // Mostrar todas las páginas si hay menos que el máximo
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Lógica para mostrar páginas con elipsis
            if (currentPage <= 3) {
                // Cerca del inicio
                for (let i = 1; i <= 4; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push("ellipsis");
                pageNumbers.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                // Cerca del final
                pageNumbers.push(1);
                pageNumbers.push("ellipsis");
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pageNumbers.push(i);
                }
            } else {
                // En medio
                pageNumbers.push(1);
                pageNumbers.push("ellipsis");
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push("ellipsis");
                pageNumbers.push(totalPages);
            }
        }

        return pageNumbers;
    };

    return (
        <nav
            className="flex justify-center items-center space-x-1"
            aria-label="Paginación"
        >
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-md text-text-secondary hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50 disabled:pointer-events-none"
                aria-label="Página anterior"
            >
                <ChevronLeft size={16} />
            </button>

            <div className="flex space-x-1">
                {getPageNumbers().map((page, index) => {
                    if (page === "ellipsis") {
                        return (
                            <span
                                key={`ellipsis-${index}`}
                                className="px-3 py-2 text-text-secondary"
                            >
                                ...
                            </span>
                        );
                    }

                    return (
                        <button
                            key={`page-${page}`}
                            onClick={() => onPageChange(page as number)}
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
                    );
                })}
            </div>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md text-text-secondary hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50 disabled:pointer-events-none"
                aria-label="Página siguiente"
            >
                <ChevronRight size={16} />
            </button>
        </nav>
    );
}
