import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
import { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useUser } from "../features/authentication/useUser";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import getPatients from "../services/apiPatients";
import Input from "../ui/Input";
import Select from "../ui/Select";

const Label = styled.label`
  font-weight: 500;
`;

function Prescription() {
  const {
    user: {
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const [paciente, setPaciente] = useState(null);

  const [medico] = useState({
    nombre: "Dr " + currentFullName,
  });

  const { data: pacientesData, isLoading: isLoadingPacientes } = useQuery({
    queryKey: ["pacientes"],
    queryFn: getPatients,
  });

  const pacientes = pacientesData?.data;

  const opcionesPacientes =
    pacientes?.map((paciente) => ({
      value: paciente.id,
      label: `${paciente.nombre} ${paciente.apellido}`,
    })) || [];

  const [medicamentos, setMedicamentos] = useState([]);
  const [nuevoMedicamento, setNuevoMedicamento] = useState({
    nombre: "",
    duracion: "",
    vecesAlDia: "",
    descripcion: "",
  });

  const handlePacienteChange = (e) => {
    const pacienteSeleccionado = pacientes.find(
      (p) => p.id === parseInt(e.target.value)
    );

    if (pacienteSeleccionado) {
      setPaciente({
        id: pacienteSeleccionado.id,
        nombre: `${pacienteSeleccionado.nombre} ${pacienteSeleccionado.apellido}`,
        alergias: pacienteSeleccionado.alergias || "No especificado",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoMedicamento({ ...nuevoMedicamento, [name]: value });
  };

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

    doc.addImage("/white-logo.png", "PNG", 10, 10, 40, 40);
    doc.setFontSize(18);
    doc.text("Clínica Blanco y Saludable", 74, 10, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Paciente: ${paciente?.nombre || "N/A"}`, 10, 50);
    doc.text(`Alergias: ${paciente?.alergias || "Ninguna"}`, 10, 60);
    doc.text(`Médico: ${medico.nombre}`, 10, 70);

    doc.setFontSize(14);
    doc.text("Medicamentos Recetados", 10, 90);

    doc.autoTable({
      startY: 100,
      head: [["Nombre", "Duración (días)", "Veces al día", "Descripción"]],
      body: medicamentos.map((med) => [
        med.nombre,
        med.duracion,
        med.vecesAlDia,
        med.descripcion,
      ]),
    });

    doc.save("receta-medica.pdf");
  };

  return (
    <Row type="vertical">
      <Heading as="h1">Receta Médica</Heading>
      <div>
        <h3>Datos del Paciente</h3>
        <Label htmlFor="paciente">Paciente</Label>
        <div></div>
        <Select
          id="paciente"
          options={[
            {
              value: "",
              label: isLoadingPacientes
                ? "Cargando pacientes..."
                : "Selecciona un paciente",
            },
            ...opcionesPacientes,
          ]}
          onChange={handlePacienteChange}
          defaultValue=""
        />
        {paciente && (
          <div>
            <p>Nombre: {paciente.nombre}</p>
            <p>Alergias: {paciente.alergias}</p>
          </div>
        )}
      </div>
      <div>
        <h3>Datos del Médico</h3>
        <p>Nombre: {medico.nombre}</p>
      </div>
      <div>
        <h3>Medicamentos</h3>
        <div>
          <Input
            type="text"
            name="nombre"
            placeholder="Nombre del medicamento"
            value={nuevoMedicamento.nombre}
            onChange={handleChange}
          />
          <Input
            type="number"
            name="duracion"
            placeholder="Duración (días)"
            value={nuevoMedicamento.duracion}
            onChange={handleChange}
          />
          <Input
            type="number"
            name="vecesAlDia"
            placeholder="Veces al día"
            value={nuevoMedicamento.vecesAlDia}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="descripcion"
            placeholder="Descripción"
            value={nuevoMedicamento.descripcion}
            onChange={handleChange}
          />
          <Button onClick={agregarMedicamento}>Agregar Medicamento</Button>
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
}

export default Prescription;
