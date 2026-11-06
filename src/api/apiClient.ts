import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://campers-api.goit.study',
});

export default apiClient;
