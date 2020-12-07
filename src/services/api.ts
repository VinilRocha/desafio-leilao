import axios from 'axios';

const api = axios.create({
  baseURL: 'https://5fcbbc8c51f70e00161f1fb4.mockapi.io/leiloes/',
});

export default api;
