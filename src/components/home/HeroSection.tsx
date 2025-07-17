import { ArrowRight, Code, BookOpen, Zap } from "lucide-react";
import LinkButton from "@/components/ui/LinkButton";

export default function HeroSection() {
    return (
        <section className="py-4 md:py-10 relative overflow-hidden">
            <div className="container mx-auto px-4 text-center relative z-10">
                {/* Eyebrow text */}
                <div className="inline-block rounded-full bg-blue-500/20 border border-blue-500/30 px-4 py-1.5 mb-6 text-sm font-medium text-blue-400">
                    Aprende a tu ritmo
                </div>

                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
                    Aprende Swift y SwiftUI
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mt-2">
                        De cero a experto
                    </span>
                </h1>

                <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Tutoriales, guías y recursos para convertirte en un
                    <span className="font-semibold text-white"> desarrollador de iOS experimentado</span>
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
                    <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-500/20 rounded-lg">
                                <Code
                                    size={22}
                                    className="text-blue-400"
                                />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white text-lg mb-2">Código práctico</h3>
                                <p className="text-white/70">
                                    Ejemplos de código que puedes aplicar directamente a tus proyectos.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-purple-500/20 rounded-lg">
                                <BookOpen
                                    size={22}
                                    className="text-purple-400"
                                />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white text-lg mb-2">Tutoriales paso a paso</h3>
                                <p className="text-white/70">
                                    Guías detalladas desde conceptos básicos hasta avanzados.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-emerald-500/20 rounded-lg">
                                <Zap
                                    size={22}
                                    className="text-emerald-400"
                                />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white text-lg mb-2">Actualizado constantemente</h3>
                                <p className="text-white/70">
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
