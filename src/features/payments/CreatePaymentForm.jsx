import styled from "styled-components";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createPayment } from "../../services/apiPayments";
import getPatients from "../../services/apiPatients";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;
const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;
function CreatePaymentForm({ onCloseModal }) {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  const { data: pacientesData, isLoading: isLoadingPacientes } = useQuery({
    queryKey: ["pacientes"],
    queryFn: getPatients,
  });

  const pacientes = pacientesData?.data;

  const { mutate, isLoading } = useMutation({
    mutationFn: createPayment,
    onSuccess: () => {
      toast.success("Pago registrado correctamente");
      queryClient.invalidateQueries({
        queryKey: ["pagos"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function submit(data) {
    const paymentData = {
      id_paciente: data.paciente,
      fecha: data.fecha,
      hora: data.hora,
      estado: data.estado,
      metodo: data.metodo,
      monto: parseFloat(data.monto),
      concepto: data.concepto || null,
    };

    mutate(paymentData);
  }

  return (
    <Form
      onSubmit={handleSubmit(submit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow>
        <Label htmlFor="paciente">Paciente</Label>
        <select id="paciente" {...register("paciente")} defaultValue="">
          <option value="" disabled>
            {isLoadingPacientes
              ? "Cargando pacientes..."
              : "Selecciona un paciente"}
          </option>
          {pacientes?.map((paciente) => (
            <option key={paciente.id} value={paciente.id}>
              {paciente.nombre} {paciente.apellido}
            </option>
          ))}
        </select>
      </FormRow>

      <FormRow>
        <Label htmlFor="date">Fecha</Label>
        <Input type="date" id="fecha" {...register("fecha")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="hora">Hora</Label>
        <Input type="text" id="hora" {...register("hora")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="estado">Estado</Label>
        <select id="estado" {...register("estado")} defaultValue="">
          <option value="" disabled>
            Selecciona un estado
          </option>
          <option value="true">Confirmado</option>
          <option value="false">Cancelado</option>
        </select>
      </FormRow>

      <FormRow>
        <Label htmlFor="metodo">Metodo</Label>
        <Input type="text" id="metodo" {...register("metodo")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="monto">Monto</Label>
        <Input
          type="number"
          id="monto"
          {...register("monto", { required: true, min: 0 })}
          placeholder="Ingresa el monto"
          step="0.01"
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="concepto">Concepto</Label>
        <Input type="concepto" id="concepto" {...register("concepto")} />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancelar
        </Button>
        <Button disabled={isLoading}>Registrar pago</Button>
      </FormRow>
    </Form>
  );
}

export default CreatePaymentForm;
