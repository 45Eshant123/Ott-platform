import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { History as HistoryIcon, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ContentCard from '@/components/ContentCard.jsx';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { toast } from 'sonner';
import pb from '@/lib/pocketbaseClient';

const HistoryPage = () => {
    const { currentUser } = useAuth();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const records = await pb.collection('watchHistory').getList(1, 50, {
                filter: `userId = "${currentUser.id}"`,
                expand: 'contentId',
                sort: '-updated',
                $autoCancel: false
            });

            const contentItems = records.items
                .filter(item => item.expand?.contentId)
                .map(item => ({
                    ...item.expand.contentId,
                    watchedAt: item.updated,
                    position: item.position,
                    duration: item.duration
                }));

            setHistory(contentItems);
        } catch (error) {
            console.error('Failed to fetch history:', error);
        } finally {
            setLoading(false);
        }
    };

    const clearHistory = async () => {
        if (!window.confirm('Clear all watch history?')) return;

        try {
            const records = await pb.collection('watchHistory').getList(1, 200, {
                filter: `userId = "${currentUser.id}"`,
                $autoCancel: false
            });

            for (const record of records.items) {
                await pb.collection('watchHistory').delete(record.id, { $autoCancel: false });
            }

            setHistory([]);
            toast('Watch history cleared');
        } catch (error) {
            toast.error('Failed to clear history');
        }
    };

    return (
        <>
            <Helmet>
                <title>Watch History - StreamVault</title>
                <meta name="description" content="Your watch history on StreamVault" />
            </Helmet>

            <div className="min-h-screen bg-background">
                <Header />

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground" style={{ letterSpacing: '-0.02em' }}>
                            Watch history
                        </h1>
                        {history.length > 0 && (
                            <Button variant="destructive" onClick={clearHistory}>
                                <Trash2 className="w-4 h-4 mr-2" />
                                Clear History
                            </Button>
                        )}
                    </div>

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
                    ) : history.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {history.map((item, index) => (
                                <div key={item.id}>
                                    <ContentCard content={item} index={index} />
                                    <div className="mt-2 text-xs text-muted-foreground">
                                        Watched {new Date(item.watchedAt).toLocaleDateString()}
                                    </div>
                                    {item.position && item.duration && (
                                        <div className="mt-1 bg-muted rounded-full h-1 overflow-hidden">
                                            <div
                                                className="bg-primary h-full"
                                                style={{ width: `${(item.position / item.duration) * 100}%` }}
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <HistoryIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground text-lg">No watch history yet</p>
                            <p className="text-sm text-muted-foreground mt-2">Start watching to build your history</p>
                        </div>
                    )}
                </main>

                <Footer />
            </div>
        </>
    );
};

export default HistoryPage;