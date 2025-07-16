"use client";

import { useState } from "react";
import Link from "next/link";
import { Post } from "@/types/Post";
import {
    FiTrash2 as Trash2,
    FiEdit2 as Edit,
    FiGlobe as Globe,
    FiEyeOff as EyeOff,
    FiCalendar as Calendar,
    FiClock as Clock,
    FiExternalLink as ExternalLink,
} from "react-icons/fi";
import { usePost } from "@/hooks/usePost";
import Modal from "@/components/ui/Modal";
import { AdminCard, AdminCardBody, AdminCardFooter, AdminCardHeader } from "@/components/ui/AdminCard";

type Props = {
    post: Post;
    onPostDeleted?: () => void;
};

export default function PostCard({ post, onPostDeleted }: Props) {
    const [isHovering, setIsHovering] = useState(false);

    const {
        isPublished,
        isLoading,
        togglePublishStatus,
        confirmDeletePost,
        cancelDeletePost,
        executeDeletePost,
        showDeleteModal,
    } = usePost({
        postId: post.id,
        initialPublishState: post.isPublished || false,
        onPostDeleted,
    });

    const truncateText = (text: string, maxLength: number) => {
        if (!text) return "";
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };

    return (
        <>
            <AdminCard
                hover
                className="relative"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <AdminCardHeader>
                    <div className="flex justify-between items-start gap-3">
                        <h3 className="font-bold text-lg line-clamp-2 text-white">
                            {truncateText(post.title, 60)}
                        </h3>
                        <span
                            className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center shrink-0 ${
                                isPublished
                                    ? "bg-green-900/30 text-green-400"
                                    : "bg-orange-900/30 text-orange-400"
                            }`}
                        >
                            {isPublished ? (
                                <>
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>
                                    Publicado
                                </>
                            ) : (
                                <>
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-1.5"></span>
                                    Borrador
                                </>
                            )}
                        </span>
                    </div>
                </AdminCardHeader>

                <AdminCardBody>
                    {post.description && (
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                            {truncateText(post.description, 120)}
                        </p>
                    )}

                    <div className="space-y-2 text-sm text-gray-400">
                        {post.createdAt && (
                            <div className="flex items-center space-x-2">
                                <Calendar size={14} className="text-gray-500" />
                                <span>
                                    {new Date(post.createdAt).toLocaleDateString("es-ES", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </span>
                            </div>
                        )}

                        {post.readTime && (
                            <div className="flex items-center space-x-2">
                                <Clock size={14} className="text-gray-500" />
                                <span>{post.readTime} min lectura</span>
                            </div>
                        )}
                    </div>
                </AdminCardBody>

                <AdminCardFooter>
                    <div className="flex justify-between items-center">
                        <div className="flex space-x-1">
                            <Link
                                href={`/admin/posts/edit/${post.slug}`}
                                className="text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-lg transition-colors duration-200"
                                title="Editar"
                            >
                                <Edit size={16} />
                            </Link>

                            <button
                                onClick={togglePublishStatus}
                                disabled={isLoading}
                                className={`p-2 rounded-lg transition-colors duration-200 ${
                                    isPublished
                                        ? "text-orange-400 hover:bg-orange-900/20"
                                        : "text-green-400 hover:bg-green-900/20"
                                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                                title={isPublished ? "Despublicar" : "Publicar"}
                            >
                                {isPublished ? <EyeOff size={16} /> : <Globe size={16} />}
                            </button>

                            <button
                                onClick={confirmDeletePost}
                                disabled={isLoading}
                                className={`text-red-400 hover:bg-red-900/20 p-2 rounded-lg transition-colors duration-200 ${
                                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                                title="Eliminar"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>

                        <Link
                            href={`/posts/${post.slug}`}
                            target="_blank"
                            className="text-blue-400 hover:text-blue-300 hover:underline text-sm flex items-center gap-1 p-1 pl-2 rounded-lg hover:bg-blue-900/10 transition-colors duration-200"
                        >
                            <span>Ver</span>
                            <ExternalLink size={12} />
                        </Link>
                    </div>
                </AdminCardFooter>

                {/* Loading overlay */}
                {isLoading && (
                    <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center z-10">
                        <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
            </AdminCard>

            {/* Modal de confirmación para eliminar */}
            <Modal
                isOpen={showDeleteModal}
                onClose={cancelDeletePost}
                title="Confirmar eliminación"
                footer={
                    <>
                        <button
                            onClick={cancelDeletePost}
                            className="px-4 py-2 text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={executeDeletePost}
                            className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                        >
                            Eliminar
                        </button>
                    </>
                }
            >
                <div className="text-gray-300">
                    <p>¿Estás seguro de que quieres eliminar este post?</p>
                    <p className="mt-2 font-medium">{post.title}</p>
                    <p className="mt-4 text-sm text-red-400">Esta acción no se puede deshacer.</p>
                </div>
            </Modal>
        </>
    );
}
