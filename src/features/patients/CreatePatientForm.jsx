import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPatient } from "../../services/apiPatients";
import toast from "react-hot-toast";

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

function CreatePatientForm({ onCloseModal }) {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: createPatient,
    onSuccess: () => {
      toast.success("Paciente registrado correctamente");
      queryClient.invalidateQueries({
        queryKey: ["pacientes"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function submit(data) {
    mutate(data);
  }

  return (
    <Form
      onSubmit={handleSubmit(submit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow>
        <Label htmlFor="name">Nombre</Label>
        <Input type="text" id="nombre" {...register("nombre")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="lastname">Apellido</Label>
        <Input type="text" id="apellido" {...register("apellido")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="dob">Fecha de Nacimiento</Label>
        <Input
          type="date"
          id="fecha_nacimiento"
          {...register("fecha_nacimiento")}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="email">Correo</Label>
        <Input type="text" id="correo" {...register("correo")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="phone">Telefono</Label>
        <Input type="number" id="telefono" {...register("telefono")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Alergias</Label>
        <Textarea type="text" id="alergias" {...register("alergias")} />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancelar
        </Button>
        <Button disabled={isLoading}>Agregar paciente</Button>
      </FormRow>
    </Form>
  );
}

export default CreatePatientForm;
