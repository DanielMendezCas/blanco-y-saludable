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

export async function deleteTreatment(IdTreatment) {
  const { data, error } = await supabase
    .from("tratamientos")
    .delete()
    .eq("id", IdTreatment);

  if (error) {
    console.error(error);
    throw new Error("No se ha podido eliminar el tratamiento");
  }

  return data;
}

export async function createTreatment(newTreatment) {
  const { data, error } = await supabase
    .from("tratamientos")
    .insert([newTreatment]);

  if (error) {
    console.error(error);
    throw new Error("El tratamiento no puede ser registrado");
  }

  return data;
}
