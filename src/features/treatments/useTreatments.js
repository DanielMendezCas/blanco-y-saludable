import { useQuery } from "@tanstack/react-query";
import getTreatments from "../../services/apiTreatments";

export default function useTreatments() {
  const {
    isLoading,
    data: treatments,
    error,
  } = useQuery({
    queryKey: ["tratamientos"],
    queryFn: getTreatments,
  });

  return { isLoading, error, treatments };
}
