import React from 'react';

interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  icon,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full font-medium text-sm tracking-wide bg-white/10 hover:bg-white/15 text-white border border-white/18 backdrop-blur-md hover:border-white/30 transition-all duration-200 cursor-pointer ${className}`}
      {...props}
    >
      {icon && <span className="text-[#22D3C5]">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
