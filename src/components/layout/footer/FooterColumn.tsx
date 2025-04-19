// src/components/layout/footer/FooterColumn.tsx

import React from "react";

interface FooterColumnProps {
    title: string;
    children: React.ReactNode;
}

export default function FooterColumn({ title, children }: FooterColumnProps) {
    return (
        <div>
            <h3 className="font-bold text-base mb-4 text-primary tracking-wide uppercase">{title}</h3>
            {children}
        </div>
    );
}
