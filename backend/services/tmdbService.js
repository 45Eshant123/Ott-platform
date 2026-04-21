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