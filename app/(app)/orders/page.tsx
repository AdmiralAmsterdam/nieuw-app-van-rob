"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { GlassCard } from "@/components/glass-card";
import { OrderStatusBar } from "@/components/order-status-bar";
import type { OrderStatus } from "@/lib/types";

type OrderRow = {
  id: string;
  status: OrderStatus;
  total_amount: number;
  created_at: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const showSuccess = searchParams.get("success") === "1";

  useEffect(() => {
    const supabase = createClient();

    const load = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from("orders")
        .select("id,status,total_amount,created_at")
        .eq("profile_id", user.id)
        .order("created_at", { ascending: false });
      if (!data) {
        setError("Bestellingen konden niet worden geladen.");
        return;
      }
      setError(null);
      setOrders(data as OrderRow[]);
    };

    load();

    const channel = supabase
      .channel("orders-channel")
      .on("postgres_changes", { event: "*", schema: "public", table: "orders" }, () => load())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl space-y-4 p-6">
      <h1 className="text-2xl font-semibold text-white">Bestellingen</h1>
      {showSuccess ? (
        <GlassCard className="p-4 text-forest-deep">
          Bestelling succesvol geplaatst. Je ontvangt updates zodra de status wijzigt.
        </GlassCard>
      ) : null}
      {error ? <GlassCard className="p-4 text-red-800">{error}</GlassCard> : null}
      {!error && orders.length === 0 ? (
        <GlassCard className="p-4 text-forest-deep">
          Je hebt nog geen bestellingen geplaatst.
        </GlassCard>
      ) : null}
      {orders.map((order) => (
        <GlassCard key={order.id} className="space-y-3 p-4 text-forest-deep">
          <div className="flex items-center justify-between">
            <p className="font-semibold">Order #{order.id.slice(0, 8)}</p>
            <p>EUR {order.total_amount.toFixed(2)}</p>
          </div>
          <OrderStatusBar status={order.status} />
          <Link href={`/orders/${order.id}`} className="text-sm underline">
            Bekijk details
          </Link>
        </GlassCard>
      ))}
    </main>
  );
}
