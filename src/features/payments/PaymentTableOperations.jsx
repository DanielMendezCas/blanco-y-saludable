import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function PaymentTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "Todos", label: "Todos" },
          { value: "Realizado", label: "Realizado" },
          { value: "Cancelado", label: "Cancelado" },
        ]}
      />

      <SortBy
        options={[
          {
            value: "startDate-desc",
            label: "Ordenar por fecha (más recientes)",
          },
          { value: "startDate-asc", label: "Ordenar por fecha (más antiguos)" },
          {
            value: "totalPrice-desc",
            label: "Ordenar por monto (descendente)",
          },
          {
            value: "totalPrice-asc",
            label: "Ordenar por monto (ascendente)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default PaymentTableOperations;
