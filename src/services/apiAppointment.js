import supabase from "./supabase";

export default async function getAppointments() {
  const { data, error } = await supabase
    .from("citas")
    .select("*, pacientes(*)");

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
    .from("tratamientos")
    .delete()
    .eq("id", IdAppointment);

  if (error) {
    console.error(error);
    throw new error("No se ha podido eliminar la cita");
  }

  return data;
}
