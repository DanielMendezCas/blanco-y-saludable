import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import useTreatments from "./useTreatments";
import Spinner from "../../ui/Spinner";
import TreatmentRow from "./TreatmentRow";
import Pagination from "../../ui/Pagination";

function TreatmentTable() {
  const { treatments, isLoading, count } = useTreatments();
  if (isLoading) return <Spinner />;

  if (!treatments.length) return <Empty resource="tratamientos" />;
  return (
    <Menus>
      <Table columns="2.2fr 2.2fr 2fr 2fr 2fr">
        <Table.Header>
          <div>Paciente</div>
          <div>Tratamiento</div>
          <div>Estado</div>
          <div>Costo</div>
          <div>Notas</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={treatments}
          render={(treatment) => (
            <TreatmentRow key={treatment.id} treatment={treatment} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default TreatmentTable;
