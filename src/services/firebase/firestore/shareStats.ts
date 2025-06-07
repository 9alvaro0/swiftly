// src/services/firebase/firestore/shareStats.ts

import { doc, runTransaction, serverTimestamp, Timestamp, getDoc } from "firebase/firestore";
import { db } from "../config";
import { ShareStats } from "@/types/Post";

/**
 * Incrementar estadísticas de compartir para un post
 */
export const incrementPostShareStat = async (
    postId: string, 
    platform: keyof ShareStats['platforms']
): Promise<void> => {
    try {
        if (!postId || !platform) {
            throw new Error("PostId and platform are required");
        }

        const postRef = doc(db, "posts", postId);
        
        await runTransaction(db, async (transaction) => {
            const postDoc = await transaction.get(postRef);
            
            if (!postDoc.exists()) {
                throw new Error("Post not found");
            }

            const postData = postDoc.data();
            const currentShareStats = postData.shareStats || {
                totalShares: 0,
                platforms: {
                    twitter: 0,
                    facebook: 0,
                    linkedin: 0,
                    whatsapp: 0,
                    telegram: 0,
                    reddit: 0,
                    clipboard: 0,
                    native: 0
                },
                sharesThisWeek: 0,
                sharesThisMonth: 0
            };

            // Calculate date ranges
            const now = new Date();
            const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            
            // Get last shared date to check if we need to reset weekly/monthly counters
            const lastShared = currentShareStats.lastShared 
                ? currentShareStats.lastShared instanceof Timestamp 
                    ? currentShareStats.lastShared.toDate()
                    : new Date(currentShareStats.lastShared)
                : null;

            // Reset counters if needed (simplified approach)
            let sharesThisWeek = currentShareStats.sharesThisWeek || 0;
            let sharesThisMonth = currentShareStats.sharesThisMonth || 0;

            // If last share was more than a week ago, we don't add to week counter
            // This is a simplified approach - in production you'd want more sophisticated tracking
            if (!lastShared || lastShared < oneWeekAgo) {
                sharesThisWeek = 1;
            } else {
                sharesThisWeek += 1;
            }

            if (!lastShared || lastShared < oneMonthAgo) {
                sharesThisMonth = 1;
            } else {
                sharesThisMonth += 1;
            }

            const updatedShareStats: ShareStats = {
                totalShares: (currentShareStats.totalShares || 0) + 1,
                platforms: {
                    ...currentShareStats.platforms,
                    [platform]: (currentShareStats.platforms[platform] || 0) + 1
                },
                lastShared: now,
                sharesThisWeek,
                sharesThisMonth
            };

            transaction.update(postRef, {
                shareStats: {
                    ...updatedShareStats,
                    lastShared: serverTimestamp()
                }
            });
        });

        console.log(`Share stat incremented for post ${postId} on platform ${platform}`);
    } catch (error) {
        console.error("Error incrementing share stat:", error);
        throw new Error(`Failed to increment share stat: ${error instanceof Error ? error.message : String(error)}`);
    }
};

/**
 * Obtener estadísticas de compartir de un post
 */
export const getPostShareStats = async (postId: string): Promise<ShareStats | null> => {
    try {
        if (!postId) {
            throw new Error("PostId is required");
        }

        const postRef = doc(db, "posts", postId);
        const postDoc = await getDoc(postRef);
        
        if (!postDoc.exists()) {
            return null;
        }

        const postData = postDoc.data();
        return postData.shareStats || null;
    } catch (error) {
        console.error("Error getting post share stats:", error);
        return null;
    }
};

/**
 * Obtener estadísticas globales de compartir
 */
export const getGlobalShareStats = async (): Promise<{
    totalShares: number;
    topPosts: Array<{ postId: string; title: string; shares: number }>;
    platformDistribution: ShareStats['platforms'];
}> => {
    try {
        // This would require a more complex implementation in production
        // For now, we'll return empty stats
        return {
            totalShares: 0,
            topPosts: [],
            platformDistribution: {
                twitter: 0,
                facebook: 0,
                linkedin: 0,
                whatsapp: 0,
                telegram: 0,
                reddit: 0,
                clipboard: 0,
                native: 0
            }
        };
    } catch (error) {
        console.error("Error getting global share stats:", error);
        return {
            totalShares: 0,
            topPosts: [],
            platformDistribution: {
                twitter: 0,
                facebook: 0,
                linkedin: 0,
                whatsapp: 0,
                telegram: 0,
                reddit: 0,
                clipboard: 0,
                native: 0
            }
        };
    }
};