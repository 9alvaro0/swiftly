// src/components/admin/dashboard/stats/StatsShareSection.tsx

"use client";

import React, { useState, useEffect } from "react";
import { FaShare, FaTwitter, FaFacebook, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { FiTrendingUp, FiCalendar, FiLink } from "react-icons/fi";

interface ShareAnalytics {
    platform: string;
    url: string;
    title: string;
    timestamp: Date;
}

interface PlatformIconProps {
    className?: string;
    size?: number;
}

interface ShareStats {
    totalShares: number;
    topPlatforms: { platform: string; count: number; icon: React.ComponentType<PlatformIconProps> }[];
    recentShares: ShareAnalytics[];
    sharesThisWeek: number;
    shareGrowth: number;
}

const platformIcons: Record<string, React.ComponentType<PlatformIconProps>> = {
    "Twitter": FaTwitter,
    "Facebook": FaFacebook,
    "LinkedIn": FaLinkedin,
    "WhatsApp": FaWhatsapp,
    "Clipboard": FiLink,
    "Native Share": FaShare,
    "Telegram": FaShare,
    "Reddit": FaShare
};

export default function StatsShareSection() {
    const [shareStats, setShareStats] = useState<ShareStats>({
        totalShares: 0,
        topPlatforms: [],
        recentShares: [],
        sharesThisWeek: 0,
        shareGrowth: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadShareStats = () => {
            try {
                const shares = JSON.parse(localStorage.getItem('socialShares') || '[]') as ShareAnalytics[];
                
                if (shares.length === 0) {
                    setLoading(false);
                    return;
                }

                // Convert timestamp strings back to Date objects
                const processedShares = shares.map(share => ({
                    ...share,
                    timestamp: new Date(share.timestamp)
                }));

                // Calculate total shares
                const totalShares = processedShares.length;

                // Calculate shares this week
                const oneWeekAgo = new Date();
                oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                const sharesThisWeek = processedShares.filter(
                    share => share.timestamp >= oneWeekAgo
                ).length;

                // Calculate growth (shares this week vs previous week)
                const twoWeeksAgo = new Date();
                twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
                const sharesPreviousWeek = processedShares.filter(
                    share => share.timestamp >= twoWeeksAgo && share.timestamp < oneWeekAgo
                ).length;
                
                const shareGrowth = sharesPreviousWeek > 0 
                    ? ((sharesThisWeek - sharesPreviousWeek) / sharesPreviousWeek) * 100 
                    : sharesThisWeek > 0 ? 100 : 0;

                // Calculate top platforms
                const platformCounts: Record<string, number> = {};
                processedShares.forEach(share => {
                    platformCounts[share.platform] = (platformCounts[share.platform] || 0) + 1;
                });

                const topPlatforms = Object.entries(platformCounts)
                    .map(([platform, count]) => ({
                        platform,
                        count,
                        icon: platformIcons[platform] || FaShare
                    }))
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 5);

                // Get recent shares (last 5)
                const recentShares = processedShares
                    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                    .slice(0, 5);

                setShareStats({
                    totalShares,
                    topPlatforms,
                    recentShares,
                    sharesThisWeek,
                    shareGrowth
                });
            } catch (error) {
                console.error('Error loading share stats:', error);
            } finally {
                setLoading(false);
            }
        };

        loadShareStats();
    }, []);

    if (loading) {
        return (
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="animate-pulse">
                    <div className="h-6 bg-white/10 rounded w-1/3 mb-4"></div>
                    <div className="space-y-3">
                        <div className="h-4 bg-white/10 rounded w-1/2"></div>
                        <div className="h-4 bg-white/10 rounded w-2/3"></div>
                        <div className="h-4 bg-white/10 rounded w-1/4"></div>
                    </div>
                </div>
            </div>
        );
    }

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('es-ES', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    return (
        <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-6 border border-white/20 backdrop-blur-sm">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-lg">
                    <FaShare className="text-blue-400" size={20} />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white">Estadísticas de Compartir</h3>
                    <p className="text-white/60 text-sm">Analytics de redes sociales</p>
                </div>
            </div>

            {shareStats.totalShares === 0 ? (
                <div className="text-center py-8">
                    <FaShare className="mx-auto text-white/30 mb-3" size={32} />
                    <p className="text-white/60">No hay datos de compartir aún</p>
                    <p className="text-white/40 text-sm mt-1">
                        Las estadísticas aparecerán cuando los usuarios compartan contenido
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Key metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                            <div className="flex items-center gap-2 mb-2">
                                <FaShare className="text-blue-400" size={16} />
                                <span className="text-white/80 text-sm font-medium">Total</span>
                            </div>
                            <p className="text-2xl font-bold text-white">{shareStats.totalShares}</p>
                        </div>

                        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                            <div className="flex items-center gap-2 mb-2">
                                <FiCalendar className="text-green-400" size={16} />
                                <span className="text-white/80 text-sm font-medium">Esta semana</span>
                            </div>
                            <p className="text-2xl font-bold text-white">{shareStats.sharesThisWeek}</p>
                        </div>

                        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                            <div className="flex items-center gap-2 mb-2">
                                <FiTrendingUp className={`${shareStats.shareGrowth >= 0 ? 'text-green-400' : 'text-red-400'}`} size={16} />
                                <span className="text-white/80 text-sm font-medium">Crecimiento</span>
                            </div>
                            <p className={`text-2xl font-bold ${shareStats.shareGrowth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {shareStats.shareGrowth >= 0 ? '+' : ''}{shareStats.shareGrowth.toFixed(1)}%
                            </p>
                        </div>
                    </div>

                    {/* Top platforms */}
                    <div>
                        <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                            <FiTrendingUp className="text-blue-400" size={16} />
                            Plataformas más populares
                        </h4>
                        <div className="space-y-2">
                            {shareStats.topPlatforms.map((platform) => (
                                <div key={platform.platform} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                                    <div className="flex items-center gap-3">
                                        <platform.icon className="text-blue-400" size={16} />
                                        <span className="text-white text-sm">{platform.platform}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-white font-medium">{platform.count}</span>
                                        <div className="w-16 bg-white/10 rounded-full h-2">
                                            <div 
                                                className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                                                style={{ 
                                                    width: `${(platform.count / shareStats.topPlatforms[0].count) * 100}%` 
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent shares */}
                    <div>
                        <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                            <FiCalendar className="text-blue-400" size={16} />
                            Actividad reciente
                        </h4>
                        <div className="space-y-2">
                            {shareStats.recentShares.map((share, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        <div className="p-1.5 bg-white/10 rounded">
                                            {React.createElement(platformIcons[share.platform] || FaShare, {
                                                size: 12,
                                                className: "text-blue-400"
                                            })}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-white text-sm truncate">{share.title}</p>
                                            <p className="text-white/50 text-xs">{share.platform}</p>
                                        </div>
                                    </div>
                                    <span className="text-white/60 text-xs whitespace-nowrap ml-2">
                                        {formatDate(share.timestamp)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}