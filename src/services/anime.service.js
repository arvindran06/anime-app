import axios from "axios";
import rateLimit from "axios-rate-limit";


const api = axios.create();


const apiWithRateLimit = rateLimit(api, {
    maxRequests: 1,
    perMilliseconds: 1000,
});


export const getAnime = async (page, apiConfig) => {
    const { baseURL, limit } = apiConfig;
    const itemsPerPage = limit || 24;

    try {
        const response = await apiWithRateLimit.get(
            `${baseURL}&limit=${itemsPerPage}&page=${page}`
        );
        const data = response.data;


        if (!data || !data.data || !data.pagination || !data.pagination.items) {
            throw new Error("Invalid API response format");
        }

        const totalItems = data.pagination.items.total;
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        return {
            data: data.data || [],
            totalPages: totalPages || 0,
        };
    } catch (error) {
        console.error("Error fetching anime data:", error);
        throw error;
    } finally {
        console.log("Get Anime request completed");
    }
};


export const getCarouselAnime = async () => {
    try {
        const response = await apiWithRateLimit.get(
            `https://api.jikan.moe/v4/seasons/upcoming?limit=6`
        );
        return response.data.data;
    } catch (error) {
        console.error("Error fetching carousel anime:", error);
        throw error;
    }
};


export const getDetailAnime = async (mal_id) => {
    try {
        const response = await apiWithRateLimit.get(
            `https://api.jikan.moe/v4/anime/${mal_id}/full`
        );
        return response.data.data;
    } catch (error) {
        console.error("Error fetching anime details:", error);
        throw error;
    }
};


export const getEpisodeAnime = async (mal_id, callback) => {
    try {
        const response = await apiWithRateLimit.get(
            `https://api.jikan.moe/v4/anime/${mal_id}/episodes`
        );
        callback(response.data.data);
    } catch (error) {
        console.error(error);
    }
};

export const getAnimeGenresList = async () => {
    try {
        const response = await apiWithRateLimit.get(
            `https://api.jikan.moe/v4/genres/anime`
        );
        return response.data.data;
    } catch (error) {
        console.error("Error fetching genres:", error);
        throw error;
    }
};

export const getAnimeGenre = async (page, apiConfig, mal_id) => {
    const { baseURL, limit } = apiConfig;
    const itemsPerPage = limit || 24;
    try {
        const response = await apiWithRateLimit.get(
            `${baseURL}${mal_id}?limit=${itemsPerPage}&page=${page}`
        );
        const data = response.data;
        if (!data || !data.data || !data.pagination) {
            throw new Error("Invalid API response format");
        }
        const totalItems = data.pagination.items.total;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        return {
            data: data.data || [],
            totalPages: totalPages || 0,
        };
    } catch (error) {
        console.log("Error fetching anime by genre:", error);
        throw error;
    }
};


export const getPopularAnime = async (page, apiConfig) => {
    const { baseURL, limit } = apiConfig;
    const itemsPerPage = limit || 24;

    try {
        const response = await apiWithRateLimit.get(
            `${baseURL}&limit=${itemsPerPage}&page=${page}`
        );
        const data = response.data;

        if (!data || !data.data || !data.pagination || !data.pagination.items) {
            throw new Error("Invalid API response format");
        }

        const totalItems = data.pagination.items.total;
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        return {
            data: data.data || [],
            totalPages: totalPages || 0,
        };
    } catch (error) {
        console.error("Error fetching popular anime data:", error);
        throw error;
    } finally {
        console.log("Get Popular Anime request completed");
    }
};
