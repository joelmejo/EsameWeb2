import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const fetchPersone = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/query?azione=persona`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

export const fetchProgetti = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/query?azione=progetto`);
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

export const fetchWps = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/query?azione=wp`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Wps:', error);
    return [];
  }
};