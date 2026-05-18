// src/components/post/CommentItem.tsx

"use client";

import { useState } from "react";
import { Comment } from "@/types/Comment";
import { useAuthStore } from "@/store/authStore";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { FiHeart, FiMessageCircle, FiEdit2, FiTrash2, FiMoreHorizontal } from "react-icons/fi";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import Image from "next/image";

interface CommentItemProps {
    comment: Comment;
    onReply: (content: string, parentId: string) => Promise<boolean>;
    onEdit: (commentId: string, content: string) => Promise<boolean>;
    onDelete: (commentId: string) => Promise<boolean>;
    onLike: (commentId: string) => void;
    depth?: number;
    maxDepth?: number;
}

export default function CommentItem({
    comment,
    onReply,
    onEdit,
    onDelete,
    onLike,
    depth = 0,
    maxDepth = 3
}: CommentItemProps) {
    const { user, isAuthenticated } = useAuthStore();
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [replyContent, setReplyContent] = useState("");
    const [editContent, setEditContent] = useState(comment.content);
    const [submitting, setSubmitting] = useState(false);

    const isOwner = user?.uid === comment.author.id;
    const isLiked = user ? comment.likedBy.includes(user.uid) : false;
    const canReply = depth < maxDepth;

    const handleReply = async () => {
        if (!replyContent.trim()) return;
        
        setSubmitting(true);
        const success = await onReply(replyContent, comment.id);
        if (success) {
            setReplyContent("");
            setShowReplyForm(false);
        }
        setSubmitting(false);
    };

    const handleEdit = async () => {
        if (!editContent.trim() || editContent === comment.content) {
            setShowEditForm(false);
            return;
        }
        
        setSubmitting(true);
        const success = await onEdit(comment.id, editContent);
        if (success) {
            setShowEditForm(false);
        }
        setSubmitting(false);
    };

    const handleDelete = async () => {
        if (!confirm("¿Estás seguro de que quieres eliminar este comentario?")) return;
        
        setSubmitting(true);
        await onDelete(comment.id);
        setSubmitting(false);
    };

    const getTimeAgo = (date: Date) => {
        try {
            return formatDistanceToNow(new Date(date), { 
                addSuffix: true, 
                locale: es 
            });
        } catch {
            return "Hace un momento";
        }
    };

    if (comment.isDeleted) {
        return (
            <div className={`${depth > 0 ? 'ml-6 md:ml-12 pl-4 border-l border-white/10' : ''} py-4 px-4`}>
                <div className="text-white/40 italic text-sm bg-white/5 px-4 py-3 rounded-lg border border-white/10">
                    [Comentario eliminado]
                </div>
                {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-6 space-y-2">
                        {comment.replies.map((reply) => (
                            <CommentItem
                                key={reply.id}
                                comment={reply}
                                onReply={onReply}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                onLike={onLike}
                                depth={depth + 1}
                                maxDepth={maxDepth}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // Calcular el espaciado dinámico basado en la profundidad
    const getIndentClasses = () => {
        if (depth === 0) return '';
        if (depth === 1) return 'ml-6 md:ml-12 pl-4 border-l border-white/10';
        if (depth === 2) return 'ml-4 md:ml-8 pl-3 border-l border-white/10';
        return 'ml-3 md:ml-6 pl-2 border-l border-white/10';
    };

    const getAvatarSize = () => {
        if (depth === 0) return 'w-12 h-12';
        if (depth === 1) return 'w-10 h-10';
        return 'w-8 h-8';
    };


    return (
        <div className={`${getIndentClasses()} ${depth === 0 ? 'py-6 px-4' : depth === 1 ? 'py-5 px-3' : 'py-4 px-2'} group hover:bg-white/[0.02] rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5`}>
            <div className={`flex ${depth === 0 ? 'gap-4' : depth === 1 ? 'gap-3' : 'gap-2'}`}>
                {/* Avatar */}
                <div className="flex-shrink-0 mt-1">
                    {comment.author.avatar ? (
                        <Image 
                            src={comment.author.avatar} 
                            alt={comment.author.name}
                            width={depth === 0 ? 48 : depth === 1 ? 40 : 32}
                            height={depth === 0 ? 48 : depth === 1 ? 40 : 32}
                            className={`${getAvatarSize()} rounded-full object-cover shadow-lg border-2 border-white/10 ring-2 ring-transparent group-hover:ring-blue-500/20 transition-all duration-300`}
                        />
                    ) : (
                        <div className={`${getAvatarSize()} bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg ring-2 ring-transparent group-hover:ring-blue-500/20 transition-all duration-300 ${depth === 0 ? 'text-lg' : depth === 1 ? 'text-sm' : 'text-xs'}`}>
                            {comment.author.name.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>

                {/* Contenido */}
                <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className={`flex items-start justify-between ${depth === 0 ? 'mb-4' : 'mb-3'}`}>
                        <div className="flex flex-col gap-1.5">
                            {/* Nombre y username en líneas separadas para mejor legibilidad */}
                            <div className="flex items-center gap-3">
                                <span className={`font-semibold text-white ${depth === 0 ? 'text-base' : 'text-sm'}`}>
                                    {comment.author.name}
                                </span>
                                <span className="text-white/50 text-xs">
                                    {getTimeAgo(comment.createdAt)}
                                </span>
                                {comment.isEdited && (
                                    <span className="text-white/40 text-xs bg-white/10 px-2 py-0.5 rounded-full border border-white/5">
                                        editado
                                    </span>
                                )}
                            </div>
                            {comment.author.username && (
                                <div className="text-blue-400/80 text-xs">
                                    @{comment.author.username}
                                </div>
                            )}
                        </div>

                        {/* Menu */}
                        {isOwner && (
                            <div className="relative">
                                <button
                                    onClick={() => setShowMenu(!showMenu)}
                                    className="p-2 hover:bg-white/10 rounded-xl text-white/30 hover:text-white/70 transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-105"
                                >
                                    <FiMoreHorizontal size={14} />
                                </button>
                                
                                {showMenu && (
                                    <div className="absolute right-0 top-10 bg-gray-900/95 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl py-2 z-20 min-w-[140px] animate-in slide-in-from-top-2 duration-200">
                                        <button
                                            onClick={() => {
                                                setShowEditForm(true);
                                                setShowMenu(false);
                                            }}
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-white hover:bg-white/10 w-full text-left transition-colors rounded-lg mx-1"
                                        >
                                            <FiEdit2 size={14} className="text-blue-400" />
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => {
                                                handleDelete();
                                                setShowMenu(false);
                                            }}
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 w-full text-left transition-colors rounded-lg mx-1"
                                        >
                                            <FiTrash2 size={14} />
                                            Eliminar
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Contenido del comentario */}
                    {showEditForm ? (
                        <div className={`space-y-4 ${depth === 0 ? 'p-6' : 'p-5'} bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm`}>
                            <Textarea
                                id={`edit-comment-${comment.id}`}
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                placeholder="Edita tu comentario..."
                                rows={3}
                                maxLength={2000}
                                className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-blue-400/50 focus:ring-blue-400/20 rounded-lg backdrop-blur-sm resize-none"
                            />
                            <div className="flex gap-3 justify-end">
                                <Button
                                    onClick={() => {
                                        setShowEditForm(false);
                                        setEditContent(comment.content);
                                    }}
                                    size="sm"
                                    className="bg-white/10 hover:bg-white/20 border-white/20 text-white/80 hover:text-white px-4"
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    onClick={handleEdit}
                                    disabled={submitting || !editContent.trim()}
                                    size="sm"
                                    className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 border-0 text-white px-4 shadow-lg disabled:opacity-50"
                                >
                                    {submitting ? "Guardando..." : "Guardar"}
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className={`text-white/90 leading-relaxed whitespace-pre-wrap ${depth === 0 ? 'mb-4 text-sm' : 'mb-3 text-sm'}`}>
                            {comment.content}
                        </div>
                    )}

                    {/* Acciones */}
                    {!showEditForm && (
                        <div className="flex items-center gap-2">
                            {/* Like */}
                            <button
                                onClick={() => onLike(comment.id)}
                                disabled={!isAuthenticated}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                                    isLiked
                                        ? "text-red-400 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 shadow-md shadow-red-500/20"
                                        : "text-white/60 hover:text-red-400 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30"
                                } ${!isAuthenticated ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <FiHeart size={16} className={isLiked ? "fill-current" : ""} />
                                <span>{comment.likes || 0}</span>
                            </button>

                            {/* Responder */}
                            {canReply && (
                                <button
                                    onClick={() => setShowReplyForm(!showReplyForm)}
                                    disabled={!isAuthenticated}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 text-white/60 hover:text-blue-400 hover:bg-blue-500/10 border border-white/10 hover:border-blue-500/30 ${!isAuthenticated ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <FiMessageCircle size={16} />
                                    <span>Responder</span>
                                </button>
                            )}
                        </div>
                    )}

                    {/* Formulario de respuesta */}
                    {showReplyForm && (
                        <div className={`mt-4 p-4 bg-gradient-to-br from-white/5 to-white/10 rounded-xl backdrop-blur-sm border border-white/20 shadow-xl`}>
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <FiMessageCircle size={16} className="text-blue-400" />
                                    <span className="text-sm text-white/70">
                                        Respondiendo a <span className="text-blue-400 font-medium">{comment.author.name}</span>
                                    </span>
                                </div>
                                <Textarea
                                    id={`reply-comment-${comment.id}`}
                                    value={replyContent}
                                    onChange={(e) => setReplyContent(e.target.value)}
                                    placeholder={`Escribe tu respuesta...`}
                                    rows={3}
                                    maxLength={2000}
                                    className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-blue-400/50 focus:ring-blue-400/20 rounded-xl backdrop-blur-sm resize-none"
                                />
                                <div className="flex gap-3 justify-end pt-2">
                                    <Button
                                        onClick={() => {
                                            setShowReplyForm(false);
                                            setReplyContent("");
                                        }}
                                        size="sm"
                                        className="bg-white/10 hover:bg-white/20 border-white/20 text-white/80 hover:text-white px-4"
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        onClick={handleReply}
                                        disabled={submitting || !replyContent.trim()}
                                        size="sm"
                                        className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 border-0 text-white px-4 shadow-lg disabled:opacity-50"
                                    >
                                        {submitting ? "Enviando..." : "Responder"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Respuestas */}
                    {comment.replies && comment.replies.length > 0 && (
                        <div className={`${depth === 0 ? 'mt-6' : 'mt-5'} ${depth === 0 ? 'space-y-4' : 'space-y-3'}`}>
                            {comment.replies.map((reply) => (
                                <CommentItem
                                    key={reply.id}
                                    comment={reply}
                                    onReply={onReply}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                    onLike={onLike}
                                    depth={depth + 1}
                                    maxDepth={maxDepth}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Overlay para cerrar menu */}
            {showMenu && (
                <div
                    className="fixed inset-0 z-0"
                    onClick={() => setShowMenu(false)}
                />
            )}
        </div>
    );
}