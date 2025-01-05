import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AppointmentTable from "../features/appointment/AppointmentTable";
import AddAppointment from "../features/appointment/AddAppointment";
import AppointmentTableOperations from "../features/appointment/AppointmentTableOperations";

function Appointment() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Citas</Heading>
        <AppointmentTableOperations />
      </Row>
      <Row>
        <AppointmentTable />
        <AddAppointment />
      </Row>
    </>
  );
}

export default Appointment;
