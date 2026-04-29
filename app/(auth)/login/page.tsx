"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { GlassCard } from "@/components/glass-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/language-switcher";

export default function LoginPage() {
  const t = useTranslations("login");
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="ml-auto">
        <LanguageSwitcher locale="nl" />
      </div>
      <div className="flex flex-1 items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <GlassCard className="space-y-5 p-7 text-forest-deep">
            <div className="space-y-1 text-center">
              <p className="text-xs uppercase tracking-[0.3em]">VAN EGMOND</p>
              <h1 className="text-2xl font-semibold">{t("title")}</h1>
              <p className="text-sm text-forest-deep/80">{t("subtitle")}</p>
            </div>
            <form className="space-y-3" onSubmit={onSubmit}>
              <Input
                type="email"
                placeholder={t("email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder={t("password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error ? <p className="text-sm text-red-700">{error}</p> : null}
              <Button className="w-full" disabled={loading} type="submit">
                {t("submit")}
              </Button>
            </form>
            <p className="text-center text-sm text-forest-deep/70">{t("forgot")}</p>
          </GlassCard>
        </motion.div>
      </div>
    </main>
  );
}
