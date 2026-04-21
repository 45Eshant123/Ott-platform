import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const TopRow = ({ items, title }) => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 400;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-semibold text-2xl text-foreground">{title}</h3>
                <div className="flex gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => scroll('left')}
                        className="rounded-full"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => scroll('right')}
                        className="rounded-full"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {items.map((item, index) => {
                    const thumbnailUrl = item.thumbnail || 'https://images.unsplash.com/photo-1574267432644-f610f5b45b2f?w=400';
                    const contentId = item.id || item._id;

                    return (
                        <motion.div
                            key={contentId || index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="flex-shrink-0 w-64"
                        >
                            <Link to={`/content/${contentId}`}>
                                <div className="group relative overflow-hidden rounded-xl bg-card transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1">
                                    <div className="relative aspect-[16/9] overflow-hidden">
                                        <img
                                            src={thumbnailUrl}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        <div className="absolute top-3 left-3 bg-primary text-primary-foreground font-bold text-2xl w-12 h-12 rounded-lg flex items-center justify-center shadow-lg">
                                            #{item.rank}
                                        </div>
                                    </div>

                                    <div className="p-4">
                                        <h4 className="font-semibold text-base mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                                            {item.title}
                                        </h4>

                                        <div className="flex items-center gap-3">
                                            {item.rating && (
                                                <div className="flex items-center gap-1 text-sm">
                                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                                    <span className="text-foreground/80">{item.rating.toFixed(1)}</span>
                                                </div>
                                            )}
                                            {item.views && (
                                                <span className="text-sm text-muted-foreground">
                                                    {item.views.toLocaleString()} views
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default TopRow;