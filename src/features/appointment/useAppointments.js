import { useQuery } from "@tanstack/react-query";
import getAppointments from "../../services/apiAppointment";

export default function useAppointments() {
  const {
    isLoading,
    data: appointments,
    error,
  } = useQuery({
    queryKey: ["citas"],
    queryFn: getAppointments,
  });

  return { isLoading, error, appointments };
}
