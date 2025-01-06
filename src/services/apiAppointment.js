import supabase from "./supabase";

export default async function getAppointments({ filter, sortBy }) {
  let query = supabase.from("citas").select("*, pacientes(*)");

  if (filter != null) query = query.eq(filter.field, filter.value);

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new error("No se han podido cargar las citas");
  }

  return data;
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
