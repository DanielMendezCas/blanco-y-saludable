import supabase from "./supabase";

export default async function getPayments() {
  const { data, error } = await supabase
    .from("pagos")
    .select("*, pacientes(*)");

  if (error) throw new Error(error.message);

  return data;
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
