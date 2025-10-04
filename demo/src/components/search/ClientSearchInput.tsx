'use client';

import React, { useState } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { useClientSearch } from '@/hooks/useClientSearch';

interface ClientSearchInputProps {
  onResultsChange: (clients: any[], loading: boolean, error: string | null, searchTerm: string) => void;
  placeholder?: string;
  className?: string;
}

export default function ClientSearchInput({ 
  onResultsChange, 
  placeholder = "Search clients...",
  className = ""
}: ClientSearchInputProps) {
  const { searchTerm, setSearchTerm, results, clearSearch } = useClientSearch({
    debounceMs: 300,
    minSearchLength: 2
  });

  // Notify parent component of results changes
  React.useEffect(() => {
    onResultsChange(results.clients, results.loading, results.error, searchTerm);
  }, [results, searchTerm, onResultsChange]);

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
        />
        {results.loading && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 animate-spin" />
        )}
        {searchTerm && !results.loading && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      
      {/* Search Results Info */}
      {searchTerm && (
        <div className="mt-2 text-sm text-gray-600">
          {results.loading ? (
            <span>Searching...</span>
          ) : results.error ? (
            <span className="text-red-600">Error: {results.error}</span>
          ) : (
            <span>
              Found {results.totalCount} client{results.totalCount !== 1 ? 's' : ''}
              {searchTerm && ` for "${searchTerm}"`}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
