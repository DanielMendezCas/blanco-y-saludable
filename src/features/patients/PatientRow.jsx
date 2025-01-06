import { useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { deletePatient } from "../../services/apiPatients";
import toast from "react-hot-toast";
import { calcularEdad } from "../../utils/helpers";
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1.7fr 2.2fr 1fr 2.5fr 2fr 1fr;
  column-gap: 1.5rem;
  align-items: center;
  padding: 1.2rem 1.5rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;
const Name = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const LastName = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Age = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-grey-600);
`;

const Email = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const PhoneNumber = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const DeleteButton = styled.button`
  background-color: var(--color-red-700);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1.2rem;

  &:disabled {
    background-color: var(--color-grey-400);
    cursor: not-allowed;
  }
`;

function PatientRow({ patient }) {
  const {
    id: idPaciente,
    nombre,
    apellido,
    fecha_nacimiento,
    correo,
    telefono,
  } = patient;

  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: (id) => deletePatient(id),
    onSuccess: () => {
      toast.success("Paciente eliminado correctamente");
      queryClient.invalidateQueries({
        queryKey: ["pacientes"],
      });
    },
    onError: () => toast.error("El paciente no se ha podido eliminar"),
  });

  return (
    <TableRow role="table">
      <Name>{nombre}</Name>
      <LastName>{apellido}</LastName>
      <Age>{calcularEdad(fecha_nacimiento)}</Age>
      <Email>{correo}</Email>
      <PhoneNumber>{telefono}</PhoneNumber>
      <DeleteButton onClick={() => mutate(idPaciente)} disabled={isDeleting}>
        Borrar
      </DeleteButton>
    </TableRow>
  );
}

export default PatientRow;
