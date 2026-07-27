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
    <section className="py-16 sm:py-20 bg-bg-secondary" id="map-preview-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-secondary bg-secondary-50 px-3 py-1 rounded-full mb-4">
            <Monitor className="w-3.5 h-3.5" />
            Painel Interativo
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary">
            Monitoramento de Áreas Inundadas
          </h2>
        </div>

        {/* Dashboard panel */}
        <div className="relative max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-border-light">
            {/* Panel header bar */}
            <div className="bg-primary px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-alert-red/80" />
                  <span className="w-3 h-3 rounded-full bg-secondary/80" />
                  <span className="w-3 h-3 rounded-full bg-alert-green/80" />
                </div>
                <span className="text-white/60 text-xs ml-3 font-medium">
                  UFPI !AVISA! — Painel de Monitoramento
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-alert-green animate-pulse" />
                <span className="text-white/50 text-xs">Online</span>
              </div>
            </div>

            {/* Panel content */}
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
                {/* Left — Text & CTA */}
                <div className="lg:col-span-2 space-y-5 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-primary">
                    <MapPin className="w-5 h-5" />
                    <span className="text-sm font-semibold uppercase tracking-wider">
                      Navegação Geográfica
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-text-primary leading-snug">
                    Selecione um município para visualizar áreas inundadas
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    Explore o mapa interativo para acessar simulações de
                    inundação, cenários de ruptura de barragens e dados de macro
                    drenagem em todo o estado do Piauí.
                  </p>
                  <Link
                    href="/simulacoes"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-light text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-sm hover:-translate-y-0.5 group w-fit"
                    id="map-preview-cta"
                  >
                    Explorar Simulações
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

                {/* Right — Interactive Map */}
                <div className="lg:col-span-3 relative">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-bg-tertiary shadow-inner border border-border-light">
                    <PiauiMap />
                  </div>

                  {/* Stats badges */}
                  <div className="absolute -bottom-4 left-4 right-4 flex justify-center gap-3">
                    <div className="bg-white rounded-lg shadow-md px-4 py-2 flex items-center gap-2 border border-border-light">
                      <span className="w-2 h-2 rounded-full bg-alert-red" />
                      <span className="text-xs font-medium text-text-secondary">
                        6 Barragens
                      </span>
                    </div>
                    <div className="bg-white rounded-lg shadow-md px-4 py-2 flex items-center gap-2 border border-border-light">
                      <span className="w-2 h-2 rounded-full bg-alert-blue" />
                      <span className="text-xs font-medium text-text-secondary">
                        3 Drenagens
                      </span>
                    </div>
                    <div className="hidden sm:flex bg-white rounded-lg shadow-md px-4 py-2 items-center gap-2 border border-border-light">
                      <span className="w-2 h-2 rounded-full bg-alert-green" />
                      <span className="text-xs font-medium text-text-secondary">
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
