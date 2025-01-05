import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function AppointmentTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "Todas", label: "Todas" },
          { value: "Confirmadas", label: "Confirmadas" },
          { value: "No confirmadas", label: "No confirmadas" },
        ]}
      />

      <SortBy
        options={[
          {
            value: "startDate-desc",
            label: "Ordenar por fecha (más proximas)",
          },
          { value: "startDate-asc", label: "Ordenar por fecha (más lejanas)" },
          {
            value: "totalPrice-desc",
            label: "Ordenar por precio (descendente)",
          },
          {
            value: "totalPrice-asc",
            label: "Ordenar por precio (ascendente)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default AppointmentTableOperations;
