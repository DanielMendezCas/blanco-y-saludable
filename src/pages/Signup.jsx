import styled from "styled-components";
import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";
import Logo from "../ui/Logo";
import { useNavigate } from "react-router-dom";

const SignUpLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-0);
`;

const ReturnLogin = styled.p`
  margin: 0;
  font-size: 1.4rem;
  color: var(--color-primary);
  text-align: center;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: var(--color-primary-dark);
  }
`;

function Signup() {
  const navigate = useNavigate();
  return (
    <SignUpLayout>
      <Logo />
      <Heading as="h4">Crear cuenta</Heading>
      <ReturnLogin onClick={() => navigate("/login")}>
        ¿Ya tienes una cuenta?, inicia sesión
      </ReturnLogin>
      <SignupForm />
    </SignUpLayout>
  );
}

export default Signup;
