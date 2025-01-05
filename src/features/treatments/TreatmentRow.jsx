import styled from "styled-components";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";

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
    true: "green",
    false: "red",
  };

  const formattedEstatus = estado ? "Confirmado" : "No confirmado";

  return (
    <Table.Row>
      <Patient>
        <span>{nombre} </span>
        <span>{apellido}</span>
        <span>{correo}</span>
      </Patient>

      <Stacked>{nombre_tratamiento}</Stacked>
      <Tag type={statusToTagName[estado]}>{formattedEstatus}</Tag>
      <Amount>{formatCurrency(precio)}</Amount>
      <Stacked>{notas}</Stacked>
    </Table.Row>
  );
}

export default TreatmentRow;
