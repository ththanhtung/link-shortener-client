import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_URL,
  headers: {
    'Content-Type': "application/json",
    'x-api-key': import.meta.env.VITE_API_KEY
  }
});

const axiosPrivateClient = axios.create({
  baseURL: import.meta.env.VITE_URL,
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': import.meta.env.VITE_API_KEY,
  },
});

export { axiosClient, axiosPrivateClient };
