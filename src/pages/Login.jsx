import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import { useNavigate } from "react-router-dom";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-0);
`;

const CreateAccount = styled.p`
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

function Login() {
  const navigate = useNavigate();
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Iniciar sesión</Heading>
      <CreateAccount onClick={() => navigate("/signup")}>
        O crea una cuenta
      </CreateAccount>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
