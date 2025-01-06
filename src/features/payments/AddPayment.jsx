import Button from "../../ui/Button";
import { useState } from "react";
import Modal from "../../ui/Modal";
import CreatePaymentForm from "./CreatePaymentForm";

function AddPayment() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <div>
      <Button onClick={() => setIsOpenModal((show) => !show)}>
        Registrar Pago
      </Button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreatePaymentForm onCloseModal={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </div>
  );
}

export default AddPayment;
