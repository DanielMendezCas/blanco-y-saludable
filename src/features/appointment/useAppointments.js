import { useQuery } from "@tanstack/react-query";
import getAppointments from "../../services/apiAppointment";
import { useSearchParams } from "react-router-dom";

export default function useAppointments() {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("estatus");
  const filter =
    !filterValue || filterValue === "Todas"
      ? null
      : { field: "estatus", value: filterValue };

  const sortByRaw = searchParams.get("sortBy") || "fecha-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: { data: appointments, count } = {},
    error,
  } = useQuery({
    queryKey: ["citas", filter, sortBy, page],
    queryFn: () => getAppointments({ filter, sortBy, page }),
  });

  return { isLoading, error, appointments, count };
}
