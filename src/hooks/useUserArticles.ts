'use client';

import { useState, useEffect } from 'react';
import { PostWithAuthor } from '@/types/Post';
import { UserStats } from '@/types/User';
import { getUserLikedPosts, getUserViewedPosts } from '@/services/firebase/firestore/post';

export function useUserLikedArticles(userStats: UserStats | undefined) {
    const [likedPosts, setLikedPosts] = useState<PostWithAuthor[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLikedPosts = async () => {
            if (!userStats?.likes?.length) {
                setLikedPosts([]);
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                const posts = await getUserLikedPosts(userStats);
                setLikedPosts(posts);
            } catch (err) {
                console.error('Error fetching liked posts:', err);
                setError('Error al cargar los artículos que te gustan');
                setLikedPosts([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLikedPosts();
    }, [userStats]);

    return { likedPosts, isLoading, error };
}

export function useUserViewedArticles(userStats: UserStats | undefined) {
    const [viewedPosts, setViewedPosts] = useState<PostWithAuthor[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchViewedPosts = async () => {
            if (!userStats?.views?.length) {
                setViewedPosts([]);
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                const posts = await getUserViewedPosts(userStats);
                setViewedPosts(posts);
            } catch (err) {
                console.error('Error fetching viewed posts:', err);
                setError('Error al cargar los artículos vistos recientemente');
                setViewedPosts([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchViewedPosts();
    }, [userStats]);

    return { viewedPosts, isLoading, error };
}