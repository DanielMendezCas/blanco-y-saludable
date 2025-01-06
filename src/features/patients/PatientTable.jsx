import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Table from "../../ui/Table";
import PatientRow from "./PatientRow";
import usePatients from "./usePatients";
import Pagination from "../../ui/Pagination";

function PatientTable() {
  const { patients, isLoading, count } = usePatients();
  if (isLoading) return <Spinner />;

  if (!patients.length) return <Empty resource="pacientes" />;
  return (
    <Menus>
      <Table columns="1.9fr 2.6fr 2fr 2.2fr 1.6fr 2fr">
        <Table.Header>
          <div>Nombre</div>
          <div>Apellido</div>
          <div>Edad</div>
          <div>Correo</div>
          <div>Telefono</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={patients}
          render={(patient) => (
            <PatientRow key={patient.id} patient={patient} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default PatientTable;
