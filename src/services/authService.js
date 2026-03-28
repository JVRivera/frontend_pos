// src/services/authService.js
import axios from "axios";

const API_URL = "http://localhost:3000/api/auth"; // tu endpoint de login

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data; // token + usuario
};