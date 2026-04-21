import Content from "../models/Content.js";
import {
    fetchPopularMovies,
    fetchPopularSeries
} from "../services/tmdbService.js";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export const importMovies = async (req, res) => {
    try {
        const movies = await fetchPopularMovies();

        const formatted = movies.map((m) => ({
            tmdbId: m.id,
            title: m.title,
            type: "movie",
            thumbnail: `${IMAGE_BASE}${m.poster_path}`,
            rating: m.vote_average,
            releaseYear: m.release_date?.split("-")[0],
            description: m.overview,
            source: "tmdb"
        }));

        for (const item of formatted) {
            await Content.updateOne(
                { tmdbId: item.tmdbId },
                { $set: item },
                { upsert: true }
            );
        }

        res.json({ message: "Movies imported successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const importSeries = async (req, res) => {
    try {
        const series = await fetchPopularSeries();

        const formatted = series.map((s) => ({
            tmdbId: s.id,
            title: s.name,
            type: "series",
            thumbnail: `${IMAGE_BASE}${s.poster_path}`,
            rating: s.vote_average,
            releaseYear: s.first_air_date?.split("-")[0],
            description: s.overview,
            source: "tmdb"
        }));

        for (const item of formatted) {
            await Content.updateOne(
                { tmdbId: item.tmdbId },
                { $set: item },
                { upsert: true }
            );
        }

        res.json({ message: "Series imported successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};