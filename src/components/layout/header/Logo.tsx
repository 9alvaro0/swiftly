// src/components/layout/header/Logo.tsx

import Link from "next/link";

export default function Logo() {
    return (
        <Link
            href="/"
            className="flex items-center space-x-2 text-primary"
        >
            <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary"
            >
                <path
                    d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                />
                <path
                    d="M15.5 9L10.5 14L8.5 12"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="currentColor"
                />
            </svg>
            <span className="text-xl font-bold tracking-tight">Swiftly</span>
        </Link>
    );
}
