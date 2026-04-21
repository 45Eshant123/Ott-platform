import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ContentCard from '@/components/ContentCard.jsx';
import FilterSidebar from '@/components/FilterSidebar.jsx';
import { Skeleton } from '@/components/ui/skeleton';
import apiServerClient from '@/lib/apiServerClient';

const CategoriesPage = () => {
    const [activeTab, setActiveTab] = useState('movie');
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        genre: '',
        language: '',
        year: '',
        rating: 0
    });

    useEffect(() => {
        fetchContent();
    }, [activeTab, filters]);

    const fetchContent = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                type: activeTab,
                ...(filters.genre && { genre: filters.genre }),
                ...(filters.language && { language: filters.language }),
                ...(filters.year && { year: filters.year }),
                ...(filters.rating > 0 && { rating: filters.rating }),
                limit: '50'
            });

            const response = await apiServerClient.fetch(`/api/content?${params}`);
            if (!response.ok) {
                throw new Error('Failed to fetch content');
            }

            const data = await response.json();
            setContent(data.items || []);
        } catch (error) {
            console.error('Failed to fetch content:', error);
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
                <title>Categories - StreamVault</title>
                <meta name="description" content="Browse movies, series, and anime by category" />
            </Helmet>

            <div className="min-h-screen bg-background">
                <Header />

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h1 className="font-display font-bold text-4xl md:text-5xl mb-8 text-foreground" style={{ letterSpacing: '-0.02em' }}>
                        Browse by category
                    </h1>

                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="mb-8">
                            <TabsTrigger value="movie">Movies</TabsTrigger>
                            <TabsTrigger value="series">Series</TabsTrigger>
                            <TabsTrigger value="anime">Anime</TabsTrigger>
                        </TabsList>

                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                            <aside className="lg:col-span-1">
                                <FilterSidebar
                                    filters={filters}
                                    onFilterChange={handleFilterChange}
                                    onClearFilters={handleClearFilters}
                                />
                            </aside>

                            <div className="lg:col-span-3">
                                <TabsContent value={activeTab} className="mt-0">
                                    {loading ? (
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                            {[...Array(8)].map((_, i) => (
                                                <div key={i} className="space-y-3">
                                                    <Skeleton className="aspect-[2/3] rounded-xl" />
                                                    <Skeleton className="h-4 w-3/4" />
                                                    <Skeleton className="h-3 w-1/2" />
                                                </div>
                                            ))}
                                        </div>
                                    ) : content.length > 0 ? (
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                            {content.map((item, index) => (
                                                <ContentCard key={item.id} content={item} index={index} />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-20">
                                            <p className="text-muted-foreground text-lg">No content found matching your filters</p>
                                        </div>
                                    )}
                                </TabsContent>
                            </div>
                        </div>
                    </Tabs>
                </main>

                <Footer />
            </div>
        </>
    );
};

export default CategoriesPage;