import type { OrderStatus } from "@/lib/types";

const steps: OrderStatus[] = [
  "pending",
  "confirmed",
  "in_production",
  "shipped",
  "delivered"
];

const labels: Record<OrderStatus, string> = {
  pending: "Ontvangen",
  confirmed: "Bevestigd",
  in_production: "In productie",
  shipped: "Verzonden",
  delivered: "Geleverd"
};

export function OrderStatusBar({ status }: { status: OrderStatus }) {
  const currentIndex = steps.indexOf(status);

  return (
    <div className="space-y-2">
      <div className="h-2 overflow-hidden rounded-full bg-white/40">
        <div
          className="h-full bg-earth-gold transition-all"
          style={{ width: `${((currentIndex + 1) / steps.length) * 100}%` }}
        />
      </div>
      <div className="flex justify-between text-[11px] text-forest-deep/80">
        {steps.map((step) => (
          <span key={step}>{labels[step]}</span>
        ))}
      </div>
    </div>
  );
}
