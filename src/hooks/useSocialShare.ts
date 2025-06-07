// src/hooks/useSocialShare.ts

import { useState, useCallback } from "react";
import { toast } from "sonner";
import { incrementPostShareStat } from "@/services/firebase/firestore/shareStats";
import { ShareStats } from "@/types/Post";

interface ShareAnalytics {
    platform: string;
    url: string;
    title: string;
    timestamp: Date;
}

interface UseSocialShareOptions {
    trackAnalytics?: boolean;
    trackInFirebase?: boolean;
    postId?: string;
    onShare?: (analytics: ShareAnalytics) => void;
}

interface SharePlatform {
    name: string;
    shareUrl: (url: string, title: string, description?: string) => string;
}

const platforms: Record<string, SharePlatform> = {
    twitter: {
        name: "Twitter",
        shareUrl: (url, title, description) => 
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}${description ? `&via=SwiftlyBlog` : ''}`
    },
    facebook: {
        name: "Facebook", 
        shareUrl: (url, title) => 
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`
    },
    linkedin: {
        name: "LinkedIn",
        shareUrl: (url, title, description) => 
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description || '')}`
    },
    whatsapp: {
        name: "WhatsApp",
        shareUrl: (url, title) => 
            `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`
    },
    telegram: {
        name: "Telegram",
        shareUrl: (url, title) => 
            `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
    },
    reddit: {
        name: "Reddit",
        shareUrl: (url, title) => 
            `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
    }
};

export function useSocialShare(options: UseSocialShareOptions = {}) {
    const { trackAnalytics = true, trackInFirebase = false, postId, onShare } = options;
    const [isSharing, setIsSharing] = useState(false);
    const [shareCount, setShareCount] = useState(0);

    const shareToplatform = useCallback(async (
        platformKey: string,
        url: string,
        title: string,
        description?: string
    ) => {
        const platform = platforms[platformKey.toLowerCase()];
        
        if (!platform) {
            toast.error(`Plataforma de compartir desconocida: ${platformKey}`);
            return false;
        }

        try {
            setIsSharing(true);
            
            const shareUrl = platform.shareUrl(url, title, description);
            
            // Open share window
            const shareWindow = window.open(
                shareUrl, 
                '_blank', 
                'noopener,noreferrer,width=600,height=400,scrollbars=yes,resizable=yes'
            );

            // Track analytics
            if (trackAnalytics) {
                const analytics: ShareAnalytics = {
                    platform: platform.name,
                    url,
                    title,
                    timestamp: new Date()
                };

                // Store in localStorage for persistence
                const existingShares = JSON.parse(
                    localStorage.getItem('socialShares') || '[]'
                );
                existingShares.push(analytics);
                
                // Keep only last 100 shares to prevent storage bloat
                if (existingShares.length > 100) {
                    existingShares.splice(0, existingShares.length - 100);
                }
                
                localStorage.setItem('socialShares', JSON.stringify(existingShares));
                
                // Increment local share count
                setShareCount(prev => prev + 1);
                
                // Track in Firebase if enabled
                if (trackInFirebase && postId) {
                    try {
                        const firebasePlatformKey = platformKey.toLowerCase() as keyof ShareStats['platforms'];
                        await incrementPostShareStat(postId, firebasePlatformKey);
                    } catch (error) {
                        console.error('Error tracking share in Firebase:', error);
                        // Don't fail the share operation if Firebase tracking fails
                    }
                }
                
                // Call custom analytics handler if provided
                if (onShare) {
                    onShare(analytics);
                }
                
                console.log(`Shared to ${platform.name}:`, analytics);
            }

            // Optional: Check if window was closed (user completed share)
            if (shareWindow) {
                const checkClosed = setInterval(() => {
                    if (shareWindow.closed) {
                        clearInterval(checkClosed);
                        toast.success(`Compartido en ${platform.name}`);
                    }
                }, 1000);

                // Clear interval after 30 seconds to prevent memory leaks
                setTimeout(() => {
                    clearInterval(checkClosed);
                }, 30000);
            }

            return true;
        } catch (error) {
            console.error('Error sharing:', error);
            toast.error(`Error al compartir en ${platform.name}`);
            return false;
        } finally {
            setIsSharing(false);
        }
    }, [trackAnalytics, trackInFirebase, postId, onShare]);

    const copyToClipboard = useCallback(async (url: string, title?: string) => {
        try {
            setIsSharing(true);
            await navigator.clipboard.writeText(url);
            
            if (trackAnalytics) {
                const analytics: ShareAnalytics = {
                    platform: "Clipboard",
                    url,
                    title: title || url,
                    timestamp: new Date()
                };

                const existingShares = JSON.parse(
                    localStorage.getItem('socialShares') || '[]'
                );
                existingShares.push(analytics);
                localStorage.setItem('socialShares', JSON.stringify(existingShares));
                
                setShareCount(prev => prev + 1);
                
                // Track in Firebase if enabled
                if (trackInFirebase && postId) {
                    try {
                        await incrementPostShareStat(postId, 'clipboard');
                    } catch (error) {
                        console.error('Error tracking clipboard share in Firebase:', error);
                    }
                }
                
                if (onShare) {
                    onShare(analytics);
                }
            }

            toast.success("Enlace copiado al portapapeles");
            return true;
        } catch (error) {
            console.error('Error copying to clipboard:', error);
            toast.error("Error al copiar el enlace");
            return false;
        } finally {
            setIsSharing(false);
        }
    }, [trackAnalytics, trackInFirebase, postId, onShare]);

    const nativeShare = useCallback(async (
        url: string,
        title: string,
        description?: string
    ) => {
        if (!navigator.share) {
            toast.error("Compartir nativo no está disponible en este dispositivo");
            return false;
        }

        try {
            setIsSharing(true);
            
            await navigator.share({
                title,
                text: description,
                url
            });

            if (trackAnalytics) {
                const analytics: ShareAnalytics = {
                    platform: "Native Share",
                    url,
                    title,
                    timestamp: new Date()
                };

                const existingShares = JSON.parse(
                    localStorage.getItem('socialShares') || '[]'
                );
                existingShares.push(analytics);
                localStorage.setItem('socialShares', JSON.stringify(existingShares));
                
                setShareCount(prev => prev + 1);
                
                // Track in Firebase if enabled
                if (trackInFirebase && postId) {
                    try {
                        await incrementPostShareStat(postId, 'native');
                    } catch (error) {
                        console.error('Error tracking native share in Firebase:', error);
                    }
                }
                
                if (onShare) {
                    onShare(analytics);
                }
            }

            return true;
        } catch (error) {
            // User cancelled or error occurred
            if (error instanceof Error && error.name !== 'AbortError') {
                console.error('Error with native share:', error);
                toast.error("Error al compartir");
            }
            return false;
        } finally {
            setIsSharing(false);
        }
    }, [trackAnalytics, trackInFirebase, postId, onShare]);

    const getShareHistory = useCallback(() => {
        try {
            return JSON.parse(localStorage.getItem('socialShares') || '[]') as ShareAnalytics[];
        } catch {
            return [];
        }
    }, []);

    const clearShareHistory = useCallback(() => {
        localStorage.removeItem('socialShares');
        setShareCount(0);
    }, []);

    return {
        shareToplatform,
        copyToClipboard,
        nativeShare,
        isSharing,
        shareCount,
        getShareHistory,
        clearShareHistory,
        isNativeShareSupported: typeof navigator !== 'undefined' && 'share' in navigator
    };
}