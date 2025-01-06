import { useQuery } from "@tanstack/react-query";
import getPayments from "../../services/apiPayments";

export default function usePatients() {
  const {
    isLoading,
    data: payments,
    error,
  } = useQuery({
    queryKey: ["pagos"],
    queryFn: getPayments,
  });

  return { isLoading, error, payments };
}
