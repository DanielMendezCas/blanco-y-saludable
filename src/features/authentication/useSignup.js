import { useMutation } from "@tanstack/react-query";
import { signup as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: signUpApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "El usuario se ha registrado exitosamente, por favor verifica la cuenta en tu dirección de correo"
      );
    },
  });

  return { signUp, isLoading };
}
