"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCartStore } from "@/lib/store/cart-store";

export function CartBadge() {
  const count = useCartStore((state) => state.count());

  return (
    <Link href="/cart" className="relative inline-flex rounded-full bg-white/30 p-2">
      <ShoppingCart className="h-5 w-5 text-white" />
      {count > 0 ? (
        <motion.span
          initial={{ scale: 0.7 }}
          animate={{ scale: 1 }}
          className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-earth-dark text-xs text-white"
        >
          {count}
        </motion.span>
      ) : null}
    </Link>
  );
}
