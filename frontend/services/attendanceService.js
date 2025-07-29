import axios from 'axios';
import API_BASE_URL from '../constants/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export const getStatus = () => apiClient.get('/attendance/status');
export const punchIn = () => apiClient.post('/attendance/punch-in');
export const punchOut = (reason) => apiClient.post('/attendance/punch-out', { reason });