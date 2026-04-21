import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const ContentCard = ({ content, index = 0 }) => {
    const thumbnailUrl = content.thumbnail || 'https://images.unsplash.com/photo-1574267432644-f610f5b45b2f?w=400';
    const contentId = content.id || content._id;

    const genreBadges = Array.isArray(content.genre)
        ? content.genre.slice(0, 2)
        : [];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
        >
            <Link to={`/content/${contentId}`}>
                <div className="group relative overflow-hidden rounded-xl bg-card transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1">
                    <div className="aspect-[2/3] overflow-hidden">
                        <img
                            src={thumbnailUrl}
                            alt={content.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-primary rounded-full p-4">
                                <Play className="w-8 h-8 text-primary-foreground fill-current" />
                            </div>
                        </div>
                    </div>

                    <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                            {content.title}
                        </h3>

                        <div className="flex items-center gap-2 mb-2">
                            {content.rating && (
                                <div className="flex items-center gap-1 text-sm">
                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                    <span className="text-foreground/80">{content.rating.toFixed(1)}</span>
                                </div>
                            )}
                            {content.releaseYear && (
                                <span className="text-sm text-muted-foreground">{content.releaseYear}</span>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {genreBadges.map((genre) => (
                                <span
                                    key={genre}
                                    className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground"
                                >
                                    {genre}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default ContentCard;