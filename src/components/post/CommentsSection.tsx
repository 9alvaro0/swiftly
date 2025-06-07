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
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-center py-8">
                    <Spinner />
                    <span className="ml-2 text-gray-600">Cargando comentarios...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="text-center py-8 text-red-600">
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-xl border border-white/10 shadow-2xl">
            {/* Header */}
            <div className="px-6 py-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-lg backdrop-blur-sm border border-white/10">
                        <FiMessageCircle className="text-blue-400" size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                        Comentarios
                    </h3>
                    {totalComments > 0 && (
                        <span className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium border border-blue-500/30">
                            {totalComments}
                        </span>
                    )}
                </div>
            </div>

            {/* Formulario para nuevo comentario */}
            <div className="px-6 py-6 border-b border-white/10">
                {isAuthenticated ? (
                    <div className="space-y-4">
                        <div className="relative">
                            <Textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Comparte tu experiencia con este tutorial..."
                                rows={4}
                                maxLength={2000}
                                className="bg-white/5 border-white/20 text-white placeholder-white/50 focus:border-blue-400/50 focus:ring-blue-400/20 rounded-lg backdrop-blur-sm"
                            />
                            <div className="absolute bottom-3 right-3 text-xs text-white/40">
                                {newComment.length}/2000
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-white/60">
                                Tu comentario ayudará a otros desarrolladores
                            </span>
                            <Button
                                onClick={handleSubmitComment}
                                disabled={submitting || !newComment.trim()}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 border-0 text-white font-medium px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                            >
                                {submitting ? (
                                    <>
                                        <Spinner size="sm" />
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
                        <div className="inline-flex p-4 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full backdrop-blur-sm border border-white/10 mb-4">
                            <FiLock className="text-blue-400" size={24} />
                        </div>
                        <h4 className="text-lg font-semibold text-white mb-2">
                            Únete a la conversación
                        </h4>
                        <p className="text-white/70 mb-6 max-w-md mx-auto">
                            Inicia sesión para compartir tu experiencia y conectar con otros desarrolladores
                        </p>
                        <Button
                            onClick={() => window.location.href = "/auth"}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 border-0 text-white font-medium px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                            Iniciar sesión
                        </Button>
                    </div>
                )}
            </div>

            {/* Lista de comentarios */}
            <div className="px-6">
                {comments.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="inline-flex p-6 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-full backdrop-blur-sm border border-white/10 mb-6">
                            <FiMessageCircle className="text-blue-400" size={32} />
                        </div>
                        <h4 className="text-xl font-semibold text-white mb-3">
                            Sé el primero en comentar
                        </h4>
                        <p className="text-white/70 max-w-md mx-auto leading-relaxed">
                            Comparte tus pensamientos sobre este {postId.includes('tutorial') ? 'tutorial' : 'artículo'} 
                            y ayuda a otros desarrolladores de la comunidad Swift.
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-white/10">
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

            {/* Footer stats */}
            {totalComments > 0 && (
                <div className="px-6 py-4 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm text-center text-sm text-white/60 border-t border-white/10">
                    <div className="flex items-center justify-center gap-2">
                        <FiMessageCircle size={14} className="text-blue-400" />
                        <span>
                            {totalComments === 1 
                                ? "1 comentario en la conversación" 
                                : `${totalComments} comentarios en la conversación`
                            }
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}