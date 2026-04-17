import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const VideoPlayer = ({
    videoUrl,
    audioTracks = [],
    subtitleTracks = [],
    onProgress,
    initialPosition = 0,
    onEnded,
    nextEpisode
}) => {
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(100);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showControls, setShowControls] = useState(true);
    const [quality, setQuality] = useState('720p');
    const [playbackSpeed, setPlaybackSpeed] = useState('1');
    const [selectedAudio, setSelectedAudio] = useState('original');
    const [showSubtitles, setShowSubtitles] = useState(false);
    const controlsTimeoutRef = useRef(null);

    useEffect(() => {
        if (videoRef.current && initialPosition > 0) {
            videoRef.current.currentTime = initialPosition;
        }
    }, [initialPosition]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleTimeUpdate = () => {
            setCurrentTime(video.currentTime);
            if (onProgress) {
                onProgress(video.currentTime, video.duration);
            }
        };

        const handleLoadedMetadata = () => {
            setDuration(video.duration);
        };

        const handleEnded = () => {
            setIsPlaying(false);
            if (onEnded) onEnded();
        };

        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        video.addEventListener('ended', handleEnded);

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            video.removeEventListener('ended', handleEnded);
        };
    }, [onProgress, onEnded]);

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                togglePlay();
            } else if (e.code === 'KeyF') {
                toggleFullscreen();
            } else if (e.code === 'KeyM') {
                toggleMute();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [isPlaying, isMuted]);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleVolumeChange = (value) => {
        const newVolume = value[0];
        setVolume(newVolume);
        if (videoRef.current) {
            videoRef.current.volume = newVolume / 100;
            if (newVolume === 0) {
                setIsMuted(true);
            } else if (isMuted) {
                setIsMuted(false);
            }
        }
    };

    const handleSeek = (value) => {
        const newTime = value[0];
        setCurrentTime(newTime);
        if (videoRef.current) {
            videoRef.current.currentTime = newTime;
        }
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    const handlePlaybackSpeedChange = (speed) => {
        setPlaybackSpeed(speed);
        if (videoRef.current) {
            videoRef.current.playbackRate = parseFloat(speed);
        }
    };

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);
        if (h > 0) {
            return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        }
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const handleMouseMove = () => {
        setShowControls(true);
        if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current);
        }
        controlsTimeoutRef.current = setTimeout(() => {
            if (isPlaying) {
                setShowControls(false);
            }
        }, 3000);
    };

    return (
        <div
            ref={containerRef}
            className="relative bg-black aspect-video w-full group"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => isPlaying && setShowControls(false)}
        >
            <video
                ref={videoRef}
                src={videoUrl}
                className="w-full h-full"
                onClick={togglePlay}
            />

            <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4">
                    <Slider
                        value={[currentTime]}
                        max={duration || 100}
                        step={0.1}
                        onValueChange={handleSeek}
                        className="cursor-pointer"
                    />

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={togglePlay}
                                className="text-white hover:text-primary hover:bg-white/10"
                            >
                                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                            </Button>

                            {nextEpisode && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={nextEpisode}
                                    className="text-white hover:text-primary hover:bg-white/10"
                                >
                                    <SkipForward className="w-6 h-6" />
                                </Button>
                            )}

                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={toggleMute}
                                    className="text-white hover:text-primary hover:bg-white/10"
                                >
                                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                                </Button>
                                <Slider
                                    value={[volume]}
                                    max={100}
                                    step={1}
                                    onValueChange={handleVolumeChange}
                                    className="w-24"
                                />
                            </div>

                            <span className="text-white text-sm">
                                {formatTime(currentTime)} / {formatTime(duration)}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Select value={playbackSpeed} onValueChange={handlePlaybackSpeedChange}>
                                <SelectTrigger className="w-20 bg-white/10 text-white border-white/20">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0.5">0.5x</SelectItem>
                                    <SelectItem value="1">1x</SelectItem>
                                    <SelectItem value="1.5">1.5x</SelectItem>
                                    <SelectItem value="2">2x</SelectItem>
                                </SelectContent>
                            </Select>

                            {audioTracks.length > 0 && (
                                <Select value={selectedAudio} onValueChange={setSelectedAudio}>
                                    <SelectTrigger className="w-32 bg-white/10 text-white border-white/20">
                                        <SelectValue placeholder="Audio" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {audioTracks.map((track) => (
                                            <SelectItem key={track.id} value={track.id}>
                                                {track.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}

                            {subtitleTracks.length > 0 && (
                                <Select value={showSubtitles ? 'on' : 'off'} onValueChange={(v) => setShowSubtitles(v === 'on')}>
                                    <SelectTrigger className="w-32 bg-white/10 text-white border-white/20">
                                        <SelectValue placeholder="Subtitles" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="off">Off</SelectItem>
                                        {subtitleTracks.map((track) => (
                                            <SelectItem key={track.id} value={track.id}>
                                                {track.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}

                            <Select value={quality} onValueChange={setQuality}>
                                <SelectTrigger className="w-24 bg-white/10 text-white border-white/20">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="360p">360p</SelectItem>
                                    <SelectItem value="720p">720p</SelectItem>
                                    <SelectItem value="1080p">1080p</SelectItem>
                                </SelectContent>
                            </Select>

                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleFullscreen}
                                className="text-white hover:text-primary hover:bg-white/10"
                            >
                                <Maximize className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;