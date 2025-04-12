"use client";

import React from "react";

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }: PaginationProps) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages = [];

        pages.push(1);

        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            pages.push(i);
        }

        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return [...new Set(pages)].sort((a, b) => a - b);
    };

    const pageNumbers = getPageNumbers();

    return (
        <nav className="inline-flex">
            <button
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-l-md border border-gray-300 bg-white ${
                    currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-500 hover:bg-gray-50"
                }`}
            >
                Anterior
            </button>

            {pageNumbers.map((page, index) => {
                if (index > 0 && page > pageNumbers[index - 1] + 1) {
                    return (
                        <span
                            key={`ellipsis-${page}`}
                            className="px-3 py-2 border-t border-b border-gray-300 bg-white text-gray-500"
                        >
                            ...
                        </span>
                    );
                }

                return (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`px-3 py-2 border-t border-b border-gray-300 bg-white ${
                            currentPage === page ? "text-blue-600 hover:bg-blue-50" : "text-gray-500 hover:bg-gray-50"
                        }`}
                    >
                        {page}
                    </button>
                );
            })}

            <button
                onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded-r-md border border-gray-300 bg-white ${
                    currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-gray-500 hover:bg-gray-50"
                }`}
            >
                Siguiente
            </button>
        </nav>
    );
};

export default Pagination;
