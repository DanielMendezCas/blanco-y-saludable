import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function AppointmentTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="estatus"
        options={[
          { value: "Todas", label: "Todas" },
          { value: true, label: "Confirmadas" },
          { value: false, label: "No confirmadas" },
        ]}
      />

      <SortBy
        options={[
          {
            value: "fecha-asc",
            label: "Ordenar por fecha (más proximas)",
          },
          { value: "fecha-desc", label: "Ordenar por fecha (más lejanas)" },
          {
            value: "precio-desc",
            label: "Ordenar por precio (descendente)",
          },
          {
            value: "precio-asc",
            label: "Ordenar por precio (ascendente)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default AppointmentTableOperations;
