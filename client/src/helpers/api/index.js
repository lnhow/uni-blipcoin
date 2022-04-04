import axios from 'axios';

const baseURL = process.env.REACT_APP_API
  ? process.env.REACT_APP_API
  : //dev
    'http://localhost:3001';

export const apiURL = baseURL + `/api`;

const api = axios.create({
  baseURL: apiURL,
  // withCredentials: true, // Required for http-only cookie
});

export default api;
