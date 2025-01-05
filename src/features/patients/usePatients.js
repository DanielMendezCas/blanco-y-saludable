import { useQuery } from "@tanstack/react-query";
import getPatients from "../../services/apiPatients";

export default function usePatients() {
  const {
    isLoading,
    data: patients,
    error,
  } = useQuery({
    queryKey: ["pacientes"],
    queryFn: getPatients,
  });

  return { isLoading, error, patients };
}
