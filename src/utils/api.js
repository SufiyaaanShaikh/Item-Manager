import axios from 'axios';

const API_BASE_URL = 'https://item-manager-backend.vercel.app/api';

export const createItem = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/items`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // This is correct
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getAllItems = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/items`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getItemById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/items/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};