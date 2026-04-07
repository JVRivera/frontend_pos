import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/usuarios`;

export const getUsuarios = async () => {
  const token = sessionStorage.getItem("token");

  const response = await axios.get(API_URL,{
    headers: {
      Authorization: `Bearer ${token}`
    }    
  });
  return response.data;
};

export const createUsuario = async (data) => {
  const token = sessionStorage.getItem("token");

  const response = await axios.post(API_URL, data,{
    headers: {
      Authorization: `Bearer ${token}`
    }    
  });
  return response.data;
};

export const deleteUsuario = async (id) => {
  const token = sessionStorage.getItem("token");

  const response = await axios.delete(`${API_URL}/${id}`,{
    headers: {
      Authorization: `Bearer ${token}`
    }    
  });
  return response.data;
};

export const updateUsuario = async (id, data) => {
  const token = sessionStorage.getItem("token");
  
  const response = await axios.put(`${API_URL}/${id}`, data,{
    headers: {
      Authorization: `Bearer ${token}`
    }    
  });
  return response.data;
};
