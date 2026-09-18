"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { Droplets, Loader2, MapPin } from "lucide-react";
import SimulationResults from "@/components/simulacoes/SimulationResults";
import AgreementModal from "@/components/simulacoes/AgreementModal";

const SimulationMap = dynamic(
  () => import("@/components/simulacoes/SimulationMap"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full bg-bg-secondary dark:bg-slate-900">
        <div className="flex flex-col items-center gap-3 text-text-muted dark:text-gray-400">
          <Loader2 className="w-7 h-7 animate-spin text-primary/30 dark:text-blue-500/30" />
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
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <AgreementModal
        isOpen={showModal}
        onAccept={handleAcceptTerms}
        onDecline={handleDeclineTerms}
      />

      {/* Hero — barra compacta e clean */}
      <section className="bg-[#002244] dark:bg-slate-950 border-b border-white/8 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 flex items-center gap-4">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/8 shrink-0">
            <Droplets className="w-4.5 h-4.5 text-secondary" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-white font-display">
              Simulações
            </h1>
            <p className="text-white/45 text-xs sm:text-sm mt-0.5">
              Clique em um ponto de simulação no mapa para visualizar os resultados
            </p>
          </div>
        </div>
      </section>

      {/* Mapa */}
      <section className="bg-bg-secondary dark:bg-slate-900 transition-colors duration-300">
        <div
          className={`transition-all duration-500 ease-in-out ${
            selectedSimulationGroup ? "h-[38vh]" : "h-[68vh]"
          }`}
        >
          <SimulationMap
            onSelectSimulation={handleSelectSimulation}
            selectedSimulationId={selectedSimulationGroup?.[0]?.id}
          />
        </div>
      </section>

      {/* Resultados */}
      {selectedSimulationGroup && (
        <section
          ref={resultsRef}
          className="py-8 sm:py-12 bg-bg-secondary dark:bg-slate-900 transition-colors duration-300"
          id="simulation-results-section"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <SimulationResults group={selectedSimulationGroup} onClose={handleClose} />
          </div>
        </section>
      )}

      {/* Empty state — nenhuma simulação selecionada */}
      {!selectedSimulationGroup && (
        <section className="py-16 bg-bg-secondary dark:bg-slate-900 transition-colors duration-300 flex-1">
          <div className="max-w-md mx-auto px-4 text-center">
            <div className="w-14 h-14 rounded-xl bg-primary/8 dark:bg-primary/20 flex items-center justify-center mx-auto mb-5 border border-primary/10 dark:border-primary/30">
              <MapPin className="w-6 h-6 text-primary dark:text-blue-400" />
            </div>
            <h3 className="text-base font-semibold text-text-primary dark:text-white mb-2">
              Nenhuma simulação selecionada
            </h3>
            <p className="text-sm text-text-muted dark:text-slate-500 leading-relaxed">
              Clique em um dos pontos coloridos no mapa acima para visualizar os cenários de simulação.
            </p>
            <div className="mt-8 flex items-center justify-center gap-6 text-xs text-text-muted dark:text-slate-600">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-alert-red shrink-0" />
                Barragem
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-yellow-400 shrink-0" />
                Drenagem
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
