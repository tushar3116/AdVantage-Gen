import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Generate an ad from a prompt
export async function generateAd(prompt) {
  const response = await axios.post(`${API_BASE_URL}/ads/generate`, { prompt });
  return response.data;
}
