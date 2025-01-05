import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUpdateUser } from "./useUpdateUser";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password }) {
    updateUser({ password }, { onSuccess: reset });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label=" Nueva contraseña (minímo 8 carácteres)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "Este campo es necesario",
            minLength: {
              value: 8,
              message: "La contraseña debe tener al menos 8 carácteres",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Repetir contraseña"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "Este campo es requerido",
            validate: (value) =>
              getValues().password === value ||
              "Las contraseñas deben de coincidir",
          })}
        />
      </FormRow>
      <FormRow>
        <Button onClick={reset} type="reset" variation="secondary">
          Cancelar
        </Button>
        <Button disabled={isUpdating}>Actualizar</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
