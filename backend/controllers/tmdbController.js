import Content from "../models/Content.js";
import {
    fetchTrailerUrl,
    fetchPopularMovies,
    fetchPopularSeries
} from "../services/tmdbService.js";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export const importMovies = async (req, res) => {
    try {
        const movies = await fetchPopularMovies();

        const formatted = await Promise.all(
            movies.map(async (m) => ({
                tmdbId: m.id,
                title: m.title,
                type: "movie",
                thumbnail: m.poster_path ? `${IMAGE_BASE}${m.poster_path}` : "",
                rating: m.vote_average,
                releaseYear: Number.parseInt(m.release_date?.split("-")[0], 10) || undefined,
                description: m.overview,
                trailerUrl: await fetchTrailerUrl("movie", m.id),
                source: "tmdb"
            }))
        );

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

        const formatted = await Promise.all(
            series.map(async (s) => ({
                tmdbId: s.id,
                title: s.name,
                type: "series",
                thumbnail: s.poster_path ? `${IMAGE_BASE}${s.poster_path}` : "",
                rating: s.vote_average,
                releaseYear: Number.parseInt(s.first_air_date?.split("-")[0], 10) || undefined,
                description: s.overview,
                trailerUrl: await fetchTrailerUrl("series", s.id),
                source: "tmdb"
            }))
        );

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