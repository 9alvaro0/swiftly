// src/components/post/PostAuthorBio.tsx

import Image from "next/image";
import Link from "next/link";
import { User, Twitter, Github, Linkedin } from "lucide-react";
import { Author } from "@/types/Post";

interface PostAuthorBioProps {
    author: Author;
}

export default function PostAuthorBio({ author }: PostAuthorBioProps) {
    if (!author) return null;

    return (
        <div className="mb-12 py-8 border-t border-gray-700/50">
            <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="relative w-20 h-20 flex-shrink-0">
                    {author.avatar ? (
                        <Image
                            src={author.avatar}
                            alt={author.name || "Autor"}
                            width={80}
                            height={80}
                            className="w-full h-full rounded-full border-2 border-blue-500/30 object-cover"
                        />
                    ) : (
                        <div className="w-full h-full rounded-full bg-blue-500/20 flex items-center justify-center border-2 border-blue-500/30">
                            <User
                                size={40}
                                className="text-blue-400"
                            />
                        </div>
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <div className="mb-4">
                        <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-white">
                                {author.name}
                            </h3>
                            {/* Iconos de redes sociales integrados */}
                            {author.socialLinks && (
                                <div className="flex items-center gap-2">
                                    {author.socialLinks.twitter && (
                                        <Link
                                            href={author.socialLinks.twitter}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-blue-400 transition-colors"
                                            title="Twitter"
                                        >
                                            <Twitter size={16} />
                                        </Link>
                                    )}
                                    {author.socialLinks.github && (
                                        <Link
                                            href={author.socialLinks.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-gray-300 transition-colors"
                                            title="GitHub"
                                        >
                                            <Github size={16} />
                                        </Link>
                                    )}
                                    {author.socialLinks.linkedin && (
                                        <Link
                                            href={author.socialLinks.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-blue-400 transition-colors"
                                            title="LinkedIn"
                                        >
                                            <Linkedin size={16} />
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>
                        {author.username && (
                            <p className="text-blue-400 text-sm font-medium">
                                @{author.username}
                            </p>
                        )}
                    </div>

                    {author.bio && (
                        <div className="text-gray-300 leading-relaxed space-y-2">
                            {author.bio.split("\n").map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
