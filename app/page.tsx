"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { GlassCard } from "@/components/glass-card";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push("/login"), 2000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden p-6">
      <div className="absolute h-80 w-80 animate-blob rounded-full bg-earth-gold/30 blur-3xl" />
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
        <GlassCard className="px-10 py-8 text-center text-forest-deep">
          <p className="text-xs uppercase tracking-[0.3em]">VAN EGMOND</p>
          <h1 className="mt-2 text-4xl font-semibold">Potgrond B.V.</h1>
          <p className="mt-3 text-sm">Professionele bestelomgeving</p>
        </GlassCard>
      </motion.div>
    </main>
  );
}
