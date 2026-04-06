import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const facturaPDF = (venta) => {
  const doc = new jsPDF();

  // =========================
  // ENCABEZADO
  // =========================

  doc.setFontSize(16);
  doc.text("FACTURA", 150, 15);

  doc.setFontSize(10);
  doc.text("Mi Empresa S.A.", 14, 15);
  doc.text("Direccion: Izabal, Guatemala", 14, 20);
  doc.text("Telefono: 5555-5555", 14, 25);

  // =========================
  // DATOS FACTURA
  // =========================

  doc.text(`Factura No: ${venta.id}`, 14, 35);
  doc.text(`Fecha: ${venta.fecha}`, 14, 40);

  // =========================
  // DATOS CLIENTE
  // =========================

  doc.text("Cliente:", 14, 50);
  doc.text(`${venta.clientes.nombre}`, 14, 55);
  doc.text(`${venta.clientes.telefono}`, 14, 60);

  // =========================
  // TABLA PRODUCTOS
  // =========================

  const body = venta.detallefacturas.map((item) => [
    item.articulos.articulo,
    item.cantidad,
    item.precioventa,
    item.total
  ]);

  autoTable(doc, {
    startY: 70,
    head: [["Producto", "Cantidad", "Precio", "Total"]],
    body: body,
  });

  // =========================
  // TOTALES
  // =========================

  const finalY = doc.lastAutoTable.finalY + 10;

  doc.text(`Subtotal: Q ${venta.subtotal}`, 140, finalY);
  doc.text(`Descuento: Q ${venta.descuento}`, 140, finalY + 5);

  doc.setFont("helvetica", "bold");
  doc.text(`Total: Q ${venta.total}`, 140, finalY + 12);

  // =========================
  // ABRIR EN NUEVA PESTAÑA
  // =========================

  const url = doc.output("bloburl");
  window.open(url, "_blank");
};

export default facturaPDF;