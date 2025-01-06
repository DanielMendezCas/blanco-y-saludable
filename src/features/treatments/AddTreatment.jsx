import Button from "../../ui/Button";
import { useState } from "react";
import Modal from "../../ui/Modal";
import CreateTreatmentForm from "./CreateTreatmentForm";

function AddTreatment() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <div>
      <Button onClick={() => setIsOpenModal((show) => !show)}>
        Agregar Tratamiento
      </Button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateTreatmentForm onCloseModal={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </div>
  );
}

export default AddTreatment;
