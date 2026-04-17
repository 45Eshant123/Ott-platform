import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const FilterSidebar = ({ filters, onFilterChange, onClearFilters }) => {
    const genres = ['action', 'drama', 'comedy', 'horror', 'sci-fi', 'romance', 'thriller', 'animation', 'documentary', 'family'];
    const languages = ['English', 'Hindi', 'Spanish', 'Japanese', 'Korean', 'French'];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

    return (
        <div className="bg-card rounded-xl p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="font-display font-semibold text-lg text-card-foreground">Filters</h3>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClearFilters}
                    className="text-muted-foreground hover:text-foreground"
                >
                    <X className="w-4 h-4 mr-1" />
                    Clear
                </Button>
            </div>

            <div className="space-y-4">
                <div>
                    <Label className="text-card-foreground mb-2 block">Genre</Label>
                    <Select
                        value={filters.genre || ''}
                        onValueChange={(value) => onFilterChange('genre', value || '')}
                    >
                        <SelectTrigger className="bg-background text-foreground border-border">
                            <SelectValue placeholder="All genres" />
                        </SelectTrigger>
                        <SelectContent>
                            {genres.map((genre) => (
                                <SelectItem key={genre} value={genre}>
                                    {genre.charAt(0).toUpperCase() + genre.slice(1)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label className="text-card-foreground mb-2 block">Language</Label>
                    <Select
                        value={filters.language || ''}
                        onValueChange={(value) => onFilterChange('language', value || '')}
                    >
                        <SelectTrigger className="bg-background text-foreground border-border">
                            <SelectValue placeholder="All languages" />
                        </SelectTrigger>
                        <SelectContent>
                            {languages.map((lang) => (
                                <SelectItem key={lang} value={lang}>
                                    {lang}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label className="text-card-foreground mb-2 block">Release Year</Label>
                    <Select
                        value={filters.year || ''}
                        onValueChange={(value) => onFilterChange('year', value || '')}
                    >
                        <SelectTrigger className="bg-background text-foreground border-border">
                            <SelectValue placeholder="All years" />
                        </SelectTrigger>
                        <SelectContent>
                            {years.map((year) => (
                                <SelectItem key={year} value={year.toString()}>
                                    {year}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label className="text-card-foreground mb-2 block">
                        Minimum Rating: {filters.rating || 0}
                    </Label>
                    <Slider
                        value={[filters.rating || 0]}
                        max={10}
                        step={0.5}
                        onValueChange={(value) => onFilterChange('rating', value[0])}
                        className="mt-2"
                    />
                </div>
            </div>
        </div>
    );
};

export default FilterSidebar;