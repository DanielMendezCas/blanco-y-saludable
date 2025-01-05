import supabase from "./supabase";

export default async function getTreatments() {
  const { data: tratamientos, error } = await supabase
    .from("tratamientos")
    .select("*, pacientes(*)");

  if (error) {
    console.error(error);
    throw new error("No se han podido cargar los tratamientos");
  }

  return tratamientos;
}
