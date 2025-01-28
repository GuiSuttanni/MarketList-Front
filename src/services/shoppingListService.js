import axios from 'axios';

const API_URL = 'http://localhost:5000/api/shopping-list';

export default {
  getItems: () => axios.get(API_URL).then((res) => res.data),
  addItem: (item) => axios.post(API_URL, item).then((res) => res.data),
  updateItem: (id, item) => axios.put(`${API_URL}/${id}`, item).then((res) => res.data),
  deleteItem: (id) => axios.delete(`${API_URL}/${id}`),
};