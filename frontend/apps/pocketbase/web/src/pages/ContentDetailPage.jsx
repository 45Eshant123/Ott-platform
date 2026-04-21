import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Play, Plus, Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ContentCard from '@/components/ContentCard.jsx';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext.jsx';
import apiServerClient from '@/lib/apiServerClient';

const getYouTubeEmbedUrl = (url) => {
    if (!url) return '';

    try {
        const parsed = new URL(url);
        if (parsed.hostname.includes('youtube.com')) {
            const videoId = parsed.searchParams.get('v');
            return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
        }
        if (parsed.hostname.includes('youtu.be')) {
            const videoId = parsed.pathname.replace('/', '');
            return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
        }
        return '';
    } catch {
        return '';
    }
};

const ContentDetailPage = () => {
    const { id } = useParams();
    const { isAuthenticated } = useAuth();
    const [content, setContent] = useState(null);
    const [relatedContent, setRelatedContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [inWatchlist, setInWatchlist] = useState(false);

    useEffect(() => {
        if (!id || id === 'undefined') {
            setLoading(false);
            return;
        }
        fetchContent();
    }, [id]);

    useEffect(() => {
        if (content?.type && id && id !== 'undefined') {
            fetchRelatedContent(content.type);
        }
    }, [content?.type, id]);

    const fetchContent = async () => {
        if (!id || id === 'undefined') {
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const response = await apiServerClient.fetch(`/api/content/${id}`);
            if (!response.ok) {
                throw new Error('Content not found');
            }

            const data = await response.json();
            setContent(data.item);
        } catch (error) {
            console.error('Failed to fetch content:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRelatedContent = async (contentType) => {
        try {
            const params = new URLSearchParams({
                type: contentType || 'movie',
                limit: '8'
            });

            const response = await apiServerClient.fetch(`/api/content?${params}`);
            if (!response.ok) {
                throw new Error('Failed to fetch related content');
            }

            const data = await response.json();
            setRelatedContent(
                (data.items || []).filter((item) => item.id !== id).slice(0, 8)
            );
        } catch (error) {
            console.error('Failed to fetch related content:', error);
        }
    };

    const checkWatchlist = async () => {
        // TODO: Implement watchlist check when backend watchlist API is available
    };

    const toggleWatchlist = async () => {
        if (!isAuthenticated) {
            toast.error('Please sign in to add to watchlist');
            return;
        }
        // TODO: Implement watchlist toggle when backend watchlist API is available
        toast.error('Watchlist feature coming soon');
    };

    if (loading) {
        return (
            <>
                <Header />
                <div className="min-h-screen bg-background">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <Skeleton className="aspect-[2/3] rounded-2xl" />
                            <div className="md:col-span-2 space-y-4">
                                <Skeleton className="h-12 w-3/4" />
                                <Skeleton className="h-6 w-1/2" />
                                <Skeleton className="h-32 w-full" />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    if (!content) {
        return (
            <>
                <Header />
                <div className="min-h-screen bg-background flex items-center justify-center">
                    <p className="text-muted-foreground">Content not found</p>
                </div>
                <Footer />
            </>
        );
    }

    const thumbnailUrl = content?.thumbnail || 'https://images.unsplash.com/photo-1574267432644-f610f5b45b2f?w=800';
    const contentId = content.id || content._id;
    const youtubeEmbedUrl = getYouTubeEmbedUrl(content.trailerUrl);
    const trailerSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(`${content.title} ${content.releaseYear || ''} official trailer`)}`;

    return (
        <>
            <Helmet>
                <title>{`${content.title} - StreamVault`}</title>
                <meta name="description" content={content.description || `Watch ${content.title} on StreamVault`} />
            </Helmet>

            <div className="min-h-screen bg-background">
                <Header />

                <main>
                    <div className="relative h-[60vh] overflow-hidden">
                        <img
                            src={thumbnailUrl}
                            alt={content.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-40 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="hidden md:block">
                                <img
                                    src={thumbnailUrl}
                                    alt={content.title}
                                    className="w-full rounded-2xl shadow-2xl"
                                />
                            </div>

                            <div className="md:col-span-2 space-y-6">
                                <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground" style={{ letterSpacing: '-0.02em' }}>
                                    {content.title}
                                </h1>

                                <div className="flex flex-wrap items-center gap-4">
                                    {content.rating && (
                                        <div className="flex items-center gap-1">
                                            <Star className="w-5 h-5 text-yellow-500 fill-current" />
                                            <span className="font-semibold text-foreground">{content.rating.toFixed(1)}</span>
                                        </div>
                                    )}
                                    {content.releaseYear && (
                                        <span className="text-muted-foreground">{content.releaseYear}</span>
                                    )}
                                    <span className="px-3 py-1 rounded-md bg-secondary text-secondary-foreground text-sm font-medium">
                                        {content.type.charAt(0).toUpperCase() + content.type.slice(1)}
                                    </span>
                                    <span className="text-muted-foreground">{content.language}</span>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {Array.isArray(content.genre) && content.genre.map((genre) => (
                                        <span
                                            key={genre}
                                            className="px-3 py-1 rounded-md bg-muted text-muted-foreground text-sm"
                                        >
                                            {genre}
                                        </span>
                                    ))}
                                </div>

                                <p className="text-foreground/80 text-lg leading-relaxed">
                                    {content.description || 'No description available.'}
                                </p>

                                <div className="flex gap-4">
                                    <Link to={`/watch/${contentId}`}>
                                        <Button size="lg" className="gap-2">
                                            <Play className="w-5 h-5 fill-current" />
                                            Watch Now
                                        </Button>
                                    </Link>
                                    <Button
                                        size="lg"
                                        variant="secondary"
                                        onClick={toggleWatchlist}
                                        className="gap-2"
                                    >
                                        {inWatchlist ? (
                                            <>
                                                <Check className="w-5 h-5" />
                                                In Watchlist
                                            </>
                                        ) : (
                                            <>
                                                <Plus className="w-5 h-5" />
                                                Add to Watchlist
                                            </>
                                        )}
                                    </Button>
                                </div>

                                <div className="mt-8">
                                    <h2 className="font-display font-semibold text-2xl mb-4 text-foreground">Trailer</h2>

                                    {content.trailerUrl ? (
                                        <div className="aspect-video rounded-xl overflow-hidden bg-muted">
                                            {youtubeEmbedUrl ? (
                                                <iframe
                                                    src={youtubeEmbedUrl}
                                                    title={`${content.title} trailer`}
                                                    className="w-full h-full"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    referrerPolicy="strict-origin-when-cross-origin"
                                                    allowFullScreen
                                                />
                                            ) : (
                                                <video
                                                    src={content.trailerUrl}
                                                    controls
                                                    className="w-full h-full"
                                                />
                                            )}
                                        </div>
                                    ) : (
                                        <div className="rounded-xl bg-muted p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                            <p className="text-muted-foreground">Trailer URL is not available for this title yet.</p>
                                            <a
                                                href={trailerSearchUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
                                            >
                                                Search on YouTube
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {relatedContent.length > 0 && (
                            <div className="mt-20">
                                <h2 className="font-display font-semibold text-2xl md:text-3xl mb-8 text-foreground">
                                    More like this
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {relatedContent.map((item, index) => (
                                        <ContentCard key={item.id || item._id || index} content={item} index={index} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
};

export default ContentDetailPage;