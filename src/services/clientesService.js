import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/clientes`;

export const getClientes = async () => {
  const token = sessionStorage.getItem("token");

  const response = await axios.get(API_URL,{
    headers: {
      Authorization: `Bearer ${token}`
    }    
  });
  return response.data;
};

export const createCliente = async (data) => {
  const token = sessionStorage.getItem("token");

  const response = await axios.post(API_URL, data,{
    headers: {
      Authorization: `Bearer ${token}`
    }    
  });
  return response.data;
};

export const deleteCliente = async (id) => {
  const token = sessionStorage.getItem("token");

  const response = await axios.delete(`${API_URL}/${id}`,{
    headers: {
      Authorization: `Bearer ${token}`
    }    
  });
  return response.data;
};

export const updateCliente = async (id, data) => {
  const token = sessionStorage.getItem("token");
  
  const response = await axios.put(`${API_URL}/${id}`, data,{
    headers: {
      Authorization: `Bearer ${token}`
    }    
  });
  return response.data;
};


export const buscarCliente = async (search) => {
  const token = sessionStorage.getItem("token");

  const response = await axios.get(`${API_URL}/buscar`, {
    params: { search },
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};
