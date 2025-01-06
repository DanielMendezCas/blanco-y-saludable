import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function PaymentTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="estado"
        options={[
          { value: "Todos", label: "Todos" },
          { value: true, label: "Realizado" },
          { value: false, label: "Cancelado" },
        ]}
      />

      <SortBy
        options={[
          {
            value: "fecha-asc",
            label: "Ordenar por fecha (más recientes)",
          },
          { value: "fecha-desc", label: "Ordenar por fecha (más antiguos)" },
          {
            value: "monto-desc",
            label: "Ordenar por monto (descendente)",
          },
          {
            value: "monto-asc",
            label: "Ordenar por monto (ascendente)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default PaymentTableOperations;
