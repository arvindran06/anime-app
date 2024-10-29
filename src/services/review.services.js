import axios from 'axios';
import { getCurrentUser } from './auth.service';

const API_URL = 'https://dd8e4809-734b-40cb-982d-1118b6227d42-00-1um0rqp5swgg4.sisko.replit.dev';


export const getReviews = async (animeId) => {
    const response = await axios.get(`${API_URL}/api/reviews/${animeId}`);
    return response.data;
};

export const addReview = async (reviewData) => {
    const user = await getCurrentUser();
    console.log("Current user:", user)
    const response = await axios.post(`${API_URL}/api/reviews`, reviewData, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await user.token}`,
        },
    });
    return response.data;
};

export const updateReview = async (reviewId, updatedReview) => {
    const user = await getCurrentUser();
    const response = await axios.put(`${API_URL}/api/reviews/${reviewId}`, updatedReview, {
        headers: {
            'Authorization': `Bearer ${user.token}`,
        },
    });
    return response.data;
};

export const deleteReview = async (reviewId) => {
    const user = await getCurrentUser();
    await axios.delete(`${API_URL}/api/reviews/${reviewId}`, {
        headers: {
            'Authorization': `Bearer ${user.token}`,
        },
    });
};
