import axios from "axios";

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchPopularMovies = async () => {
    const res = await axios.get(`${BASE_URL}/movie/popular`, {
        params: { api_key: API_KEY }
    });
    return res.data.results;
};

export const fetchPopularSeries = async () => {
    const res = await axios.get(`${BASE_URL}/tv/popular`, {
        params: { api_key: API_KEY }
    });
    return res.data.results;
};