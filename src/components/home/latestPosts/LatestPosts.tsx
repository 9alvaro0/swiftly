// src/components/home/LatestBlogPosts.tsx

import PostList from "@/components/home/latestPosts/PostList";
import SectionHeader from "../../ui/SectionHeader";
import { getAllPublishedPosts } from "@/services/firebase/firestore/post";
import { FiBookOpen, FiFileText } from "react-icons/fi";

export default async function LatestPosts() {
    // Cambiar tutorial por post cuando hayan posts y limitar a 4
    const posts = await getAllPublishedPosts({ type: "article" });
    const hasPosts = posts && posts.length > 0;

    return (
        <section className="container mx-auto px-4 py-12">
            <SectionHeader
                title="Últimos artículos"
                link="/posts"
                subtitle="Descubre los últimos artículos sobre desarrollo y tecnología."
                accentColor="purple"
                hasData={hasPosts}
            />

            {hasPosts ? (
                <PostList posts={posts} />
            ) : (
                <div className="bg-[var(--color-card)] border-[var(--color-card-border)] p-8 rounded-lg border mx-auto">
                    <div className="flex items-center gap-6 mb-8">
                        <div className="p-4 bg-[var(--color-purple-bg)] rounded-lg">
                            <FiFileText
                                size={28}
                                className="text-[var(--color-purple-light)]"
                            />
                        </div>
                        <div className="text-left">
                            <h3 className="font-semibold text-[var(--color-foreground)] text-xl mb-2">Próximamente nuevos artículos</h3>
                            <p className="text-[var(--color-muted)]">
                                Estamos preparando artículos interesantes sobre desarrollo y tecnología.
                            </p>
                        </div>
                    </div>

                    <div className="bg-[var(--color-card)] border-[var(--color-card-border)] p-6 rounded-lg border mb-6">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-[var(--color-emerald-bg)] rounded-lg">
                                <FiBookOpen
                                    size={22}
                                    className="text-[var(--color-emerald-light)]"
                                />
                            </div>
                            <div>
                                <h3 className="font-semibold text-[var(--color-foreground)] text-lg mb-2">Contenido en desarrollo</h3>
                                <p className="text-[var(--color-muted)]">
                                    Nuestro equipo de redactores está trabajando en artículos con información valiosa y
                                    actualizada.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
