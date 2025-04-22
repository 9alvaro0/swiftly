// src/components/home/LatestBlogPosts.tsx

import PostList from "@/components/home/latestPosts/PostList";
import SectionHeader from "../../ui/SectionHeader";
import { getAllPublishedPosts } from "@/firebase/firestore/post";
import { FiBookOpen, FiFileText } from "react-icons/fi";

export default async function LatestPosts() {
    // Cambiar tutorial por post cuando hayan posts y limitar a 4
    const postsFromDB = await getAllPublishedPosts("tutorial");
    const posts =
        postsFromDB.length === 1
            ? Array.from({ length: 5 }).map((_, i) => ({
                  ...postsFromDB[0],
                  id: i === 0 ? postsFromDB[0].id : `fake-${i + 1}`,
                  slug: i === 0 ? postsFromDB[0].slug : `post-fake-${i + 1}`,
                  title: i === 0 ? postsFromDB[0].title : `${postsFromDB[0].title} (Parte ${i + 1})`,
              }))
            : postsFromDB;
    const hasPosts = posts && posts.length > 0;

    return (
        <section className="container mx-auto px-4 py-12">
            <SectionHeader
                title="Últimos artículos"
                link="/posts"
                subtitle="Descubre los últimos artículos sobre desarrollo y tecnología."
                accentColor="purple"
            />

            {hasPosts ? (
                <PostList posts={posts} />
            ) : (
                <div className="bg-white/5 p-8 rounded-lg border border-white/10 max-w-3xl mx-auto">
                    <div className="flex items-center gap-6 mb-8">
                        <div className="p-4 bg-purple-500/20 rounded-lg">
                            <FiFileText
                                size={28}
                                className="text-purple-400"
                            />
                        </div>
                        <div className="text-left">
                            <h3 className="font-semibold text-white text-xl mb-2">Próximamente nuevos artículos</h3>
                            <p className="text-white/70">
                                Estamos preparando artículos interesantes sobre desarrollo y tecnología.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white/5 p-6 rounded-lg border border-white/10 mb-6">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-emerald-500/20 rounded-lg">
                                <FiBookOpen
                                    size={22}
                                    className="text-emerald-400"
                                />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white text-lg mb-2">Contenido en desarrollo</h3>
                                <p className="text-white/70">
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
