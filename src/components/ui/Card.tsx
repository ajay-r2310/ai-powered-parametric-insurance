import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', gradient = false }) => {
  return (
    <div
      className={`rounded-2xl border border-slate-800 p-5 shadow-xl backdrop-blur-md transition-all ${
        gradient
          ? 'bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950'
          : 'bg-slate-900/80'
      } ${className}`}
    >
      {children}
    </div>
  );
};
