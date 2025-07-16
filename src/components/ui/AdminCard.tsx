// src/components/ui/AdminCard.tsx

import React from 'react';
import { cn } from '@/utils/cn';

interface AdminCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'accent' | 'warning' | 'success' | 'danger';
  onClick?: () => void;
}

interface AdminCardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface AdminCardBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface AdminCardFooterProps {
  children: React.ReactNode;
  className?: string;
}

const AdminCard = React.forwardRef<HTMLDivElement, AdminCardProps>(
  ({ children, className, hover = false, padding = 'md', variant = 'default', onClick }, ref) => {
    const baseClasses = 'bg-gray-800/50 border border-gray-700 rounded-xl transition-all duration-200';
    
    const variantClasses = {
      default: 'border-gray-700',
      accent: 'border-l-4 border-l-blue-500',
      warning: 'border-l-4 border-l-amber-500',
      success: 'border-l-4 border-l-emerald-500',
      danger: 'border-l-4 border-l-red-500'
    };

    const paddingClasses = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8'
    };

    const hoverClasses = hover 
      ? 'hover:bg-gray-800/70 hover:border-gray-600 hover:shadow-lg hover:shadow-gray-900/20' 
      : '';

    const clickableClasses = onClick 
      ? 'cursor-pointer hover:scale-[1.02]' 
      : '';

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          paddingClasses[padding],
          hoverClasses,
          clickableClasses,
          className
        )}
        onClick={onClick}
      >
        {children}
      </div>
    );
  }
);

AdminCard.displayName = 'AdminCard';

const AdminCardHeader = React.forwardRef<HTMLDivElement, AdminCardHeaderProps>(
  ({ children, className }, ref) => (
    <div ref={ref} className={cn('mb-4', className)}>
      {children}
    </div>
  )
);

AdminCardHeader.displayName = 'AdminCardHeader';

const AdminCardBody = React.forwardRef<HTMLDivElement, AdminCardBodyProps>(
  ({ children, className }, ref) => (
    <div ref={ref} className={cn('', className)}>
      {children}
    </div>
  )
);

AdminCardBody.displayName = 'AdminCardBody';

const AdminCardFooter = React.forwardRef<HTMLDivElement, AdminCardFooterProps>(
  ({ children, className }, ref) => (
    <div ref={ref} className={cn('mt-4 pt-4 border-t border-gray-700', className)}>
      {children}
    </div>
  )
);

AdminCardFooter.displayName = 'AdminCardFooter';

export { AdminCard, AdminCardHeader, AdminCardBody, AdminCardFooter };