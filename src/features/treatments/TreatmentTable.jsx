import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import useTreatments from "./useTreatments";
import Spinner from "../../ui/Spinner";
import TreatmentRow from "./TreatmentRow";

function TreatmentTable() {
  const { treatments, isLoading } = useTreatments();
  if (isLoading) return <Spinner />;

  if (!treatments.length) return <Empty resource="tratamientos" />;
  return (
    <Menus>
      <Table columns="2fr 1.5fr 1.5fr 1.4fr 1.4fr">
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
      </Table>
    </Menus>
  );
}

export default TreatmentTable;
