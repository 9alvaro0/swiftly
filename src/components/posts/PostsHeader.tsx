// src/components/posts/PostsHeader.tsx

export default function PostsHeader() {
    return (
        <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold">Artículos</h1>
            <p className="text-gray-600 max-w-3xl">
                Explora nuestra colección de artículos sobre desarrollo, tecnología, y buenas prácticas. Filtrar por
                categoría o nivel para encontrar exactamente lo que estás buscando.
            </p>
        </div>
    );
};

