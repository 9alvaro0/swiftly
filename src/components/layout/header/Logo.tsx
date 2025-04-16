// src/components/layout/header/Logo.tsx

import Image from "next/image";
import Link from "next/link";

export default function Logo() {
    return (
        <Link
            href="/"
            className="flex items-center space-x-2 text-primary"
        >
            <Image
                src="/icons/logo.png"
                className="rounded-full"
                alt="Logo"
                width={40}
                height={40}
            />
            <span className="text-xl font-bold tracking-tight">Swiftly</span>
        </Link>
    );
}
