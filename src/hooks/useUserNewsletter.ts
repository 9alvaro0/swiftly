// src/hooks/useUserNewsletter.ts
import { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '@/store/authStore';
import { auth } from '@/services/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { toast } from 'sonner';
import { getSubscriptionStatus, subscribe as subscribeToNewsletter, unsubscribe as unsubscribeFromNewsletter } from '@/services/firebase/firestore/newsletter';

interface SubscriptionStatus {
  isSubscribed: boolean;
  isActive: boolean;
}

export function useUserNewsletter() {
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const { user } = useAuthStore();

  // Wait for auth to be ready
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setAuthReady(true);
      if (!firebaseUser) {
        setSubscriptionStatus(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch subscription status
  const fetchStatus = useCallback(async () => {
    if (!auth.currentUser || !user?.email) {
      setSubscriptionStatus(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const status = await getSubscriptionStatus(user.email);
      setSubscriptionStatus(status || { isSubscribed: false, isActive: false });
    } catch (err) {
      console.error('Error fetching newsletter status:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Subscribe to newsletter
  const subscribe = async () => {
    if (!auth.currentUser || !user?.email) {
      toast.error('No estás autenticado');
      return;
    }

    setIsUpdating(true);

    try {
      await subscribeToNewsletter(user.email, { source: 'profile' });
      
      setSubscriptionStatus({
        isSubscribed: true,
        isActive: true
      });

      toast.success('Te has suscrito al newsletter correctamente');
    } catch (err) {
      console.error('Error subscribing to newsletter:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error al suscribirse';
      toast.error(errorMessage);
    } finally {
      setIsUpdating(false);
    }
  };

  // Unsubscribe from newsletter
  const unsubscribe = async () => {
    if (!auth.currentUser || !user?.email) {
      toast.error('No estás autenticado');
      return;
    }

    setIsUpdating(true);

    try {
      await unsubscribeFromNewsletter(user.email);
      
      setSubscriptionStatus({
        isSubscribed: true,
        isActive: false
      });

      toast.success('Te has desuscrito del newsletter correctamente');
    } catch (err) {
      console.error('Error unsubscribing from newsletter:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error al desuscribirse';
      toast.error(errorMessage);
    } finally {
      setIsUpdating(false);
    }
  };

  // Toggle subscription
  const toggleSubscription = async () => {
    if (!subscriptionStatus) {
      await subscribe();
      return;
    }

    if (subscriptionStatus.isActive) {
      await unsubscribe();
    } else {
      await subscribe();
    }
  };

  // Fetch status on mount and when auth changes
  useEffect(() => {
    if (authReady && auth.currentUser && user?.email) {
      fetchStatus();
    }
  }, [authReady, user?.email, fetchStatus]);

  return {
    subscriptionStatus,
    isLoading,
    isUpdating,
    error,
    subscribe,
    unsubscribe,
    toggleSubscription,
    refetch: fetchStatus
  };
}