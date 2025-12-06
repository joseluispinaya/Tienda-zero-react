import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
// @ts-ignore
import autoTable from "jspdf-autotable";

// ===========================
// EXPORTAR A EXCEL
// ===========================
export const exportToExcel = (data, filename = "reporte") => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(blob, `${filename}.xlsx`);
};

// ===========================
// EXPORTAR A PDF
// ===========================
export const exportToPDF = (columns, data, title = "Reporte") => {
  const doc = new jsPDF();

  // Título
  doc.text(title, 14, 15);

  // Columnas
  const tableColumn = columns.map((c) => c.name);

  // Filas
  const tableRows = data.map((row, i) => [
    i + 1,
    row.nombre,
    row.activo ? "Activo" : "Inactivo",
  ]);

  // 👇 La forma correcta ahora
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 20,
  });

  doc.save(`${title}.pdf`);
};
