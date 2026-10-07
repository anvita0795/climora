import React from 'react';
import { ArrowRight } from 'lucide-react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  icon = true,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm tracking-wide bg-gradient-to-r from-[#22D3C5] to-[#67E8F9] text-[#071923] shadow-lg shadow-[#22D3C5]/25 hover:shadow-xl hover:shadow-[#22D3C5]/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer ${className}`}
      {...props}
    >
      <span>{children}</span>
      {icon && <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />}
    </button>
  );
};
