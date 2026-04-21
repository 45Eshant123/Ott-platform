import React, { useState, useEffect } from 'react';
import { Trophy } from 'lucide-react';
import TopRow from '@/components/TopRow.jsx';
import { Skeleton } from '@/components/ui/skeleton';
import apiServerClient from '@/lib/apiServerClient';

const TopTenSection = () => {
    const [topMovies, setTopMovies] = useState([]);
    const [topAnime, setTopAnime] = useState([]);
    const [topSeries, setTopSeries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTopTenData();

        const interval = setInterval(() => {
            fetchTopTenData();
        }, 24 * 60 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    const fetchTopTenData = async () => {
        setLoading(true);
        setError(null);

        try {
            const [moviesResponse, animeResponse, seriesResponse] = await Promise.all([
                apiServerClient.fetch('/api/content/top10?type=movie'),
                apiServerClient.fetch('/api/content/top10?type=anime'),
                apiServerClient.fetch('/api/content/top10?type=series')
            ]);

            if (!moviesResponse.ok || !animeResponse.ok || !seriesResponse.ok) {
                throw new Error('Failed to fetch top 10 data');
            }

            const moviesData = await moviesResponse.json();
            const animeData = await animeResponse.json();
            const seriesData = await seriesResponse.json();

            setTopMovies(moviesData.items || []);
            setTopAnime(animeData.items || []);
            setTopSeries(seriesData.items || []);
        } catch (err) {
            console.error('Failed to fetch top 10 data:', err);
            setError(err?.message || 'Failed to fetch top 10 data');
        } finally {
            setLoading(false);
        }
    };

    if (error) {
        return (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="flex items-center gap-3 mb-8">
                    <Trophy className="w-8 h-8 text-primary" />
                    <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground">
                        Top 10 this day
                    </h2>
                </div>
                <div className="bg-card rounded-xl p-8 text-center">
                    <p className="text-muted-foreground">Unable to load top 10 content. Please try again later.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="flex items-center gap-3 mb-8">
                <Trophy className="w-8 h-8 text-primary" />
                <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground">
                    Top 10 this day
                </h2>
            </div>

            {loading ? (
                <div className="space-y-12">
                    {[...Array(3)].map((_, sectionIndex) => (
                        <div key={sectionIndex}>
                            <Skeleton className="h-8 w-48 mb-6" />
                            <div className="flex gap-4 overflow-hidden">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="flex-shrink-0 w-64 space-y-3">
                                        <Skeleton className="aspect-[16/9] rounded-xl" />
                                        <Skeleton className="h-4 w-3/4" />
                                        <Skeleton className="h-3 w-1/2" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="space-y-8">
                    {topMovies.length > 0 && (
                        <TopRow items={topMovies} title="Top 10 Movies" />
                    )}
                    {topAnime.length > 0 && (
                        <TopRow items={topAnime} title="Top 10 Anime" />
                    )}
                    {topSeries.length > 0 && (
                        <TopRow items={topSeries} title="Top 10 Web Series" />
                    )}
                </div>
            )}
        </section>
    );
};

export default TopTenSection;