import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const getRequestConfig = () => {
    const apiKey = process.env.TMDB_API_KEY;

    if (!apiKey) {
        throw new Error("TMDB_API_KEY is not configured");
    }

    return { params: { api_key: apiKey } };
};

export const fetchPopularMovies = async () => {
    const res = await axios.get(`${BASE_URL}/movie/popular`, getRequestConfig());
    return res.data.results;
};

export const fetchPopularSeries = async () => {
    const res = await axios.get(`${BASE_URL}/tv/popular`, getRequestConfig());
    return res.data.results;
};

export const fetchTrailerUrl = async (type, tmdbId) => {
    const mediaPath = type === "series" ? "tv" : "movie";
    const res = await axios.get(`${BASE_URL}/${mediaPath}/${tmdbId}/videos`, getRequestConfig());
    const videos = Array.isArray(res.data?.results) ? res.data.results : [];

    const preferred =
        videos.find((v) => v.site === "YouTube" && v.type === "Trailer" && v.official) ||
        videos.find((v) => v.site === "YouTube" && v.type === "Trailer") ||
        videos.find((v) => v.site === "YouTube");

    if (!preferred?.key) {
        return "";
    }

    return `https://www.youtube.com/watch?v=${preferred.key}`;
};