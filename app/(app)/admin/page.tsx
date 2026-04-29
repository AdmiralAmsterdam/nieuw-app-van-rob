import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminOrders } from "@/components/admin-orders";

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl space-y-4 p-6">
      <h1 className="text-2xl font-semibold text-white">Admin bestellingen</h1>
      <AdminOrders />
    </main>
  );
}
