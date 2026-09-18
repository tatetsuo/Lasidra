"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { getSimulationsCount } from "@/actions/reports";
import { ArrowRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { barragens } from "@/data/barragens";

const PiauiMap = dynamic(() => import("@/components/map/PiauiMap"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-bg-tertiary dark:bg-slate-800 rounded-lg">
      <div className="flex flex-col items-center gap-2 text-text-muted">
        <Loader2 className="w-6 h-6 animate-spin text-primary/30" />
        <span className="text-xs font-medium">Carregando mapa…</span>
      </div>
    </div>
  ),
});

export default function MapPreview() {
  const [simulationsCount, setSimulationsCount] = useState(0);

  useEffect(() => {
    async function fetchCount() {
      try {
        const count = await getSimulationsCount();
        if (count !== null) setSimulationsCount(count);
      } catch (error) {
        console.error("Erro ao buscar contagem de simulações:", error);
      }
    }
    fetchCount();
  }, []);

  return (
    <section
      className="py-20 sm:py-28 bg-white dark:bg-slate-950 transition-colors duration-300"
      id="map-preview-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Cabeçalho de seção — editorial */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="section-divider" />
            <span className="eyebrow">Sistema Web GIS</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <h2 className="text-display-md text-text-primary dark:text-white">
              Mapa de Monitoramento
            </h2>
            <p className="text-text-secondary dark:text-slate-400 text-sm max-w-sm leading-relaxed">
              Explore as áreas monitoradas pelo Lasidra e visualize os detalhes de cada simulação hidrológica.
            </p>
          </div>
        </div>

        {/* Layout: texto + mapa */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">

          {/* Painel lateral — info + CTA */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-xl border border-border-light dark:border-slate-800 bg-bg-secondary dark:bg-slate-900">
              <h3 className="text-base font-semibold text-text-primary dark:text-white mb-2">
                Navegação Geográfica
              </h3>
              <p className="text-text-secondary dark:text-slate-400 text-sm leading-relaxed">
                Selecione um município para visualizar áreas inundadas, cenários de ruptura de barragens e dados de macro drenagem em todo o estado do Piauí.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl border border-border-light dark:border-slate-800 bg-bg-secondary dark:bg-slate-900">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-alert-red" />
                  <span className="text-xs text-text-muted dark:text-slate-500 uppercase tracking-wider font-medium">Barragens</span>
                </div>
                <p className="text-2xl font-bold text-text-primary dark:text-white font-display">
                  {barragens.length}
                </p>
              </div>
              <div className="p-4 rounded-xl border border-border-light dark:border-slate-800 bg-bg-secondary dark:bg-slate-900">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-alert-blue" />
                  <span className="text-xs text-text-muted dark:text-slate-500 uppercase tracking-wider font-medium">Simulações</span>
                </div>
                <p className="text-2xl font-bold text-text-primary dark:text-white font-display">
                  {simulationsCount}
                </p>
              </div>
            </div>

            <Link
              href="/simulacoes"
              className="group inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-light dark:bg-slate-800 dark:hover:bg-slate-700 text-white dark:text-white font-medium rounded-lg text-sm transition-all duration-200 w-full justify-center border border-transparent dark:border-slate-700"
              id="map-preview-cta"
            >
              Abrir Painel Completo
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mapa */}
          <div className="lg:col-span-3">
            <div className="relative rounded-xl overflow-hidden border border-border-light dark:border-slate-800 shadow-lg dark:shadow-none bg-white dark:bg-slate-900" style={{ aspectRatio: "4/3" }}>
              {/* Barra superior do mapa */}
              <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-2.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b border-border-light dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted dark:text-slate-500">
                  Piauí · WGS 84
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-alert-green animate-pulse" />
                  <span className="text-[10px] text-text-muted dark:text-slate-500 font-medium">ao vivo</span>
                </div>
              </div>
              <div className="pt-9 h-full">
                <PiauiMap />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
