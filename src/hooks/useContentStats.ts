// src/hooks/useContentStats.ts

"use client";

import { useState, useEffect } from "react";
import { getAllPublishedPosts } from "@/services/firebase/firestore/post";
import { useTags } from "./useTags";

interface ContentStats {
    totalPosts: number;
    totalTutorials: number;
    totalCategories: number;
    totalReadingHours: number;
    postsReadingHours: number;
    tutorialsReadingHours: number;
    loading: boolean;
}

export function useContentStats(): ContentStats {
    const [stats, setStats] = useState<ContentStats>({
        totalPosts: 0,
        totalTutorials: 0,
        totalCategories: 0,
        totalReadingHours: 0,
        postsReadingHours: 0,
        tutorialsReadingHours: 0,
        loading: true
    });

    const { tags } = useTags();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Obtener todos los posts y tutoriales
                const [posts, tutorials] = await Promise.all([
                    getAllPublishedPosts({ type: "article" }),
                    getAllPublishedPosts({ type: "tutorial" })
                ]);
                
                // Additional filter to ensure only published content is counted
                const publishedPosts = posts.filter(post => post.isPublished === true);
                const publishedTutorials = tutorials.filter(tutorial => tutorial.isPublished === true);

                // Calcular tiempo total de lectura en horas
                const postsMinutes = publishedPosts.reduce((total, item) => total + (item.readTime || 0), 0);
                const tutorialsMinutes = publishedTutorials.reduce((total, item) => total + (item.readTime || 0), 0);
                const totalMinutes = postsMinutes + tutorialsMinutes;
                
                const totalHours = Math.round(totalMinutes / 60);
                const postsHours = Math.round(postsMinutes / 60);
                const tutorialsHours = Math.round(tutorialsMinutes / 60);

                setStats({
                    totalPosts: publishedPosts.length,
                    totalTutorials: publishedTutorials.length,
                    totalCategories: tags.length,
                    totalReadingHours: totalHours,
                    postsReadingHours: postsHours,
                    tutorialsReadingHours: tutorialsHours,
                    loading: false
                });
            } catch (error) {
                console.error("Error fetching content stats:", error);
                setStats(prev => ({ ...prev, loading: false }));
            }
        };

        fetchStats();
    }, [tags.length]);

    return stats;
}