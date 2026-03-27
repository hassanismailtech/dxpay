'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/shared/ui/input';

interface TestSearchBarProps {
  onSearch: (query: string) => void;
  className?: string;
}

export function TestSearchBar({ onSearch, className }: TestSearchBarProps) {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        type="text"
        placeholder="Search tests..."
        value={query}
        onChange={handleChange}
        className="pl-10"
      />
    </div>
  );
}
