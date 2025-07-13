import { ArrowRight, Code, BookOpen, Zap } from "lucide-react";
import LinkButton from "@/components/ui/LinkButton";

export default function HeroSection() {
    return (
        <section className="py-10 relative overflow-hidden">
            <div className="container mx-auto px-4 text-center relative z-10">
                {/* Eyebrow text */}
                <div className="inline-block rounded-full bg-[var(--color-hero-eyebrow)] border-[var(--color-blue-light)] text-[var(--color-blue-light)] border px-4 py-1.5 mb-6 text-sm font-medium">
                    Aprende a tu ritmo
                </div>

                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[var(--color-foreground)] leading-tight">
                    Aprende Swift y SwiftUI
                    <span className="block bg-gradient-to-r from-[var(--color-hero-gradient-from)] to-[var(--color-hero-gradient-to)] bg-clip-text text-transparent mt-2">
                        De cero a experto
                    </span>
                </h1>

                <p className="text-xl md:text-2xl text-[var(--color-muted)] max-w-2xl mx-auto mb-10 leading-relaxed">
                    Tutoriales, guías y recursos para convertirte en un
                    <span className="font-semibold text-[var(--color-foreground)]"> desarrollador de iOS experimentado</span>
                </p>

                {/* Call to Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                    <LinkButton
                        href="/tutorials"
                        variant="primary"
                        size="lg"
                    >
                        Empezar a aprender
                        <ArrowRight size={18} />
                    </LinkButton>
                    <LinkButton
                        href="/posts"
                        variant="secondary"
                        size="lg"
                    >
                        Explorar publicaciones
                    </LinkButton>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
                    <div className="bg-[var(--color-card)] border-[var(--color-card-border)] p-6 rounded-lg border">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-[var(--color-blue-bg)] rounded-lg">
                                <Code
                                    size={22}
                                    className="text-[var(--color-blue-light)]"
                                />
                            </div>
                            <div>
                                <h3 className="font-semibold text-[var(--color-foreground)] text-lg mb-2">Código práctico</h3>
                                <p className="text-[var(--color-muted)]">
                                    Ejemplos de código que puedes aplicar directamente a tus proyectos.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[var(--color-card)] border-[var(--color-card-border)] p-6 rounded-lg border">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-[var(--color-purple-bg)] rounded-lg">
                                <BookOpen
                                    size={22}
                                    className="text-[var(--color-purple-light)]"
                                />
                            </div>
                            <div>
                                <h3 className="font-semibold text-[var(--color-foreground)] text-lg mb-2">Tutoriales paso a paso</h3>
                                <p className="text-[var(--color-muted)]">
                                    Guías detalladas desde conceptos básicos hasta avanzados.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[var(--color-card)] border-[var(--color-card-border)] p-6 rounded-lg border">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-[var(--color-emerald-bg)] rounded-lg">
                                <Zap
                                    size={22}
                                    className="text-[var(--color-emerald-light)]"
                                />
                            </div>
                            <div>
                                <h3 className="font-semibold text-[var(--color-foreground)] text-lg mb-2">Actualizado constantemente</h3>
                                <p className="text-[var(--color-muted)]">
                                    Contenido actualizado con las últimas versiones de Swift y SwiftUI.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
