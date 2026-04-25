import axios from 'axios';

const baseURL = import.meta.env.VITE_API_PUBLIC_URL as string | undefined;
const apiKey = import.meta.env.VITE_API_PUBLIC_KEY as string | undefined;

const apiPublic = axios.create({
  baseURL,
});

apiPublic.interceptors.request.use((config) => {
  if (!config.params) config.params = {};
  if (apiKey && !('apikey' in config.params)) {
    (config.params as Record<string, unknown>).apikey = apiKey;
  }
  return config;
});

export default apiPublic;

