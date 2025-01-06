import SortBy from "../../ui/SortBy";

import TableOperations from "../../ui/TableOperations";

function PatientTableOperations() {
  return (
    <TableOperations>
      <SortBy
        options={[
          {
            value: "nombre-desc",
            label: "Ordenar por nombre",
          },
          { value: "apellido-desc", label: "Ordenar por apellido" },
        ]}
      />
    </TableOperations>
  );
}

export default PatientTableOperations;
