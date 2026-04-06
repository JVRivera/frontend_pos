import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const listaDeVentas = (ventas) => {
  const doc = new jsPDF();

  doc.text("Reporte de ventas", 14, 10);

  // Calcular total
  const totalGeneral = ventas.reduce((acc, item) => acc + Number(item.total), 0);

  autoTable(doc, {
    head: [["Id", "Fecha", "Cliente", "Total"]],
    body: [
      ...ventas.map(c => [
        c.id,
        c.fecha,
        c.clientes.nombre,
        c.total
      ]),
      [
        "",
        "",
        "TOTAL:",
        totalGeneral.toFixed(2)
      ]
    ],
  });

  const url = doc.output("bloburl");
  window.open(url, "_blank");
};

export default listaDeVentas;