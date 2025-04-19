// src/components/post/PostAuthorBio.tsx

import Image from "next/image";
import Link from "next/link";
import { Twitter, Github, Linkedin, User, ExternalLink } from "lucide-react";
import { Author } from "@/types/Post";

interface PostAuthorBioProps {
    author: Author;
}

export default function PostAuthorBio({ author }: PostAuthorBioProps) {
    if (!author || !author.bio) return null;

    return (
        <div className="mb-12 p-6 bg-white/5 border border-white/10 rounded-lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                {author.avatar ? (
                    <Image
                        src={author.avatar}
                        alt={author.name || "Autor"}
                        width={80}
                        height={80}
                        className="rounded-full border-4 border-blue-500/30"
                    />
                ) : (
                    <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center border-4 border-blue-500/30">
                        <User
                            size={40}
                            className="text-blue-400"
                        />
                    </div>
                )}

                <div>
                    <h3 className="text-xl font-bold text-white mb-1">Sobre {author.name}</h3>
                    {author.username && <p className="text-blue-400 text-sm mb-2">@{author.username}</p>}

                    {/* Redes sociales */}
                    {author.socialLinks && (
                        <div className="flex items-center gap-3 mt-2">
                            {author.socialLinks.twitter && (
                                <Link
                                    href={author.socialLinks.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/70 hover:text-blue-400 transition-colors"
                                >
                                    <Twitter size={18} />
                                </Link>
                            )}
                            {author.socialLinks.github && (
                                <Link
                                    href={author.socialLinks.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/70 hover:text-blue-400 transition-colors"
                                >
                                    <Github size={18} />
                                </Link>
                            )}
                            {author.socialLinks.linkedin && (
                                <Link
                                    href={author.socialLinks.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/70 hover:text-blue-400 transition-colors"
                                >
                                    <Linkedin size={18} />
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="text-white/80 leading-relaxed space-y-3">
                {author.bio.split("\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>

            {author.username && (
                <Link
                    href={`/author/${author.username}`}
                    className="inline-flex items-center gap-1 mt-4 text-blue-400 hover:text-blue-300 transition-colors font-medium"
                >
                    Ver todos los artículos de {author.name}
                    <ExternalLink size={14} />
                </Link>
            )}
        </div>
    );
}
