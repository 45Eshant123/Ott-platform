import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Play, TrendingUp, Film, Tv, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ContentCard from '@/components/ContentCard.jsx';
import TopTenSection from '@/components/TopTenSection.jsx';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/contexts/AuthContext.jsx';
import apiServerClient from '@/lib/apiServerClient';

const HomePage = () => {
    const { isAuthenticated } = useAuth();
    const [featuredContent, setFeaturedContent] = useState([]);
    const [trendingContent, setTrendingContent] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        setLoading(true);
        try {
            const [featuredResponse, trendingResponse] = await Promise.all([
                apiServerClient.fetch('/api/content/featured?limit=5'),
                apiServerClient.fetch('/api/content/trending?limit=12')
            ]);

            if (!featuredResponse.ok || !trendingResponse.ok) {
                throw new Error('Failed to fetch content');
            }

            const featuredData = await featuredResponse.json();
            const trendingData = await trendingResponse.json();

            setFeaturedContent(featuredData.items || []);
            setTrendingContent(trendingData.items || []);
        } catch (error) {
            console.error('Failed to fetch content:', error);
        } finally {
            setLoading(false);
        }
    };

    const heroContent = featuredContent[0];
    const heroImage = heroContent?.thumbnail || 'https://images.unsplash.com/photo-1601944179066-29786cb9d32a?w=1920';

    return (
        <>
            <Helmet>
                <title>StreamVault - Premium Streaming Platform</title>
                <meta name="description" content="Stream unlimited movies, series, and anime in high quality" />
            </Helmet>

            <div className="min-h-screen bg-background">
                <Header />

                <section className="relative min-h-[90vh] flex items-center overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src={heroImage}
                            alt="Hero background"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-2xl"
                        >
                            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl mb-6 text-foreground" style={{ letterSpacing: '-0.02em' }}>
                                Unlimited entertainment awaits
                            </h1>
                            <p className="text-xl md:text-2xl text-foreground/80 mb-8 leading-relaxed">
                                Stream thousands of movies, series, and anime. Watch anywhere, anytime.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                {isAuthenticated ? (
                                    <Link to="/categories">
                                        <Button size="lg" className="gap-2">
                                            <Play className="w-5 h-5 fill-current" />
                                            Start Watching
                                        </Button>
                                    </Link>
                                ) : (
                                    <>
                                        <Link to="/signup">
                                            <Button size="lg" className="gap-2">
                                                <Play className="w-5 h-5 fill-current" />
                                                Get Started
                                            </Button>
                                        </Link>
                                        <Link to="/login">
                                            <Button size="lg" variant="secondary">
                                                Sign In
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </section>

                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground">
                            Trending now
                        </h2>
                        <TrendingUp className="w-8 h-8 text-primary" />
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                            {[...Array(12)].map((_, i) => (
                                <div key={i} className="space-y-3">
                                    <Skeleton className="aspect-[2/3] rounded-xl" />
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-3 w-1/2" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                            {trendingContent.map((item, index) => (
                                <ContentCard key={item.id} content={item} index={index} />
                            ))}
                        </div>
                    )}
                </section>

                <TopTenSection />

                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <h2 className="font-display font-bold text-3xl md:text-4xl mb-8 text-foreground">
                        Browse by category
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* 🎬 Movies */}
                        <Link to="/categories?type=movie">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer"
                            >
                                <img
                                    src="https://images.pexels.com/photos/7991373/pexels-photo-7991373.jpeg?auto=compress&w=800"
                                    alt="Movies"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                                <div className="absolute bottom-6 left-6 z-10">
                                    <Film className="w-8 h-8 text-primary mb-2" />
                                    <h3 className="font-display font-bold text-2xl text-white">Movies</h3>
                                    <p className="text-white/80 text-sm">Explore our collection</p>
                                </div>
                            </motion.div>
                        </Link>

                        {/* 📺 Web Series */}
                        <Link to="/categories?type=series">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer"
                            >
                                <img
                                    src="https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800"
                                    alt="Web Series"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                                <div className="absolute bottom-6 left-6 z-10">
                                    <Tv className="w-8 h-8 text-primary mb-2" />
                                    <h3 className="font-display font-bold text-2xl text-white">Web Series</h3>
                                    <p className="text-white/80 text-sm">Binge-worthy shows</p>
                                </div>
                            </motion.div>
                        </Link>

                        {/* 🎌 Anime */}
                        <Link to="/categories?type=anime">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer"
                            >
                                <img
                                    src="https://images.pexels.com/photos/7234276/pexels-photo-7234276.jpeg?auto=compress&cs=tinysrgb&w=800"
                                    alt="Anime"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                                <div className="absolute bottom-6 left-6 z-10">
                                    <Sparkles className="w-8 h-8 text-primary mb-2" />
                                    <h3 className="font-display font-bold text-2xl text-white">Anime</h3>
                                    <p className="text-white/80 text-sm">Japanese animation</p>
                                </div>
                            </motion.div>
                        </Link>

                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
};

export default HomePage;