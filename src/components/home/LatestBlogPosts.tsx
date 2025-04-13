// src/components/home/LatestBlogPosts.tsx
export default function LatestBlogPosts() {
    const posts = [1, 2, 3, 4].map((i) => ({
        title: `Novedades de Swift ${6 + i - 1}`,
        date: `Abril ${10 + i}, 2025`,
        excerpt: "Descubre las últimas características y mejoras en el lenguaje Swift.",
    }));

    return (
        <section className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Últimas publicaciones</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map((post, index) => (
                    <div
                        key={index}
                        className="flex gap-4 p-4 bg-white rounded-lg shadow-sm"
                    >
                        <div className="w-24 h-24 bg-gray-200 flex-shrink-0"></div>
                        <div>
                            <h3 className="font-semibold mb-1">{post.title}</h3>
                            <p className="text-gray-600 text-sm mb-2">{post.date}</p>
                            <p className="text-gray-700 text-sm line-clamp-2">{post.excerpt}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
