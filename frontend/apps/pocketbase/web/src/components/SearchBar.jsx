import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const SearchBar = ({ onSearch, placeholder = "Search movies, series, anime..." }) => {
    const [query, setQuery] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            if (onSearch) {
                onSearch(query);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query, onSearch]);

    return (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="pl-10 bg-secondary text-secondary-foreground border-border"
            />
        </div>
    );
};

export default SearchBar;