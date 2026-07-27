"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    async function trackVisit() {
      const hasVisited = sessionStorage.getItem("ufpi_avisa_visited");

      if (!hasVisited) {
        // Primeira visita nesta sessão — incrementar
        try {
          const res = await fetch("/api/visitors", { method: "POST" });
          const data = await res.json();
          setCount(data.count);
          sessionStorage.setItem("ufpi_avisa_visited", "true");
        } catch {
          // Fallback: apenas ler
          try {
            const res = await fetch("/api/visitors");
            const data = await res.json();
            setCount(data.count);
          } catch {
            setCount(null);
          }
        }
      } else {
        // Já visitou nesta sessão — apenas ler
        try {
          const res = await fetch("/api/visitors");
          const data = await res.json();
          setCount(data.count);
        } catch {
          setCount(null);
        }
      }
    }

    trackVisit();
  }, []);

  if (count === null) return null;

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 text-white/60 text-xs font-medium">
      <Eye className="w-3.5 h-3.5" />
      <span>
        <span className="text-white/90 font-bold tabular-nums">
          {count.toLocaleString("pt-BR")}
        </span>{" "}
        {count === 1 ? "visitante" : "visitantes"}
      </span>
    </div>
  );
}
