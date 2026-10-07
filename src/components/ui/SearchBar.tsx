import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Search location, dataset, or coordinate...',
  className = '',
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className={`relative flex items-center ${className}`}>
      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#CBD5E1]/60 flex items-center gap-1">
        <Search className="w-4 h-4" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-64 lg:w-80 pl-10 pr-9 py-2 rounded-full bg-black/20 text-white placeholder:text-[#CBD5E1]/50 text-xs font-normal border border-white/12 focus:border-[#22D3C5]/70 focus:bg-black/35 focus:ring-2 focus:ring-[#22D3C5]/20 focus:outline-none transition-all duration-200"
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#22D3C5]/60 hover:text-[#22D3C5] cursor-pointer">
        <MapPin className="w-3.5 h-3.5" />
      </div>
    </form>
  );
};
