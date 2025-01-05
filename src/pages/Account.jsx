import Heading from "../ui/Heading";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";

import Row from "../ui/Row";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";

function Account() {
  return (
    <>
      <Heading as="h1">Actualiza tu cuenta</Heading>

      <Row>
        <Heading as="h3">Actualizar datos</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as="h3">Actualizar contraseña</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
