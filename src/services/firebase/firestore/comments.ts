// src/services/firebase/firestore/comments.ts

import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    query,
    where,
    arrayUnion,
    arrayRemove,
    increment,
    runTransaction,
    serverTimestamp,
} from "firebase/firestore";
import { Comment, CreateCommentData, CommentAuthor } from "@/types/Comment";
import { db } from "../config";
import { serializeFirestoreData } from "@/services/firebase/utils/utils";

// Colección de comentarios
const commentsCollection = collection(db, "comments");

/**
 * Crear un nuevo comentario
 */
export const createComment = async (commentData: CreateCommentData, author: CommentAuthor): Promise<string> => {
    try {
        // Validación de entrada
        if (!commentData.postId || !commentData.content?.trim() || !author.id) {
            throw new Error("Datos del comentario inválidos");
        }

        if (commentData.content.trim().length > 2000) {
            throw new Error("El comentario debe tener máximo 2000 caracteres");
        }

        const commentId = doc(commentsCollection).id;
        
        // Crear objeto autor sin campos undefined
        const cleanAuthor: { id: string; name: string; username?: string; avatar?: string } = {
            id: author.id,
            name: author.name,
        };
        
        // Solo agregar propiedades que no sean undefined o null
        if (author.username && author.username.trim()) {
            cleanAuthor.username = author.username;
        }
        
        if (author.avatar && author.avatar.trim()) {
            cleanAuthor.avatar = author.avatar;
        }
        
        const newComment = {
            postId: commentData.postId,
            parentId: commentData.parentId,
            content: commentData.content.trim(),
            author: cleanAuthor,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            isEdited: false,
            isApproved: true, // Auto-aprobar por ahora
            isDeleted: false,
            likes: 0,
            likedBy: [],
            replyCount: 0,
        };

        await setDoc(doc(commentsCollection, commentId), newComment);

        // Si es una respuesta, incrementar el contador del comentario padre
        if (commentData.parentId) {
            await incrementReplyCount(commentData.parentId, 1);
        }

        return commentId;
    } catch (error) {
        console.error("Error creating comment:", error);
        throw error;
    }
};

/**
 * Obtener comentarios de un post
 */
export const getPostComments = async (postId: string, includeReplies: boolean = true): Promise<Comment[]> => {
    try {
        if (!postId) {
            throw new Error("ID del post requerido");
        }

        // Simplificar query para evitar problemas de índices
        const q = query(
            commentsCollection,
            where("postId", "==", postId)
        );

        const snapshot = await getDocs(q);
        
        // Filtrar en el cliente para evitar problemas de índices
        let comments = snapshot.docs
            .map((doc) => {
                const commentData = serializeFirestoreData(doc.data());
                const comment = { id: doc.id, ...commentData } as Comment;
                return comment;
            })
            .filter((comment) => {
                // Filtrar comentarios borrados y no aprobados
                const isValid = !comment.isDeleted && comment.isApproved;
                if (!includeReplies) {
                    // Si no incluimos respuestas, solo comentarios principales
                    return isValid && !comment.parentId;
                }
                return isValid;
            })
            .sort((a, b) => {
                // Ordenar por fecha de creación
                const dateA = new Date(a.createdAt).getTime();
                const dateB = new Date(b.createdAt).getTime();
                return dateA - dateB;
            });
        
        if (includeReplies) {
            // Organizar comentarios en estructura jerárquica
            comments = organizeComments(comments);
        }

        return comments;
    } catch (error) {
        console.error("Error getting post comments:", error);
        return [];
    }
};

/**
 * Obtener un comentario por ID
 */
export const getCommentById = async (commentId: string): Promise<Comment | null> => {
    try {
        if (!commentId) {
            throw new Error("ID del comentario requerido");
        }

        const commentDoc = await getDoc(doc(commentsCollection, commentId));
        
        if (!commentDoc.exists()) {
            return null;
        }

        const commentData = serializeFirestoreData(commentDoc.data());
        return { id: commentDoc.id, ...commentData } as Comment;
    } catch (error) {
        console.error("Error getting comment by ID:", error);
        return null;
    }
};

/**
 * Actualizar un comentario
 */
export const updateComment = async (commentId: string, content: string, userId: string): Promise<void> => {
    try {
        if (!commentId || !content?.trim() || !userId) {
            throw new Error("Datos para actualización inválidos");
        }

        if (content.trim().length > 2000) {
            throw new Error("El comentario debe tener máximo 2000 caracteres");
        }

        const comment = await getCommentById(commentId);
        if (!comment) {
            throw new Error("Comentario no encontrado");
        }

        if (comment.author.id !== userId) {
            throw new Error("No tienes permisos para editar este comentario");
        }

        const commentRef = doc(commentsCollection, commentId);
        await setDoc(commentRef, {
            content: content.trim(),
            updatedAt: serverTimestamp(),
            isEdited: true,
        }, { merge: true });

    } catch (error) {
        console.error("Error updating comment:", error);
        throw error;
    }
};

/**
 * Eliminar un comentario (soft delete)
 */
export const deleteComment = async (commentId: string, userId: string): Promise<void> => {
    try {
        if (!commentId || !userId) {
            throw new Error("Datos para eliminación inválidos");
        }

        const comment = await getCommentById(commentId);
        if (!comment) {
            throw new Error("Comentario no encontrado");
        }

        if (comment.author.id !== userId) {
            throw new Error("No tienes permisos para eliminar este comentario");
        }

        const commentRef = doc(commentsCollection, commentId);
        await setDoc(commentRef, {
            isDeleted: true,
            updatedAt: serverTimestamp(),
        }, { merge: true });

        // Si tenía comentario padre, decrementar contador
        if (comment.parentId) {
            await incrementReplyCount(comment.parentId, -1);
        }

    } catch (error) {
        console.error("Error deleting comment:", error);
        throw error;
    }
};

/**
 * Dar like a un comentario
 */
export const toggleCommentLike = async (commentId: string, userId: string): Promise<{ likes: number, isLiked: boolean }> => {
    try {
        if (!commentId || !userId) {
            throw new Error("Datos inválidos para like");
        }

        const commentRef = doc(commentsCollection, commentId);
        
        return await runTransaction(db, async (transaction) => {
            const commentDoc = await transaction.get(commentRef);
            
            if (!commentDoc.exists()) {
                throw new Error("Comentario no encontrado");
            }

            const commentData = commentDoc.data();
            const likedBy = commentData.likedBy || [];
            const isCurrentlyLiked = likedBy.includes(userId);

            if (isCurrentlyLiked) {
                // Quitar like
                transaction.update(commentRef, {
                    likes: increment(-1),
                    likedBy: arrayRemove(userId),
                });
                return { 
                    likes: (commentData.likes || 0) - 1, 
                    isLiked: false 
                };
            } else {
                // Agregar like
                transaction.update(commentRef, {
                    likes: increment(1),
                    likedBy: arrayUnion(userId),
                });
                return { 
                    likes: (commentData.likes || 0) + 1, 
                    isLiked: true 
                };
            }
        });
    } catch (error) {
        console.error("Error toggling comment like:", error);
        throw error;
    }
};

/**
 * Incrementar contador de respuestas de un comentario
 */
const incrementReplyCount = async (commentId: string, incrementValue: number): Promise<void> => {
    try {
        const commentRef = doc(commentsCollection, commentId);
        await setDoc(commentRef, {
            replyCount: increment(incrementValue),
        }, { merge: true });
    } catch (error) {
        console.error("Error updating reply count:", error);
    }
};

/**
 * Organizar comentarios en estructura jerárquica
 */
const organizeComments = (comments: Comment[]): Comment[] => {
    const commentMap = new Map<string, Comment>();
    const rootComments: Comment[] = [];

    // Crear mapa de comentarios
    comments.forEach(comment => {
        commentMap.set(comment.id, { ...comment, replies: [] });
    });

    // Organizar jerarquía
    comments.forEach(comment => {
        if (comment.parentId) {
            const parent = commentMap.get(comment.parentId);
            if (parent) {
                parent.replies!.push(commentMap.get(comment.id)!);
            }
        } else {
            rootComments.push(commentMap.get(comment.id)!);
        }
    });

    return rootComments;
};

