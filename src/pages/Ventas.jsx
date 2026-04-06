// Ventas.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Select,
  MenuItem,  
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalClientes from "../components/ListaClientesModal";
import ModalArticulos from "../components/ListaArticulosModal";
import {buscarCliente } from "../services/clientesService";
import { buscarArticulos} from "../services/articulosService";
import { crearVenta } from "../services/ventasServices";
import facturaPDF from "../reportes/ventas/facturaPDF";

const Ventas = () => {
  // Estado de cliente seleccionado
  const [cliente, setCliente] = useState({
    id: "",
    nombre: "",
    direccion: "",
    nit: "",
  });

  // Estado de articulo seleccionado
  const [articulo, setArticulo] = useState({
    id: "",
    articulo: "",
    descripcion: "",
    existencia: 0,
    tipodesc: "E-0.00",    
    precioventa: 0,
    preciocosto:0,
  });  

  // Estado de artículos de la venta
  const [articulosVenta, setArticulosVenta] = useState([]);

  //estado para abrir el modal de lista de clientes
  const [openModalClientes, setOpenModalClientes] = useState(false);  
    //estado para abrir el modal de lista de articulos
  const [openModalArticulos, setOpenModalArticulos] = useState(false);  
  //estado para lista clientes
  const [clientes, setClientes] = useState([]);  
  //estado para lista articulos
  const [listaArticulos, setListaArticulos] = useState([]);       
  //estado para busqueda de clientes
  const [busquedaClientes, setBusquedaClientes] = useState("");
  //estado para busqueda de articulos
  const [busquedaArticulos, setBusquedaArticulos] = useState("");
  //estado para subtotal.
  const [subTotal, setSubTotal] = useState("");
  //estado para descuento total.
  const [descuentoTotal, setDescuentoTotal] = useState("");  
  //estado para descuento total.
  const [totalVenta, setTotalVenta] = useState(""); 

  //funcion para obtener clientes y mostrarlos en la lista
  const obtenerClientes = async (param) =>{  
    try {
      const clientes = await buscarCliente(param);
      setClientes(clientes);
      setBusquedaClientes("");
    } catch (error) {
      console.error("Error buscando clientes", error);
    }
  }

  //funcion para obtener clientes y mostrarlos en la lista
  const obtenerArticulos = async (param) =>{
    try {
      const articulos = await buscarArticulos(param);
      setListaArticulos(articulos);
      setBusquedaArticulos("");
    } catch (error) {
      console.error("Error buscando articulos", error);
    }
  }

  //funcion para seleccionar al cliente
  const handleSeleccionarCliente = (cliente) => {       
    setCliente(cliente);
    setOpenModalClientes(false);
  };

  //funcion para seleccionar articulo
  const handleSeleccionarArticulo = (articulo) => {       
    setArticulo(articulo);
    actualizarListaVenta(articulo);
    setOpenModalArticulos(false);
  };  

  //funcion para actualizar la venta
  const actualizarListaVenta = (articulo) => {

    setArticulosVenta(prev => {

      const existe = prev.find(a => a.id === articulo.id);

      if (existe) {
        // Si existe, aumentar cantidad
        return prev.map(a =>
          a.id === articulo.id
            ? {
                ...a,
                cantidad: a.cantidad + 1,
                total: Number(((a.cantidad + 1) * Number(a.precioventa) - Number(a.descuento)).toFixed(2))
              }
            : a
        );
      } else {
        // Si no existe, agregar nuevo
        const nuevoArticulo = {
          idarticulo: articulo.id,
          articulo: articulo.articulo,
          descripcion: articulo.descripcion,
          cantidad: 1,
          tipodesc: "E-0.00",
          precioventa: articulo.precioventa,
          preciocosto: articulo.preciocosto,
          descuento: 0,
          total: Number(Number(articulo.precioventa).toFixed(2))
        };

        return [...prev, nuevoArticulo];
      }

    });

  };

  //funcion para quitar elementos de la lista de ventas
  const handleEliminar = (id) => {
    console.log("id a eliminar: ", id);
      setArticulosVenta(prev => 
      prev.filter(articulo => articulo.id !== id)
    );
  }

  useEffect(() => {
    calcular(articulosVenta);
  }, [articulosVenta]);  

  //funcion para calcular los totales de la venta
  const calcular = (listaVenta) =>{

    let totalfila=0;
    let subtotalfila=0;
    let subtotal=0;
    let totaldesc=0;
    let total=0;

    listaVenta.forEach((articulo) => {

      totalfila=0;
      subtotalfila=0;

      const tipo = articulo.tipodesc.split("-")[0];
      const valor = Number(articulo.tipodesc.split("-")[1]);

      //calcular descuento
      if(tipo === "E"){
        articulo.descuento = valor;
      }else{
        articulo.descuento = ((articulo.cantidad * articulo.precioventa) * valor) / 100;
      }

      subtotalfila = (articulo.cantidad * articulo.precioventa);
      totalfila = (articulo.cantidad * articulo.precioventa) - articulo.descuento;

      //actualiza el total en la fila de la lista
      articulo.total=totalfila.toFixed(2);

      //acumula los valores para los totales generales
      subtotal = subtotal + subtotalfila;
      totaldesc = totaldesc + articulo.descuento;
      total = total + totalfila;
    });

    setSubTotal(Number(subtotal.toFixed(2)));
    setDescuentoTotal(Number(totaldesc.toFixed(2)));
    setTotalVenta(Number(total.toFixed(2)));

  }

  const limpiarCampos = () =>{
    setCliente([]);
    setArticulosVenta([]);
  }

  //funcion para cobrar la venta
  const cobrarVenta = async () =>{

    if(!cliente.id){
      alert("Debe seleccionar un cliente para poder continuar.");
      return
    }

    if(articulosVenta.length === 0){
      alert("Debe seleccionar al menos un articulo para poder continuar.");
      return
    }  
    
    //crear venta
    const venta = {
      idcliente: cliente.id,
      subtotal: subTotal,
      descuento: descuentoTotal,
      total: totalVenta,
      detalle: articulosVenta      
    };

    try {
      const resp = await crearVenta(venta);
      facturaPDF(resp.venta);
      limpiarCampos();
    } catch (error) {
      console.error(error);
    }   
  }  

  //actualizar el valor de la casilla cantidad en la lista de ventas
  const handleActualizar = (id, valor) => {
    setArticulosVenta(prev =>
      prev.map(item => {
        if (item.id === id) {
          const nuevoItem = {
            ...item,
            cantidad: valor
          };

          // recalcular total
          nuevoItem.total =
            Number(((nuevoItem.cantidad || 0) * nuevoItem.precioventa - nuevoItem.descuento).toFixed(2));

          return nuevoItem;
        }

        return item;
      })
    );
  };

  //actualizar casilla de tipodesc en la lista de ventas
  const handleCambioTipoDesc = (id, tipo, valor) => {
    setArticulosVenta(prev =>
      prev.map(art => {
        if (art.id !== id) return art;

        const nuevoTipo = tipo ?? art.tipodesc.split("-")[0];
        const nuevoValor = valor ?? art.tipodesc.split("-")[1];

        const acticuloActualizado = {
          ...art,
          tipodesc: `${nuevoTipo}-${nuevoValor}`
        };

        return acticuloActualizado;
      })
    );
  };  

  return (
    <Box p={3}>
      {/* Botones Cobrar y Cancelar */}
      <Box mb={3} display="flex" gap={2}>
        <Button 
          variant="contained" 
          color="success"
          onClick={()=>cobrarVenta()}
          >
          Cobrar Venta
        </Button>
        <Button 
          variant="contained" 
          color="error"
          onClick={()=>limpiarCampos()}
          >
          Cancelar Venta
        </Button>
      </Box>

      {/* Buscar cliente */}
      <Box mb={3}>
        <TextField
          sx={{
            backgroundColor: "#f5f5f5",
            borderRadius: 2
          }}
          label="Buscar Clientes..."
          variant="outlined"
          fullWidth
          value={busquedaClientes}
          onChange={(e) => setBusquedaClientes(e.target.value)}          
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if(busquedaClientes){
                obtenerClientes(busquedaClientes);
                setOpenModalClientes(true);                
              }              
            }
          }}
        />
      </Box>

      {/* Información del cliente */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={3}>
          <TextField
            label="ID"
            variant="outlined"
            fullWidth
            value={cliente.id || ""}
            disabled
            sx={{
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: cliente.id ? "black" : ""
              }
            }}            
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField            
            label="Nombre"
            variant="outlined"
            fullWidth
            value={cliente.nombre || ""}
            disabled
            sx={{
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: cliente.nombre?.length ? "black" : ""
              }
            }}            
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Dirección"
            variant="outlined"
            fullWidth
            value={cliente.direccion || ""}
            disabled
            sx={{
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: cliente.direccion?.length ? "black" : ""
              }
            }}            
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="NIT"
            variant="outlined"
            fullWidth
            value={cliente.nit || ""}
            disabled
            sx={{
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: cliente.nit?.length ? "black" : ""
              }
            }}            
          />
        </Grid>
      </Grid>

      {/* Buscar articulos para la venta */}
      <Box mb={3}>
        <TextField
          sx={{
            backgroundColor: "#f5f5f5",
            borderRadius: 2
          }}        
          label="Buscar Articulos..."
          variant="outlined"
          fullWidth
          value={busquedaArticulos}
          onChange={(e) => setBusquedaArticulos(e.target.value)}            
          // Aquí se puede agregar onChange para buscar articulos
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if(busquedaArticulos){
                obtenerArticulos(busquedaArticulos);
                setOpenModalArticulos(true);
              }
            }
          }}          
        />
      </Box>      

      {/* Tabla de artículos */}
      <TableContainer component={Paper} mb={3}>
        <Table>
          <TableHead sx={{ backgroundColor: "#000000" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>ID</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Artículo</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Descripción</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Cantidad</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Precio Venta</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>TipoDesc</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Descuento</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Total</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {articulosVenta?.map((art) => (
              <TableRow key={art.id}>
                <TableCell>{art.id}</TableCell>
                <TableCell>{art.articulo}</TableCell>
                <TableCell>{art.descripcion}</TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    type="number"
                    inputProps={{ min: 1 }}
                    value={art.cantidad ?? 1}
                    onChange={(e) => {
                      const valor = e.target.value;
                      handleActualizar(
                        art.id,
                        valor === "" ? "" : Number(valor)
                      );
                    }}
                  />
                </TableCell>
                <TableCell>{art.precioventa}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    
                    <Select
                      size="small"
                      sx={{ width: 70 }}
                      value={art.tipodesc?.split("-")[0] || "E"}
                      onChange={(e) =>
                        handleCambioTipoDesc(
                          art.id,
                          e.target.value,
                          art.tipodesc?.split("-")[1]
                        )
                      }
                    >
                      <MenuItem value="P">P</MenuItem>
                      <MenuItem value="E">E</MenuItem>
                    </Select>

                    <TextField
                      size="small"
                      type="number"
                      sx={{ width: 80 }}
                      value={art.tipodesc?.split("-")[1] || 0}
                      onChange={(e) =>
                        handleCambioTipoDesc(
                          art.id,
                          art.tipodesc?.split("-")[0],
                          e.target.value
                        )
                      }
                    />

                  </Box>
                </TableCell>
                <TableCell>{art.descuento}</TableCell>
                <TableCell>{art.total}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton 
                      color="error"
                      onClick={() => handleEliminar(art.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>      

      {/* Totales */}
      <Box display="flex" justifyContent="flex-end" gap={5} mt={2}>
        <Typography variant="h6">Subtotal: Q { subTotal }</Typography>
        <Typography variant="h6">Descuento: Q { descuentoTotal }</Typography>
        <Typography variant="h5">Total: Q { totalVenta }</Typography>
      </Box>

      <ModalClientes
        open={openModalClientes}
        handleClose={() => setOpenModalClientes(false)}
        clientes={clientes}
        onSeleccionar={handleSeleccionarCliente}
      />      

      <ModalArticulos
        open={openModalArticulos}
        handleClose={() => setOpenModalArticulos(false)}
        articulos={listaArticulos}
        onSeleccionar={handleSeleccionarArticulo}
      />            
    </Box>
  );
};

export default Ventas;