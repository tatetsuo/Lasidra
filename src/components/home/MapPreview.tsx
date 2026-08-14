"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { MapPin, ArrowRight, Monitor, Loader2 } from "lucide-react";

/* Importação dinâmica — Leaflet não funciona com SSR */
const PiauiMap = dynamic(() => import("@/components/map/PiauiMap"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-bg-tertiary rounded-xl">
      <div className="flex flex-col items-center gap-3 text-text-muted">
        <Loader2 className="w-8 h-8 animate-spin text-primary/40" />
        <span className="text-sm font-medium">Carregando mapa…</span>
      </div>
    </div>
  ),
});

export default function MapPreview() {
  return (
    <section className="py-16 sm:py-24 bg-bg-secondary dark:bg-slate-900 transition-colors duration-500" id="map-preview-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-secondary dark:text-alert-blue bg-secondary-50 dark:bg-blue-900/30 px-4 py-1.5 rounded-full mb-4">
            <Monitor className="w-4 h-4" />
            Painel Interativo
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-primary dark:text-white tracking-tight">
            Monitoramento de Áreas Inundadas
          </h2>
        </div>

        {/* Dashboard panel */}
        <div className="relative max-w-5xl mx-auto">
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl dark:shadow-2xl overflow-hidden border border-border-light dark:border-slate-700 transition-colors duration-500">
            {/* Panel header bar */}
            <div className="bg-primary dark:bg-slate-950 px-6 py-4 flex items-center justify-between border-b border-primary-light/20 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-alert-red/80 shadow-sm" />
                  <span className="w-3.5 h-3.5 rounded-full bg-secondary/80 shadow-sm" />
                  <span className="w-3.5 h-3.5 rounded-full bg-alert-green/80 shadow-sm" />
                </div>
                <span className="text-white/70 dark:text-gray-400 text-xs sm:text-sm font-semibold tracking-wide ml-3">
                  UFPI !AVISA! — Painel de Monitoramento
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-2 bg-black/20 px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-alert-green animate-pulse" />
                <span className="text-white/70 text-xs font-bold">Online</span>
              </div>
            </div>

            {/* Panel content */}
            <div className="p-6 sm:p-8 lg:p-12 bg-white dark:bg-slate-800">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-stretch">
                {/* Left — Text & CTA */}
                <div className="lg:col-span-2 space-y-6 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-primary dark:text-blue-400">
                    <MapPin className="w-6 h-6" />
                    <span className="text-sm font-black uppercase tracking-widest">
                      Navegação Geográfica
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-text-primary dark:text-white leading-tight">
                    Selecione um município para visualizar áreas inundadas
                  </h3>
                  <p className="text-text-secondary dark:text-gray-400 text-base leading-relaxed font-medium">
                    Explore o mapa interativo para acessar simulações de
                    inundação, cenários de ruptura de barragens e dados de macro
                    drenagem em todo o estado do Piauí.
                  </p>
                  <Link
                    href="/simulacoes"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary hover:bg-primary-light dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm hover:-translate-y-1 group w-fit mt-2"
                    id="map-preview-cta"
                  >
                    Explorar Simulações
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

                {/* Right — Interactive Map */}
                <div className="lg:col-span-3 relative">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-bg-tertiary dark:bg-slate-700 shadow-inner border border-border-light dark:border-slate-600">
                    <PiauiMap />
                  </div>

                  {/* Stats badges */}
                  <div className="absolute -bottom-5 left-4 right-4 flex justify-center gap-3 sm:gap-4 flex-wrap">
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg px-5 py-3 flex items-center gap-3 border border-border-light dark:border-slate-700">
                      <span className="w-2.5 h-2.5 rounded-full bg-alert-red shadow-sm" />
                      <span className="text-xs sm:text-sm font-bold text-text-primary dark:text-white">
                        6 Barragens
                      </span>
                    </div>
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg px-5 py-3 flex items-center gap-3 border border-border-light dark:border-slate-700">
                      <span className="w-2.5 h-2.5 rounded-full bg-alert-blue shadow-sm" />
                      <span className="text-xs sm:text-sm font-bold text-text-primary dark:text-white">
                        3 Drenagens
                      </span>
                    </div>
                    <div className="hidden sm:flex bg-white dark:bg-slate-900 rounded-xl shadow-lg px-5 py-3 items-center gap-3 border border-border-light dark:border-slate-700">
                      <span className="w-2.5 h-2.5 rounded-full bg-alert-green shadow-sm" />
                      <span className="text-xs sm:text-sm font-bold text-text-primary dark:text-white">
                        224 Municípios
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
