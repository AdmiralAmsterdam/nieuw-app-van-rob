"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GlassCard } from "@/components/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/lib/store/cart-store";
import { createClient } from "@/lib/supabase/client";

export default function CartPage() {
  const router = useRouter();
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.total());
  const clear = useCartStore((state) => state.clear);

  const placeOrder = async () => {
    if (!items.length) return;
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({ profile_id: user.id, status: "pending", total_amount: total, notes })
      .select("id")
      .single();

    if (orderError || !order) {
      setLoading(false);
      setError("Bestelling kon niet worden aangemaakt.");
      return;
    }

    const payload = items.map((item) => ({
      order_id: order.id,
      product_id: item.productId,
      quantity: item.quantity,
      unit_price: item.pricePerUnit ?? 0,
      subtotal: (item.pricePerUnit ?? 0) * item.quantity
    }));

    const { error: itemsError } = await supabase.from("order_items").insert(payload);
    if (itemsError) {
      setLoading(false);
      setError("Bestelregels konden niet worden opgeslagen.");
      return;
    }

    clear();
    router.push("/orders?success=1");
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl p-6">
      <GlassCard className="p-5 text-forest-deep">
        <h1 className="text-2xl font-semibold">Winkelwagen</h1>
        {!items.length ? (
          <div className="mt-4 rounded-2xl border border-white/50 bg-white/50 p-4">
            Je winkelwagen is nog leeg. Voeg producten toe via het dashboard.
          </div>
        ) : null}
        <div className="mt-4 space-y-3">
          {items.map((item) => (
            <div key={item.productId} className="flex items-center justify-between">
              <p>
                {item.name} ({item.quantity} {item.unit})
              </p>
              <p>EUR {((item.pricePerUnit ?? 0) * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <Input
          className="mt-4"
          placeholder="Opmerkingen bij bestelling"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}
        <div className="mt-6 flex items-center justify-between">
          <strong>Totaal: EUR {total.toFixed(2)}</strong>
          <Button onClick={placeOrder} disabled={loading || !items.length}>
            Bestelling plaatsen
          </Button>
        </div>
      </GlassCard>
    </main>
  );
}
