"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export function AdminUsers() {
  const t = useTranslations("admin");
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setUsers(data.users || []);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Fout bij laden van gebruikers");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="text-white">Laden...</div>;
  }

  if (error) {
    return <div className="text-red-400">{error}</div>;
  }

  if (users.length === 0) {
    return <div className="text-white/70">Nog geen gebruikers geregistreerd.</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white">Gebruikers</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-white/20">
              <th className="px-4 py-2 text-left text-sm font-medium text-white/80">
                E-mail
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-white/80">
                Rol
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-white/80">
                Aangemaakt op
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-white/80">
                Laatst bijgewerkt
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => (
              <tr
                key={user.id}
                className="border-b border-white/10 hover:bg-white/5"
              >
                <td className="px-4 py-3 text-sm text-white">
                  {user.email || "-"}
                </td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                      user.role === "admin"
                        ? "bg-green-500/20 text-green-300"
                        : "bg-blue-500/20 text-blue-300"
                    }`}
                  >
                    {user.role || "user"}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-white/70">
                  {user.created_at
                    ? new Date(user.created_at).toLocaleDateString("nl-NL")
                    : "-"}
                </td>
                <td className="px-4 py-3 text-sm text-white/70">
                  {user.updated_at
                    ? new Date(user.updated_at).toLocaleDateString("nl-NL")
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
