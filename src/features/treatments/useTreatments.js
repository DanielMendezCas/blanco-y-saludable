import { useQuery } from "@tanstack/react-query";
import getTreatments from "../../services/apiTreatments";
import { useSearchParams } from "react-router-dom";

export default function useTreatments() {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("estado");
  const filter =
    !filterValue || filterValue === "Todos"
      ? null
      : { field: "estado", value: filterValue };

  const sortByRaw = searchParams.get("sortBy") || "precio-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: { data: treatments, count } = {},
    error,
  } = useQuery({
    queryKey: ["tratamientos", filter, sortBy, page],
    queryFn: () => getTreatments({ filter, sortBy, page }),
  });

  return { isLoading, error, treatments, count };
}
