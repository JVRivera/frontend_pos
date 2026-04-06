import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const listaDeClientes = (clientes) => {
  const doc = new jsPDF();

  doc.text("Reporte de clientes", 14, 10);

  autoTable(doc, {
    head: [["Id", "Nombre", "Direccion", "Telefono", "Nit"]],
    body: clientes.map(c => [
      c.id,
      c.nombre,
      c.direccion,
      c.telefono,
      c.nit
    ])
  });

  const url = doc.output("bloburl");
  window.open(url, "_blank");
};

export default listaDeClientes;