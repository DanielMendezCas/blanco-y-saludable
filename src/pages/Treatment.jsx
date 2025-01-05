import TreatmentTable from "../features/treatments/TreatmentTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Treatment() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Tratamientos</Heading>
      </Row>
      <Row>
        <TreatmentTable />
      </Row>
    </>
  );
}

export default Treatment;
