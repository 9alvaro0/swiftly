"use client";

import React from "react";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Checkbox from "@/components/ui/Checkbox";

interface PostAuthorSectionProps {
    post: {
        author?: {
            name?: string;
            username?: string;
            avatar?: string;
            bio?: string;
            socialLinks?: {
                github?: string;
                linkedin?: string;
            };
        };
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const PostAuthorSection: React.FC<PostAuthorSectionProps> = ({ post, onChange }) => {
    const hasAuthorInfo = !!post.author?.name;

    return (
        <div className="border border-blue-200 dark:border-blue-800 rounded-lg p-6 bg-blue-50 dark:bg-blue-950/30 shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300">Información del Autor</h3>

                {hasAuthorInfo && (
                    <div className="flex items-center">
                        <Checkbox
                            id="useProfileInfo"
                            checked={hasAuthorInfo}
                            disabled={true}
                            label="Usando perfil actual"
                        />
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Input
                    id="author.name"
                    name="author.name"
                    label="Nombre del Autor"
                    value={post.author?.name || ""}
                    onChange={onChange}
                    disabled={hasAuthorInfo}
                    className={hasAuthorInfo ? "bg-gray-100 dark:bg-gray-800" : ""}
                />
                <Input
                    id="author.username"
                    name="author.username"
                    label="Username del Autor"
                    value={post.author?.username || ""}
                    onChange={onChange}
                    disabled={!!post.author?.username}
                    className={post.author?.username ? "bg-gray-100 dark:bg-gray-800" : ""}
                />
                <Input
                    id="author.avatar"
                    name="author.avatar"
                    label="Avatar del Autor"
                    value={post.author?.avatar || ""}
                    onChange={onChange}
                    disabled={!!post.author?.avatar}
                    className={post.author?.avatar ? "bg-gray-100 dark:bg-gray-800" : ""}
                />
            </div>

            <Textarea
                id="author.bio"
                name="author.bio"
                label="Bio del Autor"
                value={post.author?.bio || ""}
                onChange={onChange}
                disabled={!!post.author?.bio}
                className={post.author?.bio ? "bg-gray-100 dark:bg-gray-800" : ""}
            />

            {/* Redes Sociales */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <Input
                    id="author.socialLinks.github"
                    name="author.socialLinks.github"
                    label="GitHub"
                    value={post.author?.socialLinks?.github || ""}
                    onChange={onChange}
                    disabled={!!post.author?.socialLinks?.github}
                    className={post.author?.socialLinks?.github ? "bg-gray-100 dark:bg-gray-800" : ""}
                />
                <Input
                    id="author.socialLinks.linkedin"
                    name="author.socialLinks.linkedin"
                    label="LinkedIn"
                    value={post.author?.socialLinks?.linkedin || ""}
                    onChange={onChange}
                    disabled={!!post.author?.socialLinks?.linkedin}
                    className={post.author?.socialLinks?.linkedin ? "bg-gray-100 dark:bg-gray-800" : ""}
                />
            </div>

            {hasAuthorInfo && (
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700">
                    <p>
                        Los campos del autor están prellenados con tu información de perfil y bloqueados para edición.
                        Si necesitas cambiar estos datos, por favor actualiza tu perfil.
                    </p>
                </div>
            )}
        </div>
    );
};

export default PostAuthorSection;
