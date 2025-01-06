import styled from "styled-components";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTreatment } from "../../services/apiTreatments";
import toast from "react-hot-toast";
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

function CreateTreatmentForm({ onCloseModal }) {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  const { data: pacientes, isLoading: isLoadingPacientes } = useQuery({
    queryKey: ["pacientes"],
    queryFn: getPatients,
  });
  const { mutate, isLoading } = useMutation({
    mutationFn: createTreatment,
    onSuccess: () => {
      toast.success("Tratamiento registrado correctamente");
      queryClient.invalidateQueries({
        queryKey: ["tratamientos"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function submit(data) {
    const treatmentData = {
      id_paciente: data.paciente,
      nombre_tratamiento: data.nombre_tratamiento,
      estado: data.estado,
      precio: parseFloat(data.precio),
      notas: data.notas || null,
    };

    mutate(treatmentData);
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
        <Label htmlFor="tratamiento">Tratamiento</Label>
        <Input
          type="tratamiento"
          id="tratamiento"
          {...register("nombre_tratamiento")}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="estado">Estado</Label>
        <select id="estado" {...register("estado")} defaultValue="">
          <option value="" disabled>
            Selecciona un estatus
          </option>
          <option value="finalizado">Finalizado</option>
          <option value="cancelado">Cancelado</option>
          <option value="en curso">En curso</option>
        </select>
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
        <Label htmlFor="notas">Notas</Label>
        <Textarea id="notas" {...register("notas")} />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancelar
        </Button>
        <Button disabled={isLoading}>Registrar tratamiento</Button>
      </FormRow>
    </Form>
  );
}

export default CreateTreatmentForm;
