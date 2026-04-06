import { useState } from "react";
import ModalVentas from "../components/ListaVentasModal";

import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  TextField
} from "@mui/material";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TableChartIcon from "@mui/icons-material/TableChart";
import ArticulosReport from "../reportes/articulos/listaDeArticulos";
import ClientesReport from "../reportes/clientes/listaDeClientes";
import VentasReport from "../reportes/ventas/listaDeVentas";
import { getArticulos} from "../services/articulosService";
import { getClientes} from "../services/clientesService";
import { getVentasPorFecha,getVentaPorId, deleteVenta } from "../services/ventasServices";
import facturaPDF from "../reportes/ventas/facturaPDF";

export default function Reportes() {
  // Obtener fecha actual
  const hoy = new Date().toISOString().split("T")[0];

  // Estado de fechaini
  const [fechaini, setFechaIni] = useState(hoy);
  // Estado de fechafin
  const [fechafin, setFechaFin] = useState(hoy); 
  // Estado para abrir y cerrar el modal
  const [open, setOpen] = useState(false); 
  // Estado para informe de ventas
  const [ventas, setVentas] = useState([]);

  //funcion para obtener la lista de ventas
  const verVentas =async () =>{
    try {
      const data = await getVentasPorFecha(fechaini, fechafin);

      console.log("DATA:", data);

      setVentas(data.ventas);
      setOpen(true);
    } catch (error) {
      console.error("Error al cargar ventas", error);
    }    
  }

  //funcion para generar el reporte de articulos
  const verArticulos = async () =>{
    try {
      const articulos = await getArticulos();
      ArticulosReport(articulos);
    } catch (error) {
      console.error("Error al cargar artículos", error);
    }        
  }

  //funcion para generar el reporte de clientes
  const verClientes =  async ()=>{
      try {
        const clientes = await getClientes();
        ClientesReport(clientes);
      } catch (error) {
        console.error("Error al cargar clientes", error);
      }    
  }

  //funcion para generar el reporte de ventas
  const verPDFVentas =  async ()=>{
      try {
        const data = await getVentasPorFecha(fechaini, fechafin);
        VentasReport(data.ventas);
      } catch (error) {
        console.error("Error al cargar ventas", error);
      }   
  }  

  //funcion para imprimir venta desde la lista de ventas
  const imprimirVenta = async (venta) => {
    console.log("Imprimir", venta);
      try {
        const data = await getVentaPorId(venta.id);
        facturaPDF(data);
      } catch (error) {
        console.error("Error al cargar ventas", error);
      }     
  };  

  //funcion para eliminar venta desde la lista de ventas
  const eliminarVenta = async (venta) => {
    const confirmar = window.confirm("¿Está seguro que desea eliminar la venta?");

    if (!confirmar) return;    

    try {
      await deleteVenta(venta.id);
      // eliminar del estado
      setVentas(prev => prev.filter(v => v.id !== venta.id));
    } catch (error) {
      
    }
  };  

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        Panel de Reportes
      </Typography>

      <Grid container spacing={2} direction="column">

        {/* Reporte Articulos */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                Reporte de Artículos
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Genera una lista completa de artículos en PDF
              </Typography>
            </CardContent>

            <CardActions>
              <Button
                variant="contained"
                startIcon={<PictureAsPdfIcon />}
                onClick={()=>{verArticulos()}}
              >
                Generar PDF
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Reporte Clientes */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                Reporte de Clientes
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Genera una lista completa de clientes
              </Typography>
            </CardContent>

            <CardActions>
              <Button
                variant="contained"
                startIcon={<PictureAsPdfIcon />}
                onClick={()=>{verClientes()}}
              >
                Generar PDF
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Reporte Ventas */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                Reporte de Ventas
              </Typography>

              <Grid container spacing={2} mt={1}>
                <Grid item xs={12}>
                  <TextField
                    type="date"
                    label="Fecha Inicio"
                    fullWidth
                    value={fechaini}
                    onChange={(e) => setFechaIni(e.target.value)}                    
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    type="date"
                    label="Fecha Fin"
                    fullWidth
                    value={fechafin}
                    onChange={(e) => setFechaFin(e.target.value)}                    
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </CardContent>

            <CardActions>
              <Button
                variant="contained"
                startIcon={<PictureAsPdfIcon />}
                onClick={()=>verPDFVentas()}
              >
                PDF
              </Button>

              <Button
                variant="outlined"
                startIcon={<TableChartIcon />}
                onClick={()=>verVentas()}
              >
                Tabla
              </Button>
            </CardActions>
          </Card>
        </Grid>

      </Grid>

      <ModalVentas
        open={open}
        handleClose={() => setOpen(false)}
        ventas={ventas}
        imprimirVenta={imprimirVenta}
        eliminarVenta={eliminarVenta}
      />
    </Box>
  );
}