"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { FlaskConical, Loader2 } from "lucide-react";
import SimulationResults from "@/components/simulacoes/SimulationResults";

/* Importação dinâmica — Leaflet não funciona com SSR */
const SimulationMap = dynamic(
  () => import("@/components/simulacoes/SimulationMap"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full bg-bg-tertiary">
        <div className="flex flex-col items-center gap-3 text-text-muted">
          <Loader2 className="w-8 h-8 animate-spin text-primary/40" />
          <span className="text-sm font-medium">Carregando mapa…</span>
        </div>
      </div>
    ),
  }
);

export default function SimulacoesPage() {
  const [selectedSimulationGroup, setSelectedSimulationGroup] = useState<any[] | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleSelectSimulation = (group: any[]) => {
    setSelectedSimulationGroup(group);
    // Scroll to results after a brief delay for the animation
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 150);
  };

  const handleClose = () => {
    setSelectedSimulationGroup(null);
    // Scroll back to map
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Hero reduzido — barra fina */}
      <section className="bg-primary py-5 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 shrink-0">
            <FlaskConical className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Simulações
            </h1>
            <p className="text-white/50 text-xs sm:text-sm">
              Clique em um ponto de simulação no mapa para visualizar os resultados detalhados
            </p>
          </div>
        </div>
      </section>

      {/* Map section */}
      <section className="bg-bg-secondary">
        <div
          className={`transition-all duration-500 ease-in-out ${
            selectedSimulation ? "h-[40vh]" : "h-[70vh]"
          }`}
        >
          <SimulationMap
            onSelectSimulation={handleSelectSimulation}
            selectedSimulationId={selectedSimulationGroup?.[0]?.id}
          />
        </div>
      </section>

      {/* Simulation results */}
      {selectedSimulationGroup && (
        <section
          ref={resultsRef}
          className="py-8 sm:py-10 bg-bg-secondary"
          id="simulation-results-section"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <SimulationResults group={selectedSimulationGroup} onClose={handleClose} />
          </div>
        </section>
      )}

      {/* Empty state — when no simulation selected */}
      {!selectedSimulationGroup && (
        <section className="py-10 bg-bg-secondary">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <div className="bg-white rounded-xl border border-border-light shadow-sm p-8">
              <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
                <FlaskConical className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">
                Selecione uma simulação
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                Clique em um dos pontos no mapa acima para visualizar
                os cenários de simulação cadastrados pelo administrador.
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
