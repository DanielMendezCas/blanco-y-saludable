import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function TreatmentTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="estado"
        options={[
          { value: "Todos", label: "Todos" },
          { value: "finalizado", label: "Finalizado" },
          { value: "cancelado", label: "Cancelado" },
          { value: "en curso", label: "En curso" },
        ]}
      />

      <SortBy
        options={[
          {
            value: "precio-desc",
            label: "Ordenar por costo (descendente)",
          },
          {
            value: "precio-asc",
            label: "Ordenar por costo (ascendente)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default TreatmentTableOperations;
