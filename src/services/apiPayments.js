import { PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";

export default async function getPayments({ filter, sortBy, page }) {
  let query = supabase.from("pagos").select("*, pacientes(*)", {
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
    throw new Error("No se han podido cargar las pagos");
  }

  return { data, count };
}

export async function deletePayment(IdPayment) {
  const { data, error } = await supabase
    .from("pagos")
    .delete()
    .eq("id", IdPayment);

  if (error) {
    console.error(error);
    throw new error("No se ha podido eliminar el pago");
  }

  return data;
}

export async function createPayment(newPayment) {
  const { data, error } = await supabase.from("pagos").insert([newPayment]);

  if (error) {
    console.error(error);
    throw new Error("El pago no puede ser registrado");
  }

  return data;
}
