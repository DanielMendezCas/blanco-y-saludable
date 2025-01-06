import AppointmentRow from "./AppointmentRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import useAppointments from "./useAppointments";
import Spinner from "../../ui/Spinner";

function AppointmentTable() {
  const { appointments, isLoading } = useAppointments();
  if (isLoading) return <Spinner />;

  if (!appointments.length) return <Empty resource="citas" />;
  return (
    <Menus>
      <Table columns="2fr 1.2fr 1.5fr 1.8fr 1.2fr 18rem">
        <Table.Header>
          <div>Paciente</div>
          <div>Fecha</div>
          <div>Hora</div>
          <div>Motivo</div>
          <div>Estado</div>
          <div>Precio</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={appointments}
          render={(appointment) => (
            <AppointmentRow key={appointment.id} appointment={appointment} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default AppointmentTable;
