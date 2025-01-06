import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getPatients from "../../services/apiPatients";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { createAppointment } from "../../services/apiAppointment";
import toast from "react-hot-toast";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";

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
function CreateAppointmentForm({ onCloseModal }) {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  const { data: pacientesData, isLoading: isLoadingPacientes } = useQuery({
    queryKey: ["pacientes"],
    queryFn: getPatients,
  });

  const pacientes = pacientesData?.data;

  const { mutate, isLoading } = useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      toast.success("Cita realizada correctamente");
      queryClient.invalidateQueries({
        queryKey: ["citas"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function submit(data) {
    const appointmentData = {
      id_paciente: data.paciente,
      estatus: data.estatus === "true",
      fecha: data.fecha,
      hora: data.hora,
      motivo: data.motivo || null,
      precio: parseFloat(data.precio),
    };

    mutate(appointmentData);
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
        <Label htmlFor="estatus">Estado</Label>
        <select id="estatus" {...register("estatus")} defaultValue="">
          <option value="" disabled>
            Selecciona un estatus
          </option>
          <option value="true">Confirmada</option>
          <option value="false">No Confirmada</option>
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
        <Label htmlFor="motivo">Motivo</Label>
        <Textarea id="motivo" {...register("motivo")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="precio">Precio</Label>
        <Input
          type="number"
          id="precio"
          {...register("precio", { required: true, min: 0 })}
          placeholder="Ingresa el precio"
          step="0.01"
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancelar
        </Button>
        <Button disabled={isLoading}>Añadir cita</Button>
      </FormRow>
    </Form>
  );
}

export default CreateAppointmentForm;
