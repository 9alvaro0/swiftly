// src/components/profile/NewsletterSubscription.tsx
"use client";

import { useUserNewsletter } from '@/hooks/useUserNewsletter';
import { MdEmail, MdCheckCircle, MdCancel } from 'react-icons/md';
import Spinner from '@/components/ui/Spinner';

export default function NewsletterSubscription() {
  const {
    subscriptionStatus,
    isLoading,
    isUpdating,
    toggleSubscription
  } = useUserNewsletter();

  if (isLoading) {
    return (
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <div className="flex items-center gap-4">
          <div className="bg-blue-600/20 p-3 rounded-xl">
            <MdEmail className="h-6 w-6 text-blue-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-white mb-2">Newsletter</h3>
            <div className="flex items-center gap-2">
              <Spinner />
              <span className="text-gray-300 text-sm">Cargando estado...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isSubscribed = subscriptionStatus?.isActive ?? false;

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
      <div className="flex items-center gap-4">
        <div className="bg-blue-600/20 p-3 rounded-xl">
          <MdEmail className="h-6 w-6 text-blue-400" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-white mb-2">Newsletter</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isSubscribed ? (
                <MdCheckCircle className="h-4 w-4 text-green-400" />
              ) : (
                <MdCancel className="h-4 w-4 text-red-400" />
              )}
              <span className={`text-sm ${isSubscribed ? 'text-green-400' : 'text-red-400'}`}>
                {isSubscribed ? 'Suscrito' : 'No suscrito'}
              </span>
            </div>
            <button
              onClick={toggleSubscription}
              disabled={isUpdating}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isSubscribed
                  ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30'
                  : 'bg-green-600/20 text-green-400 hover:bg-green-600/30'
              } ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isUpdating ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin h-3 w-3 border-2 border-current border-t-transparent rounded-full" />
                  {isSubscribed ? 'Desuscribiendo...' : 'Suscribiendo...'}
                </span>
              ) : (
                isSubscribed ? 'Desuscribirse' : 'Suscribirse'
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-700">
        <p className="text-gray-400 text-sm">
          {isSubscribed 
            ? 'Recibirás notificaciones sobre nuevos tutoriales y contenido de Swift/SwiftUI.'
            : 'Suscríbete para recibir notificaciones sobre nuevos tutoriales y contenido.'
          }
        </p>
      </div>
    </div>
  );
}