// src/app/cookies/page.tsx

import { Metadata } from "next";
import Link from "next/link";
import { Cookie, Settings, BarChart3, Shield } from "lucide-react";

export const metadata: Metadata = {
    title: "Cookie Policy - aprendeSwift",
    description: "Learn about how we use cookies and similar technologies at aprendeSwift.",
    openGraph: {
        title: "Cookie Policy - aprendeSwift",
        description: "Learn about how we use cookies and similar technologies at aprendeSwift.",
    },
};

export default function CookiesPage() {
    return (
        <div className="min-h-screen">
            <div className="container mx-auto max-w-4xl px-4 py-8">
                {/* Header */}
                <div className="mb-12 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-blue-600/20 rounded-full">
                            <Cookie className="w-12 h-12 text-blue-400" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Cookie Policy
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Learn about how we use cookies and similar technologies to improve 
                        your experience on aprendeSwift.
                    </p>
                </div>

                {/* Content */}
                <div className="bg-gray-900/50 rounded-xl border border-gray-700 p-8">
                    <div className="prose prose-gray max-w-none">
                        <div className="text-gray-300 space-y-8">
                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <Cookie className="w-6 h-6 text-blue-400" />
                                    <h2 className="text-2xl font-semibold text-white">What Are Cookies?</h2>
                                </div>
                                <p className="mb-4">
                                    Cookies are small text files that are stored on your device when you visit a website. 
                                    They help us provide you with a better experience by remembering your preferences 
                                    and analyzing how you use our site.
                                </p>
                            </section>

                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <Settings className="w-6 h-6 text-blue-400" />
                                    <h2 className="text-2xl font-semibold text-white">Types of Cookies We Use</h2>
                                </div>
                                
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-2">Essential Cookies</h3>
                                        <p className="mb-2">
                                            These cookies are necessary for the website to function properly and cannot be disabled.
                                        </p>
                                        <ul className="list-disc list-inside space-y-1 ml-4">
                                            <li>Authentication and session management</li>
                                            <li>Security and fraud prevention</li>
                                            <li>Site functionality and navigation</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-2">Performance Cookies</h3>
                                        <p className="mb-2">
                                            These help us understand how visitors interact with our website.
                                        </p>
                                        <ul className="list-disc list-inside space-y-1 ml-4">
                                            <li>Page load times and performance metrics</li>
                                            <li>Most popular content and features</li>
                                            <li>Error reporting and debugging</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-2">Functional Cookies</h3>
                                        <p className="mb-2">
                                            These enhance your experience by remembering your preferences.
                                        </p>
                                        <ul className="list-disc list-inside space-y-1 ml-4">
                                            <li>Language and region preferences</li>
                                            <li>Theme settings (dark/light mode)</li>
                                            <li>User interface customizations</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <BarChart3 className="w-6 h-6 text-blue-400" />
                                    <h2 className="text-2xl font-semibold text-white">Third-Party Services</h2>
                                </div>
                                <p className="mb-4">
                                    We use the following third-party services that may set cookies:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li><strong>Firebase:</strong> For authentication, database, and hosting services</li>
                                    <li><strong>Google Analytics:</strong> To understand site usage and improve content</li>
                                    <li><strong>GitHub:</strong> For social authentication and profile information</li>
                                </ul>
                            </section>

                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <Shield className="w-6 h-6 text-blue-400" />
                                    <h2 className="text-2xl font-semibold text-white">Your Cookie Choices</h2>
                                </div>
                                <p className="mb-4">
                                    You have several options to control cookies:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>
                                        <strong>Browser Settings:</strong> You can configure your browser to block or delete cookies. 
                                        Note that this may affect site functionality.
                                    </li>
                                    <li>
                                        <strong>Opt-out Links:</strong> You can opt out of analytics cookies through Google Analytics 
                                        opt-out tools.
                                    </li>
                                    <li>
                                        <strong>Private Browsing:</strong> Use incognito/private browsing mode to prevent 
                                        cookies from being stored.
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">Data Retention</h2>
                                <p className="mb-4">
                                    Different cookies have different expiration times:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li><strong>Session cookies:</strong> Deleted when you close your browser</li>
                                    <li><strong>Persistent cookies:</strong> Remain for a specified period (usually 30 days to 2 years)</li>
                                    <li><strong>Analytics cookies:</strong> Typically expire after 2 years</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">Changes to This Policy</h2>
                                <p className="mb-4">
                                    We may update this cookie policy to reflect changes in our practices or for legal reasons. 
                                    We will notify you of any significant changes.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">Contact</h2>
                                <p>
                                    If you have questions about our use of cookies, you can contact us at:{" "}
                                    <Link 
                                        href="/contact" 
                                        className="text-blue-400 hover:text-blue-300 transition-colors"
                                    >
                                        info@aprendeswift.dev
                                    </Link>
                                </p>
                            </section>

                            <section className="pt-6 border-t border-gray-700">
                                <p className="text-gray-400 text-sm">
                                    <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US')}
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}