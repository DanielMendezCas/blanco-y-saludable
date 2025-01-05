import Button from "../../ui/Button";
import { useState } from "react";
import CreatePatientForm from "../../features/patients/CreatePatientForm";
import Modal from "../../ui/Modal";

function AddPatient() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <div>
      <Button onClick={() => setIsOpenModal((show) => !show)}>
        Agregar Paciente
      </Button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreatePatientForm onCloseModal={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </div>
  );
}

export default AddPatient;
