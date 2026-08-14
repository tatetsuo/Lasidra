"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { FlaskConical, Loader2 } from "lucide-react";
import SimulationResults from "@/components/simulacoes/SimulationResults";
import AgreementModal from "@/components/simulacoes/AgreementModal";

/* Importação dinâmica — Leaflet não funciona com SSR */
const SimulationMap = dynamic(
  () => import("@/components/simulacoes/SimulationMap"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full bg-bg-tertiary dark:bg-slate-800">
        <div className="flex flex-col items-center gap-3 text-text-muted dark:text-gray-400">
          <Loader2 className="w-8 h-8 animate-spin text-primary/40 dark:text-blue-500/40" />
          <span className="text-sm font-medium">Carregando mapa…</span>
        </div>
      </div>
    ),
  }
);

export default function SimulacoesPage() {
  const [selectedSimulationGroup, setSelectedSimulationGroup] = useState<any[] | null>(null);
  const [pendingGroup, setPendingGroup] = useState<any[] | null>(null);
  const [showModal, setShowModal] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleSelectSimulation = (group: any[]) => {
    // Verifica se já aceitou
    const hasAgreed = localStorage.getItem("lasidra_agreed_terms") === "true";
    if (hasAgreed) {
      proceedWithSimulation(group);
    } else {
      setPendingGroup(group);
      setShowModal(true);
    }
  };

  const proceedWithSimulation = (group: any[]) => {
    setSelectedSimulationGroup(group);
    // Scroll to results after a brief delay for the animation
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 150);
  };

  const handleAcceptTerms = () => {
    localStorage.setItem("lasidra_agreed_terms", "true");
    setShowModal(false);
    if (pendingGroup) {
      proceedWithSimulation(pendingGroup);
      setPendingGroup(null);
    }
  };

  const handleDeclineTerms = () => {
    setShowModal(false);
    setPendingGroup(null);
  };

  const handleClose = () => {
    setSelectedSimulationGroup(null);
    // Scroll back to map
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <AgreementModal 
        isOpen={showModal} 
        onAccept={handleAcceptTerms} 
        onDecline={handleDeclineTerms} 
      />

      {/* Hero reduzido — barra fina */}
      <section className="bg-primary dark:bg-slate-950 py-5 sm:py-6 transition-colors duration-500 border-b border-primary-light/10 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 shrink-0">
            <FlaskConical className="w-5 h-5 text-secondary dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Simulações
            </h1>
            <p className="text-white/60 text-xs sm:text-sm font-medium">
              Clique em um ponto de simulação no mapa para visualizar os resultados detalhados
            </p>
          </div>
        </div>
      </section>

      {/* Map section */}
      <section className="bg-bg-secondary dark:bg-slate-900 transition-colors duration-500">
        <div
          className={`transition-all duration-500 ease-in-out ${
            selectedSimulationGroup ? "h-[40vh]" : "h-[70vh]"
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
          className="py-8 sm:py-12 bg-bg-secondary dark:bg-slate-900 transition-colors duration-500"
          id="simulation-results-section"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <SimulationResults group={selectedSimulationGroup} onClose={handleClose} />
          </div>
        </section>
      )}

      {/* Empty state — when no simulation selected */}
      {!selectedSimulationGroup && (
        <section className="py-12 sm:py-16 bg-bg-secondary dark:bg-slate-900 transition-colors duration-500 flex-1 flex flex-col items-center justify-center">
          <div className="max-w-2xl mx-auto px-4 text-center w-full">
            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-border-light dark:border-slate-700 shadow-sm p-10 transition-colors duration-500">
              <div className="w-16 h-16 rounded-2xl bg-primary-50 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-5">
                <FlaskConical className="w-8 h-8 text-primary dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-text-primary dark:text-white mb-3">
                Selecione uma simulação
              </h3>
              <p className="text-text-muted dark:text-gray-400 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
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
