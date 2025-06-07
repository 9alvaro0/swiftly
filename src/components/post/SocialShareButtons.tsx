// src/components/post/SocialShareButtons.tsx

"use client";

import { useState } from "react";
import { 
    FaTwitter, 
    FaFacebook, 
    FaLinkedin, 
    FaWhatsapp, 
    FaTelegram,
    FaReddit,
    FaCopy,
    FaShare
} from "react-icons/fa";
import { FiCheck, FiShare2 } from "react-icons/fi";
import { useSocialShare } from "@/hooks/useSocialShare";

interface SocialShareButtonsProps {
    url: string;
    title: string;
    description?: string;
    className?: string;
    variant?: "horizontal" | "vertical" | "dropdown";
    showLabels?: boolean;
}

interface SharePlatform {
    key: string;
    name: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    color: string;
    bgColor: string;
    hoverColor: string;
}

const sharePlatforms = [
    {
        key: "twitter",
        name: "Twitter",
        icon: FaTwitter,
        color: "text-blue-400",
        bgColor: "bg-blue-500/10",
        hoverColor: "hover:bg-blue-500/20"
    },
    {
        key: "facebook",
        name: "Facebook",
        icon: FaFacebook,
        color: "text-blue-600",
        bgColor: "bg-blue-600/10",
        hoverColor: "hover:bg-blue-600/20"
    },
    {
        key: "linkedin",
        name: "LinkedIn",
        icon: FaLinkedin,
        color: "text-blue-700",
        bgColor: "bg-blue-700/10",
        hoverColor: "hover:bg-blue-700/20"
    },
    {
        key: "whatsapp",
        name: "WhatsApp",
        icon: FaWhatsapp,
        color: "text-green-500",
        bgColor: "bg-green-500/10",
        hoverColor: "hover:bg-green-500/20"
    },
    {
        key: "telegram",
        name: "Telegram",
        icon: FaTelegram,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
        hoverColor: "hover:bg-blue-500/20"
    },
    {
        key: "reddit",
        name: "Reddit",
        icon: FaReddit,
        color: "text-orange-500",
        bgColor: "bg-orange-500/10",
        hoverColor: "hover:bg-orange-500/20"
    }
];

export default function SocialShareButtons({
    url,
    title,
    description,
    className = "",
    variant = "horizontal",
    showLabels = false
}: SocialShareButtonsProps) {
    const [copied, setCopied] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    
    const {
        shareToplatform,
        copyToClipboard,
        nativeShare,
        isSharing,
        isNativeShareSupported
    } = useSocialShare({
        trackAnalytics: true,
        onShare: (analytics) => {
            // Custom analytics handling can be added here
            console.log('Share analytics:', analytics);
        }
    });

    const handleShare = async (platform: SharePlatform) => {
        await shareToplatform(platform.key, url, title, description);
        
        if (variant === "dropdown") {
            setShowDropdown(false);
        }
    };

    const handleCopyUrl = async () => {
        const success = await copyToClipboard(url, title);
        if (success) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleNativeShare = async () => {
        await nativeShare(url, title, description);
    };

    const renderShareButton = (platform: SharePlatform) => (
        <button
            key={platform.name}
            onClick={() => handleShare(platform)}
            disabled={isSharing}
            className={`
                flex items-center gap-2 p-3 rounded-xl transition-all duration-200 
                ${platform.bgColor} ${platform.hoverColor} ${platform.color}
                hover:scale-105 hover:shadow-lg
                ${variant === "vertical" ? "w-full justify-start" : ""}
                ${!showLabels && variant !== "vertical" ? "aspect-square justify-center" : ""}
                ${isSharing ? "opacity-50 cursor-not-allowed" : ""}
            `}
            title={`Compartir en ${platform.name}`}
            aria-label={`Compartir en ${platform.name}`}
        >
            <platform.icon size={18} />
            {(showLabels || variant === "vertical") && (
                <span className="text-sm font-medium">{platform.name}</span>
            )}
        </button>
    );

    const renderCopyButton = () => (
        <button
            onClick={handleCopyUrl}
            disabled={isSharing}
            className={`
                flex items-center gap-2 p-3 rounded-xl transition-all duration-200
                ${copied 
                    ? "bg-green-500/10 text-green-500 hover:bg-green-500/20" 
                    : "bg-gray-500/10 text-gray-400 hover:bg-gray-500/20 hover:text-gray-300"
                }
                hover:scale-105 hover:shadow-lg
                ${variant === "vertical" ? "w-full justify-start" : ""}
                ${!showLabels && variant !== "vertical" ? "aspect-square justify-center" : ""}
                ${isSharing ? "opacity-50 cursor-not-allowed" : ""}
            `}
            title="Copiar enlace"
            aria-label="Copiar enlace"
        >
            {copied ? <FiCheck size={18} /> : <FaCopy size={18} />}
            {(showLabels || variant === "vertical") && (
                <span className="text-sm font-medium">
                    {copied ? "Copiado" : "Copiar enlace"}
                </span>
            )}
        </button>
    );

    const renderNativeShareButton = () => {
        if (!isNativeShareSupported) return null;
        
        return (
            <button
                onClick={handleNativeShare}
                disabled={isSharing}
                className={`
                    flex items-center gap-2 p-3 rounded-xl transition-all duration-200
                    bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20
                    hover:scale-105 hover:shadow-lg
                    ${variant === "vertical" ? "w-full justify-start" : ""}
                    ${!showLabels && variant !== "vertical" ? "aspect-square justify-center" : ""}
                    ${isSharing ? "opacity-50 cursor-not-allowed" : ""}
                `}
                title="Compartir"
                aria-label="Compartir"
            >
                <FiShare2 size={18} />
                {(showLabels || variant === "vertical") && (
                    <span className="text-sm font-medium">Compartir</span>
                )}
            </button>
        );
    };

    if (variant === "dropdown") {
        return (
            <div className={`relative ${className}`}>
                <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    disabled={isSharing}
                    className={`
                        flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 
                        border border-white/20 text-white rounded-xl transition-all duration-200 
                        hover:scale-105
                        ${isSharing ? "opacity-50 cursor-not-allowed" : ""}
                    `}
                >
                    <FaShare size={16} />
                    <span className="text-sm font-medium">Compartir</span>
                </button>

                {showDropdown && (
                    <>
                        {/* Overlay */}
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setShowDropdown(false)}
                        />
                        
                        {/* Dropdown menu */}
                        <div className="absolute right-0 top-12 bg-gray-900/95 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl py-3 z-50 min-w-[200px] animate-in slide-in-from-top-2 duration-200">
                            <div className="px-3 pb-2 mb-2 border-b border-white/10">
                                <p className="text-xs text-white/70 font-medium">Compartir artículo</p>
                            </div>
                            
                            <div className="space-y-1 px-2">
                                {isNativeShareSupported && (
                                    <button
                                        onClick={handleNativeShare}
                                        className="flex items-center gap-3 px-3 py-2.5 text-sm text-white hover:bg-white/10 w-full text-left transition-colors rounded-lg"
                                    >
                                        <FiShare2 size={16} className="text-indigo-400" />
                                        Compartir
                                    </button>
                                )}
                                
                                {sharePlatforms.map((platform) => (
                                    <button
                                        key={platform.key}
                                        onClick={() => handleShare(platform)}
                                        disabled={isSharing}
                                        className={`
                                            flex items-center gap-3 px-3 py-2.5 text-sm text-white 
                                            hover:bg-white/10 w-full text-left transition-colors rounded-lg
                                            ${isSharing ? "opacity-50 cursor-not-allowed" : ""}
                                        `}
                                    >
                                        <platform.icon size={16} className={platform.color} />
                                        {platform.name}
                                    </button>
                                ))}
                                
                                <div className="border-t border-white/10 my-1" />
                                
                                <button
                                    onClick={handleCopyUrl}
                                    disabled={isSharing}
                                    className={`
                                        flex items-center gap-3 px-3 py-2.5 text-sm text-white 
                                        hover:bg-white/10 w-full text-left transition-colors rounded-lg
                                        ${isSharing ? "opacity-50 cursor-not-allowed" : ""}
                                    `}
                                >
                                    {copied ? (
                                        <FiCheck size={16} className="text-green-400" />
                                    ) : (
                                        <FaCopy size={16} className="text-gray-400" />
                                    )}
                                    {copied ? "Copiado" : "Copiar enlace"}
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        );
    }

    const buttonElements = [
        ...sharePlatforms.map((platform) => renderShareButton(platform)),
        renderCopyButton(),
        renderNativeShareButton()
    ].filter(Boolean);

    if (variant === "vertical") {
        return (
            <div className={`space-y-2 ${className}`}>
                <div className="flex items-center gap-2 mb-4">
                    <FaShare className="text-blue-400" size={16} />
                    <h3 className="text-sm font-semibold text-white">Compartir artículo</h3>
                </div>
                {buttonElements}
            </div>
        );
    }

    // Horizontal layout
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            {showLabels && (
                <div className="flex items-center gap-2 mr-3">
                    <FaShare className="text-blue-400" size={16} />
                    <span className="text-sm font-semibold text-white">Compartir:</span>
                </div>
            )}
            <div className="flex flex-wrap gap-2">
                {buttonElements}
            </div>
        </div>
    );
}