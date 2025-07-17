// src/app/terms/page.tsx

import { Metadata } from "next";
import Link from "next/link";
import { FileText, Users, AlertTriangle, Scale } from "lucide-react";

export const metadata: Metadata = {
    title: "Terms and Conditions - aprendeSwift",
    description: "Learn about the terms and conditions of using aprendeSwift and our content policies.",
    openGraph: {
        title: "Terms and Conditions - aprendeSwift",
        description: "Learn about the terms and conditions of using aprendeSwift and our content policies.",
    },
};

export default function TermsPage() {
    return (
        <div className="min-h-screen">
            <div className="container mx-auto max-w-4xl px-4 py-8">
                {/* Header */}
                <div className="mb-12 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-blue-600/20 rounded-full">
                            <FileText className="w-12 h-12 text-blue-400" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Terms and Conditions
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        These terms govern the use of aprendeSwift and establish the rules for 
                        a respectful and productive learning community.
                    </p>
                </div>

                {/* Content */}
                <div className="bg-gray-900/50 rounded-xl border border-gray-700 p-8">
                    <div className="prose prose-gray max-w-none">
                        <div className="text-gray-300 space-y-8">
                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <Scale className="w-6 h-6 text-blue-400" />
                                    <h2 className="text-2xl font-semibold text-white">Acceptance of Terms</h2>
                                </div>
                                <p className="mb-4">
                                    By accessing and using aprendeSwift, you agree to be bound by these terms and conditions. 
                                    If you do not agree to any part of these terms, you should not use our services.
                                </p>
                            </section>

                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <Users className="w-6 h-6 text-blue-400" />
                                    <h2 className="text-2xl font-semibold text-white">Use of Service</h2>
                                </div>
                                <p className="mb-4">
                                    By using aprendeSwift, you agree to:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Provide accurate and up-to-date information</li>
                                    <li>Maintain the security of your account</li>
                                    <li>Not engage in activities that could harm the service</li>
                                    <li>Respect intellectual property rights</li>
                                    <li>Comply with all applicable laws</li>
                                </ul>
                            </section>

                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <FileText className="w-6 h-6 text-blue-400" />
                                    <h2 className="text-2xl font-semibold text-white">User Content</h2>
                                </div>
                                <p className="mb-4">
                                    When you publish content on aprendeSwift:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>You retain ownership of your content</li>
                                    <li>You grant us a license to display it on our site</li>
                                    <li>You warrant that you have the right to publish such content</li>
                                    <li>You agree that it is original and does not infringe third-party rights</li>
                                    <li>You accept that we may moderate it according to our policies</li>
                                </ul>
                            </section>

                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <AlertTriangle className="w-6 h-6 text-blue-400" />
                                    <h2 className="text-2xl font-semibold text-white">Prohibited Conduct</h2>
                                </div>
                                <p className="mb-4">
                                    The following is not permitted:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Publishing offensive, discriminatory, or illegal content</li>
                                    <li>Spamming or sending unsolicited messages</li>
                                    <li>Attempting to access other users&apos; accounts</li>
                                    <li>Disrupting the service&apos;s operation</li>
                                    <li>Collecting information from other users without consent</li>
                                    <li>Using the service for commercial activities without authorization</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">Intellectual Property</h2>
                                <p className="mb-4">
                                    The educational content, tutorials, and articles on aprendeSwift are protected 
                                    by copyright. You may use them for personal learning, but not redistribute 
                                    them commercially without authorization.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">Limitation of Liability</h2>
                                <p className="mb-4">
                                    aprendeSwift is provided &quot;as is&quot;. We do not guarantee that the service 
                                    will be error-free or uninterrupted. We are not responsible for damages 
                                    arising from the use of the service.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">Termination</h2>
                                <p className="mb-4">
                                    We may suspend or terminate your access to the service if you violate these terms. 
                                    You may also delete your account at any time from your profile.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">Modifications</h2>
                                <p className="mb-4">
                                    We reserve the right to modify these terms. We will notify you about 
                                    important changes and you will have the opportunity to review the new terms.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">Contact</h2>
                                <p>
                                    If you have questions about these terms, you can contact us at:{" "}
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