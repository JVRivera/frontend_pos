import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/articulos`;

export const getArticulos = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(API_URL,{
    headers: {
      Authorization: `Bearer ${token}`
    }    
  });
  return response.data;
};

export const createArticulo = async (data) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(API_URL, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }      
  });
  return response.data;
};

export const deleteArticulo = async (id) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }      
  });
  return response.data;
};

export const updateArticulo = async (id, data) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(`${API_URL}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }      
  });
  return response.data;
};