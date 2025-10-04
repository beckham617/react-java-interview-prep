import { useState, useEffect, useCallback } from 'react';
import { Client } from '@/types/client';

interface UseClientSearchOptions {
  debounceMs?: number;
  minSearchLength?: number;
}

interface SearchResult {
  clients: Client[];
  loading: boolean;
  error: string | null;
  totalCount: number;
}

export function useClientSearch(options: UseClientSearchOptions = {}) {
  const { debounceMs = 300, minSearchLength = 2 } = options;
  
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult>({
    clients: [],
    loading: false,
    error: null,
    totalCount: 0
  });

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (term: string) => {
      if (term.length < minSearchLength) {
        // Clear results when search term is too short or empty
        setResults({
          clients: [],
          loading: false,
          error: null,
          totalCount: 0
        });
        return;
      }

      setResults(prev => ({ ...prev, loading: true, error: null }));

      try {
        const response = await fetch(`/api/clients/search?q=${encodeURIComponent(term)}`);
        
        if (!response.ok) {
          throw new Error('Search failed');
        }

        const data = await response.json();
        setResults({
          clients: data.clients || [],
          loading: false,
          error: null,
          totalCount: data.totalCount || 0
        });
      } catch (error) {
        setResults({
          clients: [],
          loading: false,
          error: error instanceof Error ? error.message : 'Search failed',
          totalCount: 0
        });
      }
    }, debounceMs),
    [debounceMs, minSearchLength]
  );

  // Trigger search when search term changes
  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  return {
    searchTerm,
    setSearchTerm,
    results,
    clearSearch: () => setSearchTerm('')
  };
}

// Debounce utility function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
