import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export default {
  getItems: (houseCode) =>
    axios.get(`${API_URL}?houseCode=${houseCode.toLowerCase()}`).then((res) => res.data),
  addItem: (houseCode, item) =>
    axios.post(`${API_URL}`, { houseCode: houseCode.toLowerCase(), ...item }).then((res) => res.data),
  updateItem: (houseCode, id, item) =>
    axios.put(`${API_URL}/${houseCode.toLowerCase()}/${id}`, item).then((res) => res.data),
  deleteItem: (houseCode, id) =>
    axios.delete(`${API_URL}/${houseCode.toLowerCase()}/${id}`),
  verifyHouse: (houseCode) =>
    axios.get(`${API_URL}/house/${houseCode.toLowerCase()}`).then((res) => res.data.exists),
  registerHouse: (houseCode) =>
    axios.post(`${API_URL}/house`, { houseCode: houseCode.toLowerCase() }).then((res) => res.data),
};