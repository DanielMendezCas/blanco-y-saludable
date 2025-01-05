import Button from "../../ui/Button";
import { useState } from "react";
import Modal from "../../ui/Modal";
import CreateAppointmentForm from "./CreateAppointmentForm";

function AddAppointment() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <div>
      <Button onClick={() => setIsOpenModal((show) => !show)}>
        Realizar cita
      </Button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateAppointmentForm onCloseModal={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </div>
  );
}

export default AddAppointment;
