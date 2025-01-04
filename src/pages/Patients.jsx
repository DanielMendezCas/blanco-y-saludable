import Heading from "../ui/Heading";
import Row from "../ui/Row";
import PatientTable from "../features/patients/PatientTable";
import Button from "../ui/Button";
import { useState } from "react";
import CreatePatientForm from "../features/patients/CreatePatientForm";

function Patients() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Pacientes</Heading>
      </Row>
      <Row>
        <PatientTable />
        <Button onClick={() => setShowForm((show) => !show)}>
          Agregar Paciente
        </Button>
        {showForm && <CreatePatientForm />}
      </Row>
    </>
  );
}

export default Patients;
