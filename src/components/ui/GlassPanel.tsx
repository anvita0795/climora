import React from 'react';

interface GlassPanelProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary';
  className?: string;
  onClick?: () => void;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  variant = 'secondary',
  className = '',
  onClick,
}) => {
  const variantClass =
    variant === 'primary'
      ? 'glass-primary'
      : variant === 'secondary'
      ? 'glass-secondary'
      : 'glass-tertiary';

  return (
    <div
      onClick={onClick}
      className={`${variantClass} transition-all duration-300 ${onClick ? 'cursor-pointer hover:border-white/25' : ''} ${className}`}
    >
      {children}
    </div>
  );
};
