import { useQuery } from "@tanstack/react-query";
import getPayments from "../../services/apiPayments";
import { useSearchParams } from "react-router-dom";

export default function usePatients() {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("estado");
  const filter =
    !filterValue || filterValue === "Todos"
      ? null
      : { field: "estado", value: filterValue };

  const sortByRaw = searchParams.get("sortBy") || "fecha-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: { data: payments, count } = {},
    error,
  } = useQuery({
    queryKey: ["pagos", filter, sortBy, page],
    queryFn: () => getPayments({ filter, sortBy, page }),
  });

  return { isLoading, error, payments, count };
}
