import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddPatient from "../features/patients/AddPatient";
import PatientTable from "../features/patients/PatientTable";

function Patients() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Pacientes</Heading>
      </Row>
      <Row>
        <PatientTable />
        <AddPatient />
      </Row>
    </>
  );
}

export default Patients;
