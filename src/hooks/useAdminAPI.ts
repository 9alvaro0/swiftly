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

export function useAdminUsers(
  searchTerm: string = '',
  role: string = '',
  status: string = ''
): AdminAPIResponse<User[]> {
  const [data, setData] = useState<User[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authReady, setAuthReady] = useState(false);

  // Wait for auth to be ready
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthReady(true);
      if (!user) {
        setError('Authentication required');
        setIsLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchUsers = useCallback(async () => {
    if (!auth.currentUser) {
      setError('Authentication required');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const token = await auth.currentUser.getIdToken();
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (role) params.append('role', role);
      if (status) params.append('status', status);

      const response = await fetch(`/api/admin/users?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result.users);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, role, status]);

  useEffect(() => {
    if (authReady && auth.currentUser) {
      fetchUsers();
    }
  }, [authReady, fetchUsers]);

  return { data, isLoading, error, refetch: fetchUsers };
}

export function useAdminPosts(
  searchTerm: string = '',
  status: string = '',
  type: string = ''
): AdminAPIResponse<Post[]> {
  const [data, setData] = useState<Post[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authReady, setAuthReady] = useState(false);

  // Wait for auth to be ready
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthReady(true);
      if (!user) {
        setError('Authentication required');
        setIsLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchPosts = useCallback(async () => {
    if (!auth.currentUser) {
      setError('Authentication required');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const token = await auth.currentUser.getIdToken();
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (status) params.append('status', status);
      if (type) params.append('type', type);

      const response = await fetch(`/api/admin/posts?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result.posts);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch posts');
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, status, type]);

  useEffect(() => {
    if (authReady && auth.currentUser) {
      fetchPosts();
    }
  }, [authReady, fetchPosts]);

  return { data, isLoading, error, refetch: fetchPosts };
}

export function useAdminNewsletter(
  searchTerm: string = '',
  status: string = ''
): AdminAPIResponse<NewsletterSubscriber[]> {
  const [data, setData] = useState<NewsletterSubscriber[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authReady, setAuthReady] = useState(false);

  // Wait for auth to be ready
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthReady(true);
      if (!user) {
        setError('Authentication required');
        setIsLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchSubscribers = useCallback(async () => {
    if (!auth.currentUser) {
      setError('Authentication required');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const token = await auth.currentUser.getIdToken();
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (status) params.append('status', status);

      const response = await fetch(`/api/admin/newsletter?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result.subscribers);
    } catch (err) {
      console.error('Error fetching newsletter subscribers:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch subscribers');
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, status]);

  useEffect(() => {
    if (authReady && auth.currentUser) {
      fetchSubscribers();
    }
  }, [authReady, fetchSubscribers]);

  return { data, isLoading, error, refetch: fetchSubscribers };
}