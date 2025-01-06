import { useQuery } from "@tanstack/react-query";
import getPatients from "../../services/apiPatients";
import { useSearchParams } from "react-router-dom";

export default function usePatients() {
  const [searchParams] = useSearchParams();

  const sortByRaw = searchParams.get("sortBy") || "nombre-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { isLoading, data, error } = useQuery({
    queryKey: ["pacientes", sortBy, page],
    queryFn: () => getPatients({ sortBy, page }),
  });

  const patients = data?.data || [];
  const count = data?.count || 0;

  return { isLoading, error, patients, count };
}
