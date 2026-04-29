import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getLocale } from "@/lib/i18n";
import { ProductCard } from "@/components/product-card";
import { LanguageSwitcher } from "@/components/language-switcher";
import { CartBadge } from "@/components/cart-badge";
import type { Product } from "@/lib/types";
import { DashboardFilters } from "@/components/dashboard-filters";

export default async function DashboardPage({
  searchParams
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const supabase = await createClient();
  const locale = await getLocale();
  const params = await searchParams;
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: productsData, error: productsError } = await supabase
    .from("products")
    .select(
      "id,name_nl,name_en,description_nl,description_en,unit,min_order_qty,price_per_unit,category,image_url,is_active"
    )
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  const products = (productsData ?? []) as Product[];
  const categories = Array.from(new Set(products.map((product) => product.category)));
  const activeCategory = params.category;
  const filteredProducts = activeCategory
    ? products.filter((product) => product.category === activeCategory)
    : products;

  return (
    <main className="min-h-screen p-4 md:p-6">
      <header className="glass-surface sticky top-3 z-10 mb-6 flex items-center justify-between rounded-glass p-4 shadow-glass">
        <p className="text-sm font-semibold tracking-[0.2em] text-forest-deep">VAN EGMOND</p>
        <LanguageSwitcher locale={locale} />
        <CartBadge />
      </header>
      <section className="mb-6 text-white">
        <h1 className="text-2xl font-semibold">
          {locale === "en" ? "Welcome" : "Welkom"}, {user.email}
        </h1>
        <DashboardFilters categories={categories} />
      </section>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {productsError ? (
          <div className="col-span-full rounded-glass border border-red-200 bg-red-50/90 p-4 text-red-900">
            {locale === "en"
              ? "Products could not be loaded. Please try again."
              : "Producten konden niet worden geladen. Probeer opnieuw."}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="col-span-full rounded-glass border border-white/40 bg-white/20 p-4 text-white">
            {locale === "en"
              ? "No products found for this category."
              : "Geen producten gevonden voor deze categorie."}
          </div>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              locale={locale}
              addLabel={locale === "en" ? "Add to order" : "Toevoegen aan bestelling"}
              minimumLabel={locale === "en" ? "Minimum order" : "Minimale afname"}
              priceOnRequestLabel={locale === "en" ? "Price on request" : "Prijs op aanvraag"}
            />
          ))
        )}
      </section>
    </main>
  );
}
