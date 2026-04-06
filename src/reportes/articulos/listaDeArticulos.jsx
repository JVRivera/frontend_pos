import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const listaDeArticulos = (articulos) => {
  const doc = new jsPDF();

  doc.text("Reporte de articulos", 14, 10);

  autoTable(doc, {
    head: [["Id", "Articulo", "Descripcion", "Existencia", "Precio Venta"]],
    body: articulos.map(c => [
      c.id,
      c.articulo,
      c.descripcion,
      c.existencia,
      c.precioventa
    ])
  });

  const url = doc.output("bloburl");
  window.open(url, "_blank");
};

export default listaDeArticulos;