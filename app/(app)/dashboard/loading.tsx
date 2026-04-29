import { GlassCard } from "@/components/glass-card";

export default function DashboardLoading() {
  return (
    <main className="min-h-screen p-4 md:p-6">
      <div className="glass-surface mb-6 h-16 animate-pulse rounded-glass" />
      <div className="mb-6 h-8 w-56 animate-pulse rounded-xl bg-white/30" />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <GlassCard key={idx} className="overflow-hidden">
            <div className="h-48 animate-pulse bg-white/40" />
            <div className="space-y-3 p-4">
              <div className="h-5 w-2/3 animate-pulse rounded bg-white/50" />
              <div className="h-4 w-full animate-pulse rounded bg-white/40" />
              <div className="h-10 w-full animate-pulse rounded-2xl bg-white/50" />
            </div>
          </GlassCard>
        ))}
      </section>
    </main>
  );
}
