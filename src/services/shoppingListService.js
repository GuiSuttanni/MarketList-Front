import axios from 'axios';

const API_URL = 'https://marketlist-back.onrender.com/api/shopping-list';

export default {
  getItems: (houseCode) =>
    axios.get(`${API_URL}?houseCode=${houseCode}`).then((res) => res.data),
  addItem: (houseCode, item) =>
    axios.post(`${API_URL}`, { houseCode, ...item }).then((res) => res.data),  
  updateItem: (houseCode, id, item) =>
    axios.put(`${API_URL}/${houseCode}/${id}`, item).then((res) => res.data),
  deleteItem: (houseCode, id) =>
    axios.delete(`${API_URL}/${houseCode}/${id}`),
  verifyHouse: (houseCode) =>
    axios.get(`${API_URL}/house/${houseCode}`).then((res) => res.data.exists),
  registerHouse: (houseCode) =>
    axios.post(`${API_URL}/house`, { houseCode }).then((res) => res.data),
};
