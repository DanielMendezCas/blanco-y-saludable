import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

export default async function getPatients({ sortBy, page }) {
  let query = supabase.from("pacientes").select("*", {
    count: "exact",
  });

  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "desc",
    });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new error("No se han podido cargar los pacientes");
  }

  return { data, count };
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
