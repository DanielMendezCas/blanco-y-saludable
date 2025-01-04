import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import getPatients from "../../services/apiPatients";
import Spinner from "../../ui/Spinner";
import PatientRow from "./PatientRow";

// eslint-disable-next-line no-unused-vars
const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-50);
  border-radius: 7px;
  overflow: hidden;
`;

// eslint-disable-next-line no-unused-vars
const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0fr 1fr 1.8fr 2fr 1.8fr 1fr 2fr;
  column-gap: 1.5rem;
  align-items: center;
  background-color: var(--color-grey-00); /* Agregar un color más notable */
  border-bottom: 2px solid var(--color-blue-300); /* Línea más gruesa */
  text-transform: uppercase;
  font-weight: 600;
  color: var(--color-blue-700);
  padding: 1.5rem 1.5rem;
`;

function PatientTable() {
  const {
    isLoading,
    data: patients,
    error,
  } = useQuery({
    queryKey: ["pacientes"],
    queryFn: getPatients,
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Table role="table">
      <TableHeader role="row">
        <div></div>
        <div>Nombre</div>
        <div>Apellido</div>
        <div>Edad</div>
        <div>Correo</div>
        <div>Telefono</div>
        <div></div>
      </TableHeader>
      {patients.map((patient) => (
        <PatientRow patient={patient} key={patient.id} />
      ))}
    </Table>
  );
}

export default PatientTable;
