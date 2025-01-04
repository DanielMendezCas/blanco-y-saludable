import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Prescription = () => {
  // Estado para la receta
  const [paciente, setPaciente] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [medico, setMedico] = useState({
    cedula: "12345678",
    nombre: "Dr. Pérez",
  }); // Cambiar según la sesión
  const [medicamentos, setMedicamentos] = useState([]);
  const [nuevoMedicamento, setNuevoMedicamento] = useState({
    nombre: "",
    duracion: "",
    vecesAlDia: "",
    descripcion: "",
  });

  // Simula la obtención del paciente desde la tabla (reemplazar con fetch del backend)
  useEffect(() => {
    setPaciente({
      id: 1,
      nombre: "Juan Pérez",
      edad: 30,
      historial: "Sin alergias conocidas",
    });
  }, []);

  // Maneja los cambios en el nuevo medicamento
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoMedicamento({ ...nuevoMedicamento, [name]: value });
  };

  // Agregar un nuevo medicamento a la lista
  const agregarMedicamento = () => {
    if (
      nuevoMedicamento.nombre &&
      nuevoMedicamento.duracion &&
      nuevoMedicamento.vecesAlDia &&
      nuevoMedicamento.descripcion
    ) {
      setMedicamentos([...medicamentos, nuevoMedicamento]);
      setNuevoMedicamento({
        nombre: "",
        duracion: "",
        vecesAlDia: "",
        descripcion: "",
      });
    }
  };

  const generarPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [148, 210],
    });

    const imagePath = "/white-logo.png";

    doc.addImage(imagePath, "PNG", 10, 10, 40, 40);

    doc.setFontSize(18);
    doc.text("Clínica Blanco y Saludable", 74, 10, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Paciente: ${paciente.nombre}`, 10, 50);
    doc.text(`Edad: ${paciente.edad}`, 10, 60);
    doc.text(`Médico: ${medico.nombre} (Cédula: ${medico.cedula})`, 10, 70);

    // Título para la tabla
    doc.setFontSize(14);
    doc.text("Medicamentos Recetados", 10, 90);

    // Tabla de medicamentos
    doc.autoTable({
      startY: 100, // Posición inicial
      head: [["Nombre", "Duración (días)", "Veces al día", "Descripción"]],
      body: medicamentos.map((med) => [
        med.nombre,
        med.duracion,
        med.vecesAlDia,
        med.descripcion,
      ]),
    });

    // Guardar el PDF
    doc.save("receta-medica.pdf");
  };

  return (
    <Row type="vertical">
      <Heading as="h1">Receta Médica</Heading>
      <h2>Clínica Blanco y Saludable</h2>
      <div>
        <h3>Datos del Paciente</h3>
        <p>Nombre: {paciente.nombre}</p>
        <p>Edad: {paciente.edad}</p>
        <p>Historial: {paciente.historial}</p>
      </div>
      <div>
        <h3>Datos del Médico</h3>
        <p>Nombre: {medico.nombre}</p>
        <p>Cédula: {medico.cedula}</p>
      </div>
      <div>
        <h3>Medicamentos</h3>
        <div>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre del medicamento"
            value={nuevoMedicamento.nombre}
            onChange={handleChange}
          />
          <input
            type="number"
            name="duracion"
            placeholder="Duración (días)"
            value={nuevoMedicamento.duracion}
            onChange={handleChange}
          />
          <input
            type="number"
            name="vecesAlDia"
            placeholder="Veces al día"
            value={nuevoMedicamento.vecesAlDia}
            onChange={handleChange}
          />
          <input
            type="text"
            name="descripcion"
            placeholder="Descripción"
            value={nuevoMedicamento.descripcion}
            onChange={handleChange}
          />
          <button onClick={agregarMedicamento}>Agregar Medicamento</button>
        </div>
        <ul>
          {medicamentos.map((med, index) => (
            <li key={index}>
              {med.nombre} - {med.duracion} días - {med.vecesAlDia} veces al día
              - {med.descripcion}
            </li>
          ))}
        </ul>
      </div>
      <Button variation="primary" size="medium" onClick={generarPDF}>
        Generar PDF
      </Button>
    </Row>
  );
};

export default Prescription;
