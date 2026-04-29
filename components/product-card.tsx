"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/glass-card";
import type { Product, Locale } from "@/lib/types";
import { useState } from "react";
import { useCartStore } from "@/lib/store/cart-store";
import Image from "next/image";

export function ProductCard({
  product,
  locale,
  addLabel,
  minimumLabel,
  priceOnRequestLabel
}: {
  product: Product;
  locale: Locale;
  addLabel: string;
  minimumLabel: string;
  priceOnRequestLabel: string;
}) {
  const [quantity, setQuantity] = useState(product.min_order_qty);
  const addItem = useCartStore((state) => state.addItem);

  const title = locale === "en" ? product.name_en : product.name_nl;
  const description = locale === "en" ? product.description_en : product.description_nl;

  return (
    <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ duration: 0.2 }}>
      <GlassCard className="overflow-hidden">
        <Image
          src={product.image_url}
          alt={title}
          width={900}
          height={600}
          className="h-48 w-full object-cover"
        />
        <div className="space-y-3 p-4 text-forest-deep">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-forest-deep/80">{description}</p>
          <div className="text-sm">
            <p>
              {minimumLabel}: <strong>{product.min_order_qty}</strong> {product.unit}
            </p>
            <p>
              {product.price_per_unit === null
                ? priceOnRequestLabel
                : `EUR ${product.price_per_unit.toFixed(2)} / ${product.unit}`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
              -
            </Button>
            <span className="min-w-10 text-center font-medium">{quantity}</span>
            <Button size="sm" variant="ghost" onClick={() => setQuantity(quantity + 1)}>
              +
            </Button>
          </div>
          <Button
            className="w-full"
            onClick={() =>
              addItem({
                productId: product.id,
                name: title,
                unit: product.unit,
                pricePerUnit: product.price_per_unit,
                quantity
              })
            }
          >
            {addLabel}
          </Button>
        </div>
      </GlassCard>
    </motion.div>
  );
}
