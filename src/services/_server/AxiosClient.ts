import axios from 'axios';

const AxiosClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
  timeout: 10000,
  timeoutErrorMessage: 'Timed-out', // TODO: Update this
  // validateStatus: (status: number): boolean => status < 500,
  withCredentials: true
});

AxiosClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('access-token');

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

AxiosClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error) // TODO: add handler
);

export default AxiosClient;
