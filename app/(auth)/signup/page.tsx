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

export default function SignupPage() {
  const t = useTranslations("signup");
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Wachtwoorden komen niet overeen");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Wachtwoord moet minimaal 6 karakters lang zijn");
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-6">
        <GlassCard className="w-full max-w-md space-y-4 p-7 text-center">
          <h1 className="text-2xl font-semibold text-forest-deep">
            Registratie succesvol!
          </h1>
          <p className="text-sm text-forest-deep/80">
            Controleer je e-mail om je account te bevestigen.
          </p>
          <Button
            className="w-full"
            onClick={() => router.push("/login")}
          >
            Naar login
          </Button>
        </GlassCard>
      </main>
    );
  }

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
              <Input
                type="password"
                placeholder={t("confirmPassword")}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {error ? (
                <p className="text-sm text-red-700">{error}</p>
              ) : null}
              <Button className="w-full" disabled={loading} type="submit">
                {t("submit")}
              </Button>
            </form>
            <p className="text-center text-sm text-forest-deep/70">
              {t("hasAccount")}{" "}
              <span
                className="cursor-pointer text-forest-deep hover:underline"
                onClick={() => router.push("/login")}
              >
                {t("login")}
              </span>
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </main>
  );
}
