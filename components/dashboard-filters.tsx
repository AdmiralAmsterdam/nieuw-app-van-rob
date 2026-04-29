"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function DashboardFilters({ categories }: { categories: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get("category") ?? "all";

  const setCategory = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      <button
        onClick={() => setCategory("all")}
        className={`rounded-full border px-4 py-1 text-sm ${
          active === "all"
            ? "border-earth-gold bg-earth-gold/30"
            : "border-white/40 bg-white/25"
        }`}
      >
        Alle
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setCategory(category)}
          className={`rounded-full border px-4 py-1 text-sm ${
            active === category
              ? "border-earth-gold bg-earth-gold/30"
              : "border-white/40 bg-white/25"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
