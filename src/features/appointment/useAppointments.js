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

  const {
    isLoading,
    data: appointments,
    error,
  } = useQuery({
    queryKey: ["citas", filter],
    queryFn: () => getAppointments({ filter }),
  });

  return { isLoading, error, appointments };
}
