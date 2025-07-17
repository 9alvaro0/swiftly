// src/app/privacy/page.tsx

import { Metadata } from "next";
import Link from "next/link";
import { Shield, Eye, Database, Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
    title: "Privacy Policy - aprendeSwift",
    description: "Learn how we protect your personal information and what data we collect at aprendeSwift.",
    openGraph: {
        title: "Privacy Policy - aprendeSwift",
        description: "Learn how we protect your personal information and what data we collect at aprendeSwift.",
    },
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen">
            <div className="container mx-auto max-w-4xl px-4 py-8">
                {/* Header */}
                <div className="mb-12 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-blue-600/20 rounded-full">
                            <Shield className="w-12 h-12 text-blue-400" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Your privacy is important to us. This policy explains how we collect, 
                        use, and protect your personal information.
                    </p>
                </div>

                {/* Content */}
                <div className="bg-gray-900/50 rounded-xl border border-gray-700 p-8">
                    <div className="prose prose-gray max-w-none">
                        <div className="text-gray-300 space-y-8">
                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <Eye className="w-6 h-6 text-blue-400" />
                                    <h2 className="text-2xl font-semibold text-white">Information We Collect</h2>
                                </div>
                                <p className="mb-4">
                                    At aprendeSwift, we only collect information necessary to provide you 
                                    with a better learning experience:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Profile information (name, email, avatar) when you register</li>
                                    <li>Comments and content you publish on our articles</li>
                                    <li>Anonymous usage statistics to improve our content</li>
                                    <li>Technical cookie information for site functionality</li>
                                </ul>
                            </section>

                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <Database className="w-6 h-6 text-blue-400" />
                                    <h2 className="text-2xl font-semibold text-white">How We Use Your Information</h2>
                                </div>
                                <p className="mb-4">
                                    We use your information to:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Provide and maintain our services</li>
                                    <li>Personalize your learning experience</li>
                                    <li>Communicate with you about important updates</li>
                                    <li>Send newsletters only if you have voluntarily subscribed</li>
                                    <li>Analyze site usage for continuous improvements</li>
                                </ul>
                            </section>

                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <Mail className="w-6 h-6 text-blue-400" />
                                    <h2 className="text-2xl font-semibold text-white">Sharing Information</h2>
                                </div>
                                <p className="mb-4">
                                    <strong>We do not sell, rent, or share your personal information</strong> with third parties, 
                                    except in the following cases:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>When required by law or competent authorities</li>
                                    <li>With service providers who help us operate the site (Firebase, etc.)</li>
                                    <li>With your explicit consent</li>
                                </ul>
                            </section>

                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <Clock className="w-6 h-6 text-blue-400" />
                                    <h2 className="text-2xl font-semibold text-white">Your Rights</h2>
                                </div>
                                <p className="mb-4">
                                    You have the right to:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Access your personal information</li>
                                    <li>Correct incorrect data</li>
                                    <li>Delete your account and associated data</li>
                                    <li>Unsubscribe from our communications</li>
                                    <li>Data portability</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">Contact</h2>
                                <p>
                                    If you have questions about this privacy policy, you can contact us at:{" "}
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