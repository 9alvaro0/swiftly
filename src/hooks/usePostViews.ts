// src/hooks/usePostViews.ts
import { useState, useEffect, useRef } from 'react';
import { incrementPostViews, getPostViews } from '@/firebase/firestore/post';

/**
 * Hook para gestionar y actualizar las vistas de un post
 * @param postId ID del post
 * @param initialViews Número inicial de vistas (opcional)
 * @returns Un objeto con el número de vistas y el estado de carga
 */
export function usePostViews(postId: string, initialViews: number = 0) {
  const [views, setViews] = useState<number>(initialViews);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const viewRegistered = useRef<boolean>(false);

  // Registra una vista y actualiza el estado local
  const registerView = async () => {
    // Evitar incrementar múltiples veces en la misma sesión
    if (viewRegistered.current) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // Incrementa las vistas en Firestore
      const result = await incrementPostViews(postId);
      setViews(result.views);
      
      // Marcar que ya se ha registrado la vista
      viewRegistered.current = true;
    } catch (err) {
      console.error('Error al registrar vista:', err);
      setError('No se pudo registrar la vista');
    } finally {
      setLoading(false);
    }
  };

  // Obtiene el número actual de vistas
  const refreshViews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const currentViews = await getPostViews(postId);
      setViews(currentViews);
    } catch (err) {
      console.error('Error al obtener vistas:', err);
      setError('No se pudo obtener el número de vistas');
    } finally {
      setLoading(false);
    }
  };

  // Efecto para registrar automáticamente la vista al montar el componente
  useEffect(() => {
    if (postId) {
      registerView();
    }
    
    // No es necesario limpiar viewRegistered.current ya que queremos que persista durante
    // toda la sesión para evitar múltiples vistas del mismo usuario
  }, [postId]);

  return { views, loading, error, refreshViews };
}
