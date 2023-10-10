import axios from 'axios';

const envVars = import.meta.env;

const api = axios.create({
  baseURL: envVars.DEV ? envVars.VITE_DEV_API_URL : envVars.VITE_PROD_API_URL,
  headers: {
    'Content-Type': 'application/json',
  }  
});

api.interceptors.request.use((config: any) => {
  config.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('userToken') ?? '')}`;

  if (config.data) {
    const data = { ...config.data };
    Object.entries(data).forEach((d) => {
      return (data[d[0]] = typeof d[1] === 'string' ? d[1].trim() : d[1]);
    });
    config.data = data;
  }
  return config;
});

export { api };
