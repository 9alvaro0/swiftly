// src/hooks/useAuth.ts
"use client";

import { useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '@/services/firebase/config';
import { toast } from 'sonner';
import { 
  createUserProfile, 
  getUserRole, 
  AuthenticatedUser,
  SecurityUtils,
  RateLimiter
} from '@/utils/auth';

interface AuthError {
  code: string;
  message: string;
}

interface AuthState {
  user: AuthenticatedUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false
  });

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Get user role and custom claims
          const role = await getUserRole(firebaseUser.uid);
          const idTokenResult = await firebaseUser.getIdTokenResult();
          
          const authenticatedUser: AuthenticatedUser = {
            ...firebaseUser,
            role,
            isAdmin: (idTokenResult.claims as Record<string, unknown>).admin === true,
            customClaims: idTokenResult.claims as Record<string, unknown>
          };

          setAuthState({
            user: authenticatedUser,
            isLoading: false,
            isAuthenticated: true
          });

          // Update user profile on login
          await createUserProfile(firebaseUser, { role });
          
        } catch (error) {
          console.error('Error fetching user data:', error);
          setAuthState({
            user: null,
            isLoading: false,
            isAuthenticated: false
          });
        }
      } else {
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false
        });
      }
    });

    return () => unsubscribe();
  }, []);

  // Sign in with email and password
  const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Input validation
      if (!SecurityUtils.isValidEmail(email)) {
        return { success: false, error: 'Formato de email inválido' };
      }

      if (!SecurityUtils.isValidLength(password, 6, 128)) {
        return { success: false, error: 'La contraseña debe tener al menos 6 caracteres' };
      }

      // Rate limiting
      if (!RateLimiter.canPerformAction('auth:' + email, 'post', 5)) {
        return { success: false, error: 'Demasiados intentos de inicio de sesión. Inténtalo más tarde.' };
      }

      // Sanitize inputs
      const sanitizedEmail = SecurityUtils.sanitizeInput(email.toLowerCase().trim());

      await signInWithEmailAndPassword(auth, sanitizedEmail, password);
      
      toast.success('¡Bienvenido de vuelta!');
      return { success: true };
      
    } catch (error) {
      const authError = error as AuthError;
      let errorMessage = 'Error al iniciar sesión';

      switch (authError.code) {
        case 'auth/user-not-found':
          errorMessage = 'No existe una cuenta con este email';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Contraseña incorrecta';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Email inválido';
          break;
        case 'auth/user-disabled':
          errorMessage = 'Esta cuenta ha sido deshabilitada';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Demasiados intentos fallidos. Inténtalo más tarde';
          break;
        default:
          errorMessage = 'Error de autenticación. Inténtalo de nuevo';
      }

      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Sign up with email and password
  const signUp = async (
    email: string, 
    password: string, 
    displayName: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      // Input validation
      if (!SecurityUtils.isValidEmail(email)) {
        return { success: false, error: 'Formato de email inválido' };
      }

      if (!SecurityUtils.isValidLength(password, 6, 128)) {
        return { success: false, error: 'La contraseña debe tener al menos 6 caracteres' };
      }

      if (!SecurityUtils.isValidLength(displayName, 2, 50)) {
        return { success: false, error: 'El nombre debe tener entre 2 y 50 caracteres' };
      }

      // Rate limiting
      if (!RateLimiter.canPerformAction('signup:' + email, 'post', 3)) {
        return { success: false, error: 'Demasiados intentos de registro. Inténtalo más tarde.' };
      }

      // Sanitize inputs
      const sanitizedEmail = SecurityUtils.sanitizeInput(email.toLowerCase().trim());
      const sanitizedDisplayName = SecurityUtils.sanitizeInput(displayName.trim());

      const userCredential = await createUserWithEmailAndPassword(auth, sanitizedEmail, password);
      
      // Update user profile with display name
      await updateProfile(userCredential.user, {
        displayName: sanitizedDisplayName
      });

      // Create user profile in Firestore
      await createUserProfile(userCredential.user, {
        name: sanitizedDisplayName,
        role: 'user' // Default role for new users
      });

      toast.success('¡Cuenta creada exitosamente! Bienvenido a aprendeSwift');
      return { success: true };
      
    } catch (error) {
      const authError = error as AuthError;
      let errorMessage = 'Error al crear la cuenta';

      switch (authError.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Ya existe una cuenta con este email';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Email inválido';
          break;
        case 'auth/weak-password':
          errorMessage = 'La contraseña es muy débil';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Registro no permitido. Contacta al administrador';
          break;
        default:
          errorMessage = 'Error al crear la cuenta. Inténtalo de nuevo';
      }

      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Sign out
  const signOut = async (): Promise<{ success: boolean; error?: string }> => {
    try {
      await firebaseSignOut(auth);
      toast.success('Sesión cerrada correctamente');
      return { success: true };
    } catch {
      const errorMessage = 'Error al cerrar sesión';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Reset password
  const resetPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Input validation
      if (!SecurityUtils.isValidEmail(email)) {
        return { success: false, error: 'Formato de email inválido' };
      }

      // Rate limiting
      if (!RateLimiter.canPerformAction('reset:' + email, 'post', 3)) {
        return { success: false, error: 'Demasiados intentos de recuperación. Inténtalo más tarde.' };
      }

      const sanitizedEmail = SecurityUtils.sanitizeInput(email.toLowerCase().trim());

      await sendPasswordResetEmail(auth, sanitizedEmail);
      toast.success('Email de recuperación enviado. Revisa tu bandeja de entrada');
      return { success: true };
      
    } catch (error) {
      const authError = error as AuthError;
      let errorMessage = 'Error al enviar el email de recuperación';

      switch (authError.code) {
        case 'auth/user-not-found':
          errorMessage = 'No existe una cuenta con este email';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Email inválido';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Demasiados intentos. Inténtalo más tarde';
          break;
        default:
          errorMessage = 'Error al enviar el email. Inténtalo de nuevo';
      }

      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Update user profile
  const updateUserProfile = async (data: {
    displayName?: string;
    photoURL?: string;
  }): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!authState.user) {
        return { success: false, error: 'Usuario no autenticado' };
      }

      if (data.displayName && !SecurityUtils.isValidLength(data.displayName, 2, 50)) {
        return { success: false, error: 'El nombre debe tener entre 2 y 50 caracteres' };
      }

      const sanitizedData: Record<string, string> = {};
      if (data.displayName) {
        sanitizedData.displayName = SecurityUtils.sanitizeInput(data.displayName.trim());
      }
      if (data.photoURL) {
        sanitizedData.photoURL = data.photoURL;
      }

      await updateProfile(authState.user, sanitizedData);
      toast.success('Perfil actualizado correctamente');
      return { success: true };
      
    } catch {
      const errorMessage = 'Error al actualizar el perfil';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  return {
    // State
    user: authState.user,
    isLoading: authState.isLoading,
    isAuthenticated: authState.isAuthenticated,
    
    // Actions
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateUserProfile,
    
    // Utilities
    isAdmin: authState.user ? authState.user.isAdmin || authState.user.role === 'admin' : false,
    canCreateContent: authState.user ? ['admin', 'editor', 'author'].includes(authState.user.role || '') : false,
  };
}