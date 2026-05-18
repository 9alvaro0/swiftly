// src/components/ui/StatsCard.tsx

import React from 'react';
import Link from 'next/link';
import { AdminCard, AdminCardBody } from './AdminCard';
import { ArrowRight } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  detail?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'accent' | 'warning' | 'success' | 'danger';
  link?: string;
  linkText?: string;
  className?: string;
}

export default function StatsCard({
  title,
  value,
  detail,
  icon,
  variant = 'default',
  link,
  linkText,
  className
}: StatsCardProps) {
  const variantColors = {
    default: 'text-blue-400',
    accent: 'text-blue-400',
    warning: 'text-amber-400',
    success: 'text-emerald-400',
    danger: 'text-red-400'
  };

  const variantBgColors = {
    default: 'bg-blue-900/30',
    accent: 'bg-blue-900/30',
    warning: 'bg-amber-900/30',
    success: 'bg-emerald-900/30',
    danger: 'bg-red-900/30'
  };

  return (
    <AdminCard 
      hover={!!link} 
      variant={variant} 
      className={className}
      onClick={link ? () => window.location.href = link : undefined}
    >
      <AdminCardBody className="flex items-start gap-4">
        {icon && (
          <div className={`p-3 rounded-full ${variantBgColors[variant]}`}>
            {icon}
          </div>
        )}
        <div className="flex-1">
          <h3 className={`text-lg font-semibold ${variantColors[variant]} mb-1`}>
            {title}
          </h3>
          <p className="text-2xl md:text-3xl font-bold text-white mb-1">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {detail && (
            <p className="text-xs text-gray-400 mb-3">
              {detail}
            </p>
          )}
          {link && linkText && (
            <Link
              href={link}
              className={`${variantColors[variant]} text-sm hover:underline inline-flex items-center gap-1 transition-colors`}
            >
              {linkText}
              <ArrowRight className="h-3 w-3" />
            </Link>
          )}
        </div>
      </AdminCardBody>
    </AdminCard>
  );
}