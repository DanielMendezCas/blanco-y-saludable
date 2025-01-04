import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import AppointmentRow from "./AppointmentRow";

function AppointmentTable() {
  const bookings = [];

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Fecha</div>
          <div>Hora</div>
          <div>Paciente</div>
          <div>Motivo</div>
          <div>Estatus</div>
          <div>Precio</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <AppointmentRow key={booking.id} booking={booking} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default AppointmentTable;
