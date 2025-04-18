// src/components/layout/footer/FooterLinkList.tsx

import React from "react";

interface FooterLinkListProps {
    children: React.ReactNode;
}

export default function FooterLinkList({ children }: FooterLinkListProps) {
    return <ul className="space-y-3">{children}</ul>;
}
