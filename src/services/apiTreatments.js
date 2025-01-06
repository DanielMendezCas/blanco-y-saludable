import { PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";

export default async function getTreatments({ filter, sortBy, page }) {
  let query = supabase.from("tratamientos").select("*, pacientes(*)", {
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
    throw new error("No se han podido cargar los tratamientos");
  }

  return { data, count };
}

export async function deleteTreatment(IdTreatment) {
  const { data, error } = await supabase
    .from("tratamientos")
    .delete()
    .eq("id", IdTreatment);

  if (error) {
    console.error(error);
    throw new error("No se ha podido eliminar el tratamiento");
  }

  return data;
}

export async function createTreatment(newTreatment) {
  const { data, error } = await supabase
    .from("tratamientos")
    .insert([newTreatment]);

  if (error) {
    console.error(error);
    throw new error("El tratamiento no puede ser registrado");
  }

  return data;
}
