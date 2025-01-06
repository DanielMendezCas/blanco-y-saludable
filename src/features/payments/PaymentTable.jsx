import PaymentRow from "./PaymentRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import usePayments from "./usePayments";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";

function PaymentTable() {
  const { payments, isLoading, count } = usePayments();
  if (isLoading) return <Spinner />;

  if (!payments.length) return <Empty resource="pagos" />;
  return (
    <Menus>
      <Table columns="2.7fr 1.5fr 1.3fr 1.5fr 2fr 2.2fr 1.5fr 1.5fr">
        <Table.Header>
          <div>Paciente</div>
          <div>Fecha</div>
          <div>Hora</div>
          <div>Estado</div>
          <div>Metodo</div>
          <div>Monto</div>
          <div>Concepto</div>
        </Table.Header>

        <Table.Body
          data={payments}
          render={(payment) => (
            <PaymentRow key={payment.id} payment={payment} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default PaymentTable;
