import axios from "axios";

const API = axios.create({
  baseURL: "https://task-management-system-nrf1.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;