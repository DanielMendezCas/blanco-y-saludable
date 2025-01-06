import styled from "styled-components";
import Tag from "../../ui/Tag";
import { formatCurrency } from "../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteTreatment } from "../../services/apiTreatments";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 3.3fr 3fr 3fr 2fr 2.5fr 1fr;
  column-gap: 1.5rem;
  align-items: center;
  padding: 1.2rem 1.5rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Patient = styled.div`
  font-family: "Sono";
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
  }

  & span:nth-child(2) {
    font-size: 1.4rem;
    font-weight: 500;
    color: var(--color-grey-600);
  }

  & span:last-child {
    font-size: 1.2rem;
    font-weight: 400;
    color: var(--color-grey-500);
  }
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
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

function TreatmentRow({
  treatment: {
    id: id,
    nombre_tratamiento,
    notas,
    estado,
    precio,
    pacientes: { nombre, apellido, correo } = {},
  },
}) {
  const statusToTagName = {
    Finalizado: "green",
    Cancelado: "red",
    "En curso": "blue",
  };

  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: (id) => deleteTreatment(id),
    onSuccess: () => {
      toast.success("Tratamiento eliminado correctamente");
      queryClient.invalidateQueries({
        queryKey: ["tratamientos"],
      });
    },
    onError: () => toast.error("La cita no se ha podido eliminar"),
  });

  return (
    <TableRow role="table">
      <Patient>
        <span>{nombre} </span>
        <span>{apellido}</span>
        <span>{correo}</span>
      </Patient>

      <Stacked>{nombre_tratamiento}</Stacked>
      <Tag type={statusToTagName[estado]}>{estado}</Tag>
      <Amount>{formatCurrency(precio)}</Amount>
      <Stacked>{notas}</Stacked>
      <DeleteButton onClick={() => mutate(id)} disabled={isDeleting}>
        Borrar
      </DeleteButton>
    </TableRow>
  );
}

export default TreatmentRow;
