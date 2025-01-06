import { PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";

export default async function getAppointments({ filter, sortBy, page }) {
  let query = supabase.from("citas").select("*, pacientes(*)", {
    count: "exact",
  });

  if (filter != null) query = query.eq(filter.field, filter.value);

  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("No se han podido cargar las citas");
  }

  return { data, count };
}

export async function createAppointment(newAppointment) {
  const { data, error } = await supabase.from("citas").insert([newAppointment]);

  if (error) {
    console.error(error);
    throw new Error("La cita no ha podido ser realizada");
  }

  return data;
}

export async function deleteAppointment(IdAppointment) {
  const { data, error } = await supabase
    .from("citas")
    .delete()
    .eq("id", IdAppointment);

  if (error) {
    console.error(error);
    throw new error("No se ha podido eliminar la cita");
  }

  return data;
}
