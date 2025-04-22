import SectionHeader from "../ui/SectionHeader";
import TutorialCard from "../tutorials/TutorialCard";
import { getAllPublishedPosts } from "@/firebase/firestore/post";
import { FiBookOpen } from "react-icons/fi";

export default async function FeaturedTutorials() {
    const tutorials = await getAllPublishedPosts("tutorial");
    const hasTutorials = tutorials && tutorials.length > 0;

    return (
        <section className="py-4 relative">
            {/* Decorativo: Gradient Backdrop - Más notable */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-indigo-900/15 to-transparent pointer-events-none"></div>

            {/* Decorative elements */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-blue-600/10 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-indigo-700/10 rounded-full filter blur-3xl"></div>

            <div className="container mx-auto px-4 relative">
                <SectionHeader
                    title="Tutoriales destacados"
                    link="/tutorials"
                    accentColor="blue"
                    subtitle="Aprende nuevas habilidades con nuestros tutoriales más populares y descubre cómo mejorar tus conocimientos de desarrollo."
                />

                {hasTutorials ? (
                    <div>
                        {tutorials.length === 1 ? (
                            // Diseño para un solo tutorial
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2">
                                    <div className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                                        <TutorialCard tutorial={tutorials[0]} />
                                    </div>
                                </div>
                                <div className="lg:col-span-1 bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col justify-center">
                                    <h3 className="text-xl font-bold text-white mb-4">Tutorial destacado</h3>
                                    <p className="text-white/70 mb-6">
                                        Este tutorial ha sido seleccionado por su calidad y relevancia para ayudarte a
                                        dominar conceptos importantes de desarrollo.
                                    </p>
                                    <div className="flex flex-col space-y-4">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3">
                                                <FiBookOpen
                                                    className="text-emerald-400"
                                                    size={16}
                                                />
                                            </div>
                                            <span className="text-white/80">Contenido paso a paso</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                                                <FiBookOpen
                                                    className="text-blue-400"
                                                    size={16}
                                                />
                                            </div>
                                            <span className="text-white/80">Ejemplos prácticos</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // Diseño para múltiples tutoriales (conservado para cuando tengas más)
                            <div>
                                {/* Featured tutorial - destacado */}
                                <div className="mb-10">
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                        <div className="lg:col-span-2">
                                            <div className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                                                <TutorialCard tutorial={tutorials[0]} />
                                            </div>
                                        </div>
                                        <div className="lg:col-span-1 bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col justify-center">
                                            <h3 className="text-xl font-bold text-white mb-4">Tutorial destacado</h3>
                                            <p className="text-white/70 mb-6">
                                                Este tutorial ha sido seleccionado por su calidad y relevancia para
                                                ayudarte a dominar conceptos importantes de desarrollo.
                                            </p>
                                            <div className="flex flex-col space-y-4">
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3">
                                                        <FiBookOpen
                                                            className="text-emerald-400"
                                                            size={16}
                                                        />
                                                    </div>
                                                    <span className="text-white/80">Contenido paso a paso</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                                                        <FiBookOpen
                                                            className="text-blue-400"
                                                            size={16}
                                                        />
                                                    </div>
                                                    <span className="text-white/80">Ejemplos prácticos</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Rest of tutorials */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {tutorials.slice(1, 4).map((tutorial) => (
                                        <div
                                            key={tutorial.id}
                                            className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                        >
                                            <TutorialCard tutorial={tutorial} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="bg-white/5 p-8 rounded-lg border border-white/10 max-w-3xl mx-auto relative overflow-hidden">
                        {/* Background pattern - Más intenso */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl"></div>
                            <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500 rounded-full filter blur-3xl"></div>
                        </div>

                        <div className="relative">
                            <div className="flex items-center gap-6 mb-8">
                                <div className="p-4 bg-blue-500/20 rounded-lg">
                                    <FiBookOpen
                                        size={28}
                                        className="text-blue-400"
                                    />
                                </div>
                                <div className="text-left">
                                    <h3 className="font-semibold text-white text-xl mb-2">
                                        Próximamente nuevos tutoriales
                                    </h3>
                                    <p className="text-white/70">
                                        Estamos preparando contenido educativo de alta calidad para mejorar tus
                                        habilidades.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-emerald-500/20 rounded-lg">
                                            <FiBookOpen
                                                size={22}
                                                className="text-emerald-400"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white text-lg mb-2">
                                                Tutoriales detallados
                                            </h3>
                                            <p className="text-white/70">
                                                Guías paso a paso con ejemplos prácticos y código fuente completo.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-blue-500/20 rounded-lg">
                                            <FiBookOpen
                                                size={22}
                                                className="text-blue-400"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white text-lg mb-2">
                                                Tecnologías actuales
                                            </h3>
                                            <p className="text-white/70">
                                                Contenido actualizado con las últimas versiones y mejores prácticas.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
