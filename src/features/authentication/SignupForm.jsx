import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRowVertical from "../../ui/FormRowVertical";
import Input from "../../ui/Input";
import { useSignUp } from "./useSignup";

function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { signUp, isLoading } = useSignUp();

  function onSubmit({ fullName, email, password }) {
    signUp(
      { fullName, email, password },
      {
        onSettled: reset,
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical
        label="Nombre completo"
        error={errors?.fullName?.message}
      >
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register("fullName", { required: "Este campo es necesario" })}
        />
      </FormRowVertical>

      <FormRowVertical label="Correo" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "Este campo es necesario",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Por favor, ingrese una dirección de correo válida",
            },
          })}
        />
      </FormRowVertical>

      <FormRowVertical
        label="Contraseña (minímo 8 carácteres)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", {
            required: "Este campo es necesario",
            minLength: {
              value: 8,
              message: "La contraseña debe tener al menos 8 carácteres",
            },
          })}
        />
      </FormRowVertical>

      <FormRowVertical
        label="Repetir contraseña"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "Este campo es necesario",
            validate: (value) =>
              value === getValues().password ||
              "Las contraseñas deben de coincidir",
          })}
        />
      </FormRowVertical>

      <FormRowVertical>
        <Button
          variation="secondary"
          type="reset"
          disabled={isLoading}
          onClick={reset}
        >
          Cancelar
        </Button>
        <Button disabled={isLoading}>Crear cuenta</Button>
      </FormRowVertical>
    </Form>
  );
}

export default SignupForm;
