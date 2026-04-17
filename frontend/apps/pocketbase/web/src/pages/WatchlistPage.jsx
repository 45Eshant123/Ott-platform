import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Trash2, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ContentCard from '@/components/ContentCard.jsx';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { toast } from 'sonner';
import pb from '@/lib/pocketbaseClient';

const WatchlistPage = () => {
    const { currentUser } = useAuth();
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWatchlist();
    }, []);

    const fetchWatchlist = async () => {
        setLoading(true);
        try {
            const records = await pb.collection('watchlist').getList(1, 50, {
                filter: `userId = "${currentUser.id}"`,
                expand: 'contentId',
                sort: '-created',
                $autoCancel: false
            });

            const contentItems = records.items
                .filter(item => item.expand?.contentId)
                .map(item => item.expand.contentId);

            setWatchlist(contentItems);
        } catch (error) {
            console.error('Failed to fetch watchlist:', error);
        } finally {
            setLoading(false);
        }
    };

    const removeFromWatchlist = async (contentId) => {
        try {
            const records = await pb.collection('watchlist').getList(1, 1, {
                filter: `userId = "${currentUser.id}" && contentId = "${contentId}"`,
                $autoCancel: false
            });

            if (records.items.length > 0) {
                await pb.collection('watchlist').delete(records.items[0].id, { $autoCancel: false });
                setWatchlist(prev => prev.filter(item => item.id !== contentId));
                toast('Removed from watchlist');
            }
        } catch (error) {
            toast.error('Failed to remove from watchlist');
        }
    };

    return (
        <>
            <Helmet>
                <title>Watchlist - StreamVault</title>
                <meta name="description" content="Your saved content on StreamVault" />
            </Helmet>

            <div className="min-h-screen bg-background">
                <Header />

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h1 className="font-display font-bold text-4xl md:text-5xl mb-8 text-foreground" style={{ letterSpacing: '-0.02em' }}>
                        My watchlist
                    </h1>

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
                    ) : watchlist.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {watchlist.map((item, index) => (
                                <div key={item.id} className="relative group">
                                    <ContentCard content={item} index={index} />
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => removeFromWatchlist(item.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <Bookmark className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground text-lg">Your watchlist is empty</p>
                            <p className="text-sm text-muted-foreground mt-2">Add content to watch later</p>
                        </div>
                    )}
                </main>

                <Footer />
            </div>
        </>
    );
};

export default WatchlistPage;