import axios from 'axios';

const API_BASE = 'http://localhost:8080/api';

export const fetchCocktails = () => {
  return axios.get(`${API_BASE}/cocktails`);
};
