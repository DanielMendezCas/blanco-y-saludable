import AddTreatment from "../features/treatments/AddTreatment";
import TreatmentTable from "../features/treatments/TreatmentTable";
import TreatmentTableOperations from "../features/treatments/TreatmentTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Treatment() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Tratamientos</Heading>
        <TreatmentTableOperations />
      </Row>
      <Row>
        <TreatmentTable />
        <AddTreatment />
      </Row>
    </>
  );
}

export default Treatment;
