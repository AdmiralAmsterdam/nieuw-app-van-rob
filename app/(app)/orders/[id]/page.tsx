import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { GlassCard } from "@/components/glass-card";

export default async function OrderDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: order } = await supabase
    .from("orders")
    .select("id,status,total_amount,order_items(quantity,unit_price,subtotal,products(name_nl,unit))")
    .eq("id", id)
    .single();

  if (!order) notFound();

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl p-6">
      <GlassCard className="space-y-4 p-5 text-forest-deep">
        <h1 className="text-2xl font-semibold">Order #{order.id.slice(0, 8)}</h1>
        <p>Status: {order.status}</p>
        <p>Totaal: EUR {Number(order.total_amount).toFixed(2)}</p>
      </GlassCard>
    </main>
  );
}
