import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function TreatmentTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "Todos", label: "Todos" },
          { value: "Finalizado", label: "Finalizado" },
          { value: "Cancelado", label: "Cancelado" },
          { value: "En curso", label: "En curso" },
        ]}
      />

      <SortBy
        options={[
          {
            value: "totalPrice-desc",
            label: "Ordenar por costo (descendente)",
          },
          {
            value: "totalPrice-asc",
            label: "Ordenar por costo (ascendente)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default TreatmentTableOperations;
