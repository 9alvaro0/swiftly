// src/hooks/useAdminAPI.ts
"use client";

import { useState, useEffect, useCallback } from 'react';
import { auth } from '@/services/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { User } from '@/types/User';
import { Post } from '@/types/Post';
import NewsletterSubscriber from '@/types/NewsletterSubscriber';

interface AdminAPIResponse<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// Shared hook for auth state — avoids 3 duplicate onAuthStateChanged listeners
function useAdminAuth() {
  const [authReady, setAuthReady] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthReady(true);
      if (!user) {
        setAuthError('Authentication required');
      } else {
        setAuthError(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return { authReady, authError };
}

// Generic admin API fetcher
function useAdminFetch<T>(
  endpoint: string,
  params: Record<string, string>,
  resultKey: string
): AdminAPIResponse<T> {
  const { authReady, authError } = useAdminAuth();
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const paramsString = JSON.stringify(params);

  const fetchData = useCallback(async () => {
    if (!auth.currentUser) {
      setError('Authentication required');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const token = await auth.currentUser.getIdToken();
      const searchParams = new URLSearchParams();
      const parsedParams = JSON.parse(paramsString) as Record<string, string>;
      for (const [key, value] of Object.entries(parsedParams)) {
        if (value) searchParams.append(key, value);
      }

      const response = await fetch(`${endpoint}?${searchParams}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result[resultKey]);
    } catch (err) {
      console.error(`Error fetching ${endpoint}:`, err);
      setError(err instanceof Error ? err.message : `Failed to fetch ${endpoint}`);
    } finally {
      setIsLoading(false);
    }
  }, [endpoint, paramsString, resultKey]);

  useEffect(() => {
    if (authReady && auth.currentUser) {
      fetchData();
    } else if (authReady && authError) {
      setError(authError);
      setIsLoading(false);
    }
  }, [authReady, authError, fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}

export function useAdminUsers(
  searchTerm: string = '',
  role: string = '',
  status: string = ''
): AdminAPIResponse<User[]> {
  return useAdminFetch<User[]>(
    '/api/admin/users',
    { search: searchTerm, role, status },
    'users'
  );
}

export function useAdminPosts(
  searchTerm: string = '',
  status: string = '',
  type: string = ''
): AdminAPIResponse<Post[]> {
  return useAdminFetch<Post[]>(
    '/api/admin/posts',
    { search: searchTerm, status, type },
    'posts'
  );
}

export function useAdminNewsletter(
  searchTerm: string = '',
  status: string = ''
): AdminAPIResponse<NewsletterSubscriber[]> {
  return useAdminFetch<NewsletterSubscriber[]>(
    '/api/admin/newsletter',
    { search: searchTerm, status },
    'subscribers'
  );
}
