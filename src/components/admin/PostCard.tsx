// src/components/admin/PostCard.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { Post } from "@/types/Post";
import { Trash2, Edit, Globe, EyeOff, Tag, Calendar } from "lucide-react";

type Props = {
    tutorial: Post;
};

export default function PostCard({ tutorial }: Props) {
    const [isPublished, setIsPublished] = useState(tutorial.isPublished);

    const togglePublishStatus = () => {
        setIsPublished(!isPublished);
        // TODO: Llamar a tu API o servicio para actualizar estado real
    };

    const deleteTutorial = () => {
        if (confirm("¿Estás seguro de que quieres eliminar este tutorial?")) {
            // TODO: Llamar a tu API para eliminarlo
            alert("Tutorial eliminado (simulado)");
        }
    };

    return (
        <div className="border rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="p-4">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg line-clamp-2">{tutorial.title}</h3>
                    <span
                        className={`px-2 py-1 rounded-full text-xs ${
                            isPublished ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"
                        }`}
                    >
                        {isPublished ? "Publicado" : "Borrador"}
                    </span>
                </div>
                <div className="space-y-2 text-sm text-neutral-600">
                    <div className="flex items-center space-x-2">
                        <Tag size={16} />
                        <span>{tutorial.category}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Calendar size={16} />
                        {/* <span>{tutorial.date}</span> */}
                    </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                    <div className="flex space-x-2">
                        <Link
                            href={`/admin/tutorials/edit/${tutorial.slug}`}
                            className="text-[--color-text-primary] hover:bg-zinc-200/50 p-2 rounded transition-colors duration-200"
                        >
                            <Edit size={16} />
                        </Link>
                        <button
                            onClick={togglePublishStatus}
                            className="text-[--color-text-secondary] hover:bg-zinc-200/50 p-2 rounded transition-colors duration-200"
                        >
                            {isPublished ? <EyeOff size={16} /> : <Globe size={16} />}
                        </button>
                        <button
                            onClick={deleteTutorial}
                            className="text-red-600 hover:bg-red-600/10 p-2 rounded transition-colors duration-200"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                    <span className="text-xs text-[--color-text-secondary]">{tutorial.readTime} min lectura</span>
                </div>
            </div>
        </div>
    );
}
