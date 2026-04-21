import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import SearchBar from '@/components/SearchBar.jsx';
import ContentCard from '@/components/ContentCard.jsx';
import FilterSidebar from '@/components/FilterSidebar.jsx';
import { Skeleton } from '@/components/ui/skeleton';
import { Search as SearchIcon } from 'lucide-react';
import apiServerClient from '@/lib/apiServerClient';

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        genre: '',
        language: '',
        year: '',
        rating: 0
    });

    useEffect(() => {
        if (query.trim()) {
            searchContent();
        } else {
            setResults([]);
        }
    }, [query, filters]);

    const searchContent = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                q: query,
                ...(filters.genre && { genre: filters.genre }),
                ...(filters.language && { language: filters.language }),
                ...(filters.year && { year: filters.year }),
                ...(filters.rating > 0 && { rating: filters.rating })
            });

            const response = await apiServerClient.fetch(`/api/content/search?${params}`);
            if (!response.ok) {
                throw new Error('Search failed');
            }

            const data = await response.json();
            setResults(data.items || []);
        } catch (error) {
            console.error('Search failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleClearFilters = () => {
        setFilters({
            genre: '',
            language: '',
            year: '',
            rating: 0
        });
    };

    return (
        <>
            <Helmet>
                <title>Search - StreamVault</title>
                <meta name="description" content="Search for movies, series, and anime" />
            </Helmet>

            <div className="min-h-screen bg-background">
                <Header />

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h1 className="font-display font-bold text-4xl md:text-5xl mb-8 text-foreground" style={{ letterSpacing: '-0.02em' }}>
                        Search content
                    </h1>

                    <div className="mb-8">
                        <SearchBar onSearch={setQuery} />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        <aside className="lg:col-span-1">
                            <FilterSidebar
                                filters={filters}
                                onFilterChange={handleFilterChange}
                                onClearFilters={handleClearFilters}
                            />
                        </aside>

                        <div className="lg:col-span-3">
                            {!query.trim() ? (
                                <div className="text-center py-20">
                                    <SearchIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                                    <p className="text-muted-foreground text-lg">Start typing to search for content</p>
                                </div>
                            ) : loading ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {[...Array(8)].map((_, i) => (
                                        <div key={i} className="space-y-3">
                                            <Skeleton className="aspect-[2/3] rounded-xl" />
                                            <Skeleton className="h-4 w-3/4" />
                                            <Skeleton className="h-3 w-1/2" />
                                        </div>
                                    ))}
                                </div>
                            ) : results.length > 0 ? (
                                <>
                                    <p className="text-muted-foreground mb-6">
                                        Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
                                    </p>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                        {results.map((item, index) => (
                                            <ContentCard key={item.id} content={item} index={index} />
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-20">
                                    <SearchIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                                    <p className="text-muted-foreground text-lg">No results found for "{query}"</p>
                                    <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or filters</p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
};

export default SearchPage;