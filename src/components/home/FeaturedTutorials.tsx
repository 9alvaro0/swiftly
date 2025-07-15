import SectionHeader from "../ui/SectionHeader";
import { getAllPublishedPosts } from "@/services/firebase/firestore/post";
import { FiBookOpen } from "react-icons/fi";
import TutorialCard from "../tutorials/TutorialCard";

export default async function FeaturedTutorials() {
    const tutorials = await getAllPublishedPosts({ type: "tutorial" });
    // Additional filter to ensure only published tutorials are shown
    const publishedTutorials = tutorials.filter(tutorial => tutorial.isPublished === true);
    const hasTutorials = publishedTutorials && publishedTutorials.length > 0;

    return (
        <section className="relative py-4 overflow-hidden">
            <div className="relative container mx-auto px-4">
                <SectionHeader
                    title="Tutoriales destacados"
                    link="/tutorials"
                    accentColor="blue"
                    subtitle="Aprende habilidades con nuestros mejores tutoriales y lleva tu desarrollo al siguiente nivel."
                    hasData={hasTutorials}
                />

                {hasTutorials ? (
                    <div className="grid gap-8 mt-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {publishedTutorials.map((tutorial) => (
                                <TutorialCard
                                    key={tutorial.id}
                                    tutorial={tutorial}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="relative bg-white/5 border border-white/10 p-12 rounded-2xl shadow-lg text-center mt-10">
                        <FiBookOpen
                            size={48}
                            className="text-blue-400 mx-auto mb-6"
                        />
                        <h3 className="text-2xl font-bold text-white mb-4">¡Muy pronto nuevos tutoriales!</h3>
                        <p className="text-white/70 mb-8">
                            Estamos preparando contenido de alta calidad para ayudarte a seguir creciendo.
                        </p>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="bg-white/5 p-6 rounded-lg">
                                <h4 className="font-semibold text-white mb-2">Tutoriales detallados</h4>
                                <p className="text-white/60 text-sm">
                                    Guías paso a paso, ejemplos prácticos y proyectos reales.
                                </p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-lg">
                                <h4 className="font-semibold text-white mb-2">Actualizados y relevantes</h4>
                                <p className="text-white/60 text-sm">
                                    Tecnologías actuales, últimas versiones y mejores prácticas.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
