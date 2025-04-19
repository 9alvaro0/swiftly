// src/components/layout/footer/FooterSocialLinks.tsx
import React from "react";
import { GithubIcon, TwitterIcon, MailIcon, LinkedinIcon } from "lucide-react";

interface SocialLink {
    name: string;
    href: string;
    icon: React.ReactNode;
}

const socialLinks: SocialLink[] = [
    {
        name: "Twitter",
        href: "https://twitter.com/swiftly",
        icon: <TwitterIcon size={18} />,
    },
    {
        name: "GitHub",
        href: "https://github.com/swiftly",
        icon: <GithubIcon size={18} />,
    },
    {
        name: "LinkedIn",
        href: "https://linkedin.com/in/swiftly",
        icon: <LinkedinIcon size={18} />,
    },
    {
        name: "Email",
        href: "mailto:info@swiftly.dev",
        icon: <MailIcon size={18} />,
    },
];

export default function FooterSocialLinks() {
    return (
        <div className="flex space-x-4 mt-4">
            {socialLinks.map((link) => (
                <a
                    key={link.name}
                    href={link.href}
                    className="text-secondary hover:text-primary transition-colors p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                >
                    {link.icon}
                </a>
            ))}
        </div>
    );
}
