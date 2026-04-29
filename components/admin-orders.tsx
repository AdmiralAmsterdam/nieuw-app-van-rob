"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { GlassCard } from "@/components/glass-card";
import type { OrderStatus } from "@/lib/types";

type AdminOrder = {
  id: string;
  status: OrderStatus;
  profiles: { company_name: string | null }[] | null;
};

const statuses: OrderStatus[] = [
  "pending",
  "confirmed",
  "in_production",
  "shipped",
  "delivered"
];

export function AdminOrders() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const load = useCallback(async () => {
    const { data } = await supabase
      .from("orders")
      .select("id,status,profiles(company_name)")
      .order("created_at", { ascending: false });
    if (!data) {
      setError("Bestellingen konden niet worden geladen.");
      return;
    }
    setError(null);
    setOrders(data as AdminOrder[]);
  }, [supabase]);

  const updateStatus = async (id: string, status: OrderStatus) => {
    const { error: updateError } = await supabase.from("orders").update({ status }).eq("id", id);
    if (updateError) {
      setError("Status kon niet worden bijgewerkt.");
      return;
    }
    await load();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      void load();
    }, 0);
    return () => clearTimeout(timer);
  }, [load]);

  return (
    <div className="space-y-4">
      {error ? <GlassCard className="p-4 text-red-800">{error}</GlassCard> : null}
      {!error && orders.length === 0 ? (
        <GlassCard className="p-4 text-forest-deep">Nog geen bestellingen beschikbaar.</GlassCard>
      ) : null}
      {orders.map((order) => (
        <GlassCard key={order.id} className="flex items-center justify-between p-4 text-forest-deep">
          <div>
            <p className="font-semibold">#{order.id.slice(0, 8)}</p>
            <p>{order.profiles?.[0]?.company_name ?? "Onbekend bedrijf"}</p>
          </div>
          <select
            value={order.status}
            className="rounded-xl border border-white/50 bg-white/70 px-3 py-2"
            onChange={(e) => updateStatus(order.id, e.target.value as OrderStatus)}
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </GlassCard>
      ))}
    </div>
  );
}
