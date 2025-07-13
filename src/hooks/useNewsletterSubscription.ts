import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { getSubscriptionStatus, subscribe, unsubscribe } from '@/services/firebase/firestore/newsletter';
import { toast } from 'sonner';

interface UseNewsletterSubscriptionReturn {
    isSubscribed: boolean;
    isLoading: boolean;
    error: string | null;
    toggleSubscription: () => Promise<void>;
}

export function useNewsletterSubscription(): UseNewsletterSubscriptionReturn {
    const { user } = useAuthStore();
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Check subscription status on mount and when user changes
    useEffect(() => {
        const checkSubscriptionStatus = async () => {
            if (!user?.email) {
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                const status = await getSubscriptionStatus(user.email);
                
                if (status) {
                    setIsSubscribed(status.isActive);
                } else {
                    setIsSubscribed(false);
                }
                
                setError(null);
            } catch (err) {
                console.error('Error checking subscription status:', err);
                setError('No se pudo verificar el estado de suscripción');
                setIsSubscribed(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkSubscriptionStatus();
    }, [user]);

    const toggleSubscription = async () => {
        if (!user?.email) {
            toast.error('Debes iniciar sesión para gestionar tu suscripción');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            if (isSubscribed) {
                // Unsubscribe
                await unsubscribe(user.email);
                setIsSubscribed(false);
                toast.success('Te has desuscrito del newsletter correctamente');
            } else {
                // Subscribe
                await subscribe(user.email, {
                    source: 'profile',
                    userId: user.uid,
                    userName: user.name
                });
                setIsSubscribed(true);
                toast.success('Te has suscrito al newsletter correctamente');
            }
        } catch (err) {
            console.error('Error toggling subscription:', err);
            const errorMessage = err instanceof Error ? err.message : 'Error al actualizar la suscripción';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isSubscribed,
        isLoading,
        error,
        toggleSubscription
    };
}