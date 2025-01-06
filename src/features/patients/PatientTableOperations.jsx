import SortBy from "../../ui/SortBy";

import TableOperations from "../../ui/TableOperations";

function PatientTableOperations() {
  return (
    <TableOperations>
      <SortBy
        options={[
          {
            value: "orderName",
            label: "Ordenar por nombre",
          },
          { value: "orderLastName", label: "Ordenar por apellido" },
          {
            value: "orderAge",
            label: "Ordenar por edad",
          },
        ]}
      />
    </TableOperations>
  );
}

export default PatientTableOperations;
