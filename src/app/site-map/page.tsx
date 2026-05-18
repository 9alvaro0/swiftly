// src/app/site-map/page.tsx

import { Metadata } from "next";
import Link from "next/link";
import { Map, FileText, Tag, Home, BookOpen } from "lucide-react";

export const metadata: Metadata = {
    title: "Sitemap - aprendeSwift",
    description: "Explore all pages and content available on aprendeSwift. Find articles, tutorials, and resources.",
    openGraph: {
        title: "Sitemap - aprendeSwift",
        description: "Explore all pages and content available on aprendeSwift. Find articles, tutorials, and resources.",
    },
};

export default function SitemapPage() {
    const siteStructure = [
        {
            title: "Main Pages",
            icon: Home,
            links: [
                { name: "Home", href: "/", description: "Welcome to aprendeSwift" },
                { name: "Posts", href: "/posts", description: "All articles and posts" },
                { name: "Tutorials", href: "/tutorials", description: "Step-by-step learning guides" },
                { name: "Tags", href: "/tags", description: "Browse content by topics" },
                { name: "Contact", href: "/contact", description: "Get in touch with us" },
            ],
        },
        {
            title: "Resources",
            icon: BookOpen,
            links: [
                { name: "Newsletter", href: "/newsletter", description: "Subscribe to our newsletter" },
                { name: "RSS Feed", href: "/feed.xml", description: "RSS feed for content updates", external: true },
                { name: "Atom Feed", href: "/atom.xml", description: "Atom feed format", external: true },
                { name: "JSON Feed", href: "/feed.json", description: "JSON feed format", external: true },
            ],
        },
        {
            title: "Legal",
            icon: FileText,
            links: [
                { name: "Privacy Policy", href: "/privacy", description: "How we handle your data" },
                { name: "Terms of Service", href: "/terms", description: "Terms and conditions" },
                { name: "Cookie Policy", href: "/cookies", description: "Information about cookies" },
            ],
        },
    ];

    return (
        <div className="min-h-screen">
            <div className="container mx-auto max-w-4xl px-4 py-8">
                {/* Header */}
                <div className="mb-12 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-blue-600/20 rounded-full">
                            <Map className="w-12 h-12 text-blue-400" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Sitemap
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Explore all the pages and content available on aprendeSwift. 
                        Find articles, tutorials, and resources to accelerate your learning.
                    </p>
                </div>

                {/* Site Structure */}
                <div className="space-y-12">
                    {siteStructure.map((section, index) => (
                        <div key={index} className="bg-gray-900/50 rounded-xl border border-gray-700 p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-blue-600/20 rounded-lg">
                                    <section.icon className="w-6 h-6 text-blue-400" />
                                </div>
                                <h2 className="text-2xl font-semibold text-white">
                                    {section.title}
                                </h2>
                            </div>
                            
                            <div className="grid gap-4 md:grid-cols-2">
                                {section.links.map((link, linkIndex) => (
                                    <div key={linkIndex} className="group">
                                        {link.external ? (
                                            <a
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-start gap-3 p-4 rounded-lg border border-gray-700 hover:border-blue-500/50 bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-200"
                                            >
                                                <FileText className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors">
                                                        {link.name}
                                                    </h3>
                                                    <p className="text-gray-400 text-sm mt-1">
                                                        {link.description}
                                                    </p>
                                                </div>
                                            </a>
                                        ) : (
                                            <Link
                                                href={link.href}
                                                className="flex items-start gap-3 p-4 rounded-lg border border-gray-700 hover:border-blue-500/50 bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-200"
                                            >
                                                <FileText className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors">
                                                        {link.name}
                                                    </h3>
                                                    <p className="text-gray-400 text-sm mt-1">
                                                        {link.description}
                                                    </p>
                                                </div>
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional Info */}
                <div className="mt-12 bg-gray-900/50 rounded-xl border border-gray-700 p-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-600/20 rounded-lg">
                            <Tag className="w-6 h-6 text-blue-400" />
                        </div>
                        <h2 className="text-2xl font-semibold text-white">
                            Dynamic Content
                        </h2>
                    </div>
                    <div className="text-gray-300 space-y-4">
                        <p>
                            In addition to the pages listed above, aprendeSwift includes dynamic content that 
                            grows over time:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Individual blog posts accessible via <code className="bg-gray-800 px-2 py-1 rounded text-blue-400">/posts/[slug]</code></li>
                            <li>Tutorial pages accessible via <code className="bg-gray-800 px-2 py-1 rounded text-blue-400">/tutorials/[slug]</code></li>
                            <li>Tag pages accessible via <code className="bg-gray-800 px-2 py-1 rounded text-blue-400">/tags/[slug]</code></li>
                        </ul>
                        <p className="text-sm text-gray-400 mt-6">
                            This sitemap is automatically updated as new content is published. 
                            For a machine-readable version, visit our{" "}
                            <a 
                                href="/sitemap.xml" 
                                className="text-blue-400 hover:text-blue-300 transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                XML sitemap
                            </a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}