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

export default function Reportes() {
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
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    type="date"
                    label="Fecha Fin"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </CardContent>

            <CardActions>
              <Button
                variant="contained"
                startIcon={<PictureAsPdfIcon />}
              >
                PDF
              </Button>

              <Button
                variant="outlined"
                startIcon={<TableChartIcon />}
              >
                Tabla
              </Button>
            </CardActions>
          </Card>
        </Grid>

      </Grid>
    </Box>
  );
}