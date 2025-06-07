// src/components/post/FloatingSocialShare.tsx

"use client";

import { useState, useEffect } from "react";
import SocialShareButtons from "./SocialShareButtons";
import { FiShare2, FiX } from "react-icons/fi";

interface FloatingSocialShareProps {
    url: string;
    title: string;
    description?: string;
    threshold?: number; // Scroll threshold to show the component
}

export default function FloatingSocialShare({
    url,
    title,
    description,
    threshold = 300
}: FloatingSocialShareProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > threshold) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
                setIsExpanded(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, [threshold]);

    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Main floating button */}
            {!isExpanded ? (
                <button
                    onClick={() => setIsExpanded(true)}
                    className="
                        flex items-center gap-3 px-4 py-3 
                        bg-gradient-to-r from-blue-600 to-purple-600 
                        hover:from-blue-500 hover:to-purple-500
                        text-white rounded-full shadow-2xl 
                        transition-all duration-300 ease-out
                        hover:scale-105 hover:shadow-blue-500/25
                        animate-in slide-in-from-bottom-4 duration-500
                        border border-white/20 backdrop-blur-sm
                    "
                    aria-label="Compartir artículo"
                >
                    <FiShare2 size={20} />
                    <span className="hidden sm:inline font-medium">Compartir</span>
                </button>
            ) : (
                /* Expanded sharing panel */
                <div className="
                    bg-gray-900/95 backdrop-blur-md border border-white/20 
                    rounded-2xl shadow-2xl p-6 min-w-[280px] max-w-[320px]
                    animate-in slide-in-from-bottom-4 duration-300
                ">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <FiShare2 className="text-blue-400" size={18} />
                            <h3 className="text-white font-semibold text-sm">
                                Compartir artículo
                            </h3>
                        </div>
                        <button
                            onClick={() => setIsExpanded(false)}
                            className="
                                p-1.5 rounded-lg text-white/60 hover:text-white 
                                hover:bg-white/10 transition-colors
                            "
                            aria-label="Cerrar panel de compartir"
                        >
                            <FiX size={16} />
                        </button>
                    </div>

                    {/* Article info */}
                    <div className="mb-4 pb-4 border-b border-white/10">
                        <h4 className="text-white text-sm font-medium line-clamp-2 mb-1">
                            {title}
                        </h4>
                        {description && (
                            <p className="text-white/60 text-xs line-clamp-2">
                                {description}
                            </p>
                        )}
                    </div>

                    {/* Social sharing buttons */}
                    <SocialShareButtons
                        url={url}
                        title={title}
                        description={description}
                        variant="vertical"
                        showLabels={false}
                        className="space-y-2"
                    />
                </div>
            )}
        </div>
    );
}