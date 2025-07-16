// src/components/post/CommentsSection.tsx

"use client";

import { useState } from "react";
import { useComments } from "@/hooks/useComments";
import { useAuthStore } from "@/store/authStore";
import CommentItem from "./CommentItem";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import Spinner from "@/components/ui/Spinner";
import { FiMessageCircle, FiLock } from "react-icons/fi";

interface CommentsSectionProps {
    postId: string;
}

export default function CommentsSection({ postId }: CommentsSectionProps) {
    
    const { isAuthenticated } = useAuthStore();
    const {
        comments,
        loading,
        error,
        submitting,
        totalComments,
        addComment,
        editComment,
        removeComment,
        likeComment,
    } = useComments(postId);

    const [newComment, setNewComment] = useState("");

    const handleSubmitComment = async () => {
        if (!newComment.trim()) return;
        
        const success = await addComment(newComment);
        if (success) {
            setNewComment("");
        }
    };

    if (loading) {
        return (
            <div className="py-8 border-t border-gray-700/50">
                <div className="flex items-center justify-center py-8">
                    <Spinner />
                    <span className="ml-2 text-gray-400">Cargando comentarios...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-8 border-t border-gray-700/50">
                <div className="text-center py-8 text-red-400">
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-12 pt-8 border-t border-gray-700/50">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3">
                    <FiMessageCircle className="text-blue-400" size={24} />
                    <h3 className="text-2xl font-bold text-white">
                        Comentarios
                    </h3>
                    {totalComments > 0 && (
                        <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                            {totalComments}
                        </span>
                    )}
                </div>
            </div>

            {/* Mensaje "Sé el primero en comentar" cuando no hay comentarios */}
            {comments.length === 0 && isAuthenticated && (
                <div className="text-center py-12 mb-8">
                    <div className="inline-flex p-6 bg-blue-500/10 rounded-full mb-6">
                        <FiMessageCircle className="text-blue-400" size={32} />
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-3">
                        Sé el primero en comentar
                    </h4>
                    <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
                        Comparte tus pensamientos sobre este {postId.includes('tutorial') ? 'tutorial' : 'artículo'} 
                        y ayuda a otros desarrolladores de la comunidad Swift.
                    </p>
                </div>
            )}

            {/* Formulario para nuevo comentario */}
            <div className="mb-8">
                {isAuthenticated ? (
                    <div className="space-y-4">
                        <div className="relative">
                            <Textarea
                                id={`new-comment-${postId}`}
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Comparte tu experiencia con este tutorial..."
                                rows={4}
                                maxLength={2000}
                                className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400/20 rounded-lg"
                            />
                            <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                                {newComment.length}/2000
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-400">
                                Tu comentario ayudará a otros desarrolladores
                            </span>
                            <Button
                                onClick={handleSubmitComment}
                                disabled={submitting || !newComment.trim()}
                                className="bg-blue-600 hover:bg-blue-700 border-0 text-white font-medium px-6 py-2 rounded-lg transition-all duration-200"
                            >
                                {submitting ? (
                                    <>
                                        <Spinner />
                                        <span className="ml-2">Publicando...</span>
                                    </>
                                ) : (
                                    "Publicar comentario"
                                )}
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="inline-flex p-4 bg-blue-500/20 rounded-full mb-4">
                            <FiLock className="text-blue-400" size={24} />
                        </div>
                        <h4 className="text-lg font-semibold text-white mb-2">
                            Únete a la conversación
                        </h4>
                        <p className="text-gray-400 mb-6 max-w-md mx-auto">
                            Inicia sesión para compartir tu experiencia y conectar con otros desarrolladores
                        </p>
                        <Button
                            onClick={() => window.location.href = "/auth"}
                            className="bg-blue-600 hover:bg-blue-700 border-0 text-white font-medium px-6 py-2 rounded-lg transition-all duration-200"
                        >
                            Iniciar sesión
                        </Button>
                    </div>
                )}
            </div>

            {/* Lista de comentarios */}
            <div>
                {comments.length > 0 && (
                    <div className="divide-y divide-gray-700/50">
                        {comments.map((comment) => (
                            <CommentItem
                                key={comment.id}
                                comment={comment}
                                onReply={addComment}
                                onEdit={editComment}
                                onDelete={removeComment}
                                onLike={likeComment}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}