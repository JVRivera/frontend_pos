import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/ventas`;

export const crearVenta = async (venta) => {
  try {
    const response = await axios.post(API_URL, venta);
    return response.data;
  } catch (error) {
    console.error("Error al crear venta:", error);
    throw error;
  }
};


export const getVentasPorFecha = async (fechaini, fechafin) => {
  try {
    const response = await axios.get(
      API_URL + "/por-fecha?fechaini=" + fechaini + "&fechafin=" + fechafin
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener lista de ventas.", error);
    throw error;
  }
};


export const getVentaPorId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener la venta.", error);
    throw error;
  }
};

export const deleteVenta = async (id) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(`${API_URL}/${id}`,{
    headers: {
      Authorization: `Bearer ${token}`
    }    
  });
  return response.data;
};