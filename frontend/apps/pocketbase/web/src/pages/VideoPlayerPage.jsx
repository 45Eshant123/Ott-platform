import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VideoPlayer from '@/components/VideoPlayer.jsx';
import { useAuth } from '@/contexts/AuthContext.jsx';
import apiServerClient from '@/lib/apiServerClient';

const VideoPlayerPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [content, setContent] = useState(null);
    const [watchHistory, setWatchHistory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id || id === 'undefined') {
            setLoading(false);
            return;
        }
        fetchContent();
    }, [id]);

    const fetchContent = async () => {
        if (!id || id === 'undefined') {
            setLoading(false);
            return;
        }

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

    const fetchWatchHistory = async () => {
        // TODO: Implement history fetch when backend history API is available
    };

    const handleProgress = async (currentTime, duration) => {
        // TODO: Implement progress tracking when backend history API is available
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <p className="text-white">Loading...</p>
            </div>
        );
    }

    if (!content) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <p className="text-white">Content not found</p>
            </div>
        );
    }

    const videoUrl = content?.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
    const audioTracks = content?.audioTracks || [{ id: 'original', label: 'Original' }];
    const subtitleTracks = content?.subtitleTracks || [];
    const initialPosition = watchHistory?.position || 0;

    return (
        <>
            <Helmet>
                <title>{`Watch ${content.title} - StreamVault`}</title>
                <meta name="description" content={`Watch ${content.title} on StreamVault`} />
            </Helmet>

            <div className="min-h-screen bg-black">
                <div className="absolute top-4 left-4 z-50">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate(-1)}
                        className="text-white hover:bg-white/10"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </Button>
                </div>

                <div className="flex items-center justify-center min-h-screen">
                    <div className="w-full max-w-7xl">
                        <VideoPlayer
                            videoUrl={videoUrl}
                            audioTracks={audioTracks}
                            subtitleTracks={subtitleTracks}
                            onProgress={handleProgress}
                            initialPosition={initialPosition}
                            onEnded={() => navigate(`/content/${id}`)}
                        />

                        <div className="p-6 bg-background">
                            <h1 className="font-display font-bold text-2xl md:text-3xl mb-2 text-foreground">
                                {content.title}
                            </h1>
                            <p className="text-muted-foreground">
                                {content.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VideoPlayerPage;