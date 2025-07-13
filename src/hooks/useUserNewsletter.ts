// src/hooks/useUserNewsletter.ts
import { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '@/store/authStore';
import { auth } from '@/services/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { toast } from 'sonner';

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
      const token = await auth.currentUser.getIdToken();

      const response = await fetch(`/api/user/newsletter?email=${encodeURIComponent(user.email)}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al obtener el estado de suscripción');
      }

      setSubscriptionStatus(data.subscriptionStatus);
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
      const token = await auth.currentUser.getIdToken();

      const response = await fetch('/api/user/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          action: 'subscribe',
          email: user.email
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al suscribirse');
      }

      setSubscriptionStatus({
        isSubscribed: true,
        isActive: true
      });

      toast.success(data.message || 'Te has suscrito correctamente');
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
      const token = await auth.currentUser.getIdToken();

      const response = await fetch('/api/user/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          action: 'unsubscribe',
          email: user.email
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al desuscribirse');
      }

      setSubscriptionStatus({
        isSubscribed: true,
        isActive: false
      });

      toast.success(data.message || 'Te has desuscrito correctamente');
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