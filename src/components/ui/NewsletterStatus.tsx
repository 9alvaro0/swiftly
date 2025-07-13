"use client";

import React from 'react';
import { Mail } from 'lucide-react';
import { useNewsletterSubscription } from '@/hooks/useNewsletterSubscription';

interface NewsletterStatusProps {
    compact?: boolean;
    showText?: boolean;
}

export default function NewsletterStatus({ compact = false, showText = true }: NewsletterStatusProps) {
    const { isSubscribed, isLoading } = useNewsletterSubscription();

    if (isLoading) {
        return (
            <div className={`flex items-center gap-2 ${compact ? 'text-xs' : 'text-sm'}`}>
                <div className="animate-pulse">
                    <Mail className={`${compact ? 'h-3 w-3' : 'h-4 w-4'} text-gray-400`} />
                </div>
                {showText && <span className="text-gray-400">Verificando...</span>}
            </div>
        );
    }

    return (
        <div className={`flex items-center gap-2 ${compact ? 'text-xs' : 'text-sm'}`}>
            <Mail 
                className={`${compact ? 'h-3 w-3' : 'h-4 w-4'} ${
                    isSubscribed 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-gray-400 dark:text-gray-500'
                }`} 
            />
            {showText && (
                <span className={
                    isSubscribed 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-gray-500 dark:text-gray-400'
                }>
                    {isSubscribed ? 'Suscrito al newsletter' : 'No suscrito'}
                </span>
            )}
        </div>
    );
}