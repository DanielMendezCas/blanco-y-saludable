import supabase from "./supabase";

export default async function getPatients() {
  const { data, error } = await supabase.from("pacientes").select("*");

  if (error) {
    console.error(error);
    throw new error("No se han podido cargar los pacientes");
  }

  return data;
}

export async function deletePatient(IdPatient) {
  const { data, error } = await supabase
    .from("pacientes")
    .delete()
    .eq("id", IdPatient);

  if (error) {
    console.error(error);
    throw new error("No se ha podido eliminar al paciente");
  }

  return data;
}

export async function createPatient(newPatient) {
  const { data, error } = await supabase.from("pacientes").insert([newPatient]);

  if (error) {
    console.error(error);
    throw new Error("El paciente no ha podido ser registrado");
  }

  return data;
}
