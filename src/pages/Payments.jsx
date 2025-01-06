import AddPayment from "../features/payments/AddPayment";
import PaymentTable from "../features/payments/PaymentTable";
import PaymentTableOperations from "../features/payments/PaymentTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Payments() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Pagos</Heading>
        <PaymentTableOperations />
      </Row>
      <Row>
        <PaymentTable />
        <AddPayment />
      </Row>
    </>
  );
}

export default Payments;
