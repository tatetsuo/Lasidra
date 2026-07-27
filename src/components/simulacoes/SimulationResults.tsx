"use client";

import { X, Gauge, Waves, Clock, Map as MapIcon, ArrowUp } from "lucide-react";
import { type Dam, statusColor } from "@/data/barragens";

interface SimulationResultsProps {
  dam: Dam;
  onClose: () => void;
}

const simulationCards = [
  {
    id: "velocidade",
    title: "Velocidade",
    icon: Gauge,
    description:
      "Velocidade do fluxo de água em m/s durante cenário de ruptura.",
    color: "#DC2626",
    bgColor: "rgba(220, 38, 38, 0.06)",
  },
  {
    id: "profundidade",
    title: "Profundidade",
    icon: Waves,
    description:
      "Profundidade máxima da lâmina d'água em metros nas áreas atingidas.",
    color: "#2563EB",
    bgColor: "rgba(37, 99, 235, 0.06)",
  },
  {
    id: "tempo-chegada",
    title: "Tempo de Chegada",
    icon: Clock,
    description:
      "Tempo estimado em minutos para a onda de cheia atingir cada ponto.",
    color: "#EA580C",
    bgColor: "rgba(234, 88, 12, 0.06)",
  },
  {
    id: "mancha-inundacao",
    title: "Mancha de Inundação",
    icon: MapIcon,
    description:
      "Área total de inundação projetada com delimitação das zonas de autossalvamento.",
    color: "#16A34A",
    bgColor: "rgba(22, 163, 74, 0.06)",
  },
];

export default function SimulationResults({
  dam,
  onClose,
}: SimulationResultsProps) {
  return (
    <div className="animate-fade-in-up">
      {/* Header */}
      <div className="bg-white border border-border-light rounded-2xl shadow-md mb-6 overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-alert-red via-secondary to-alert-blue" />
        <div className="px-6 py-5 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-lg shrink-0">
              🏗️
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-text-primary">
                {dam.nome}
              </h3>
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                <span className="text-xs text-text-muted">
                  📍 {dam.municipio}
                </span>
                <span className="text-xs text-text-muted">
                  🌊 {dam.rio}
                </span>
                <span
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold"
                  style={{
                    color: statusColor(dam.status),
                    backgroundColor: `${statusColor(dam.status)}15`,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full inline-block"
                    style={{ background: statusColor(dam.status) }}
                  />
                  {dam.status}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-bg-secondary hover:bg-bg-tertiary text-text-secondary text-sm font-medium transition-all duration-200 border border-border-light"
              id="simulation-back-btn"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              Voltar ao Mapa
            </button>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-alert-red/10 text-text-muted hover:text-alert-red transition-colors"
              aria-label="Fechar simulações"
              id="simulation-close-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid 2x2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {simulationCards.map((card, index) => (
          <div
            key={card.id}
            className="bg-white rounded-xl border border-border-light shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
            id={`simulation-card-${card.id}`}
          >
            {/* Card color accent */}
            <div
              className="h-1"
              style={{ background: card.color }}
            />

            {/* Placeholder image area */}
            <div
              className="aspect-[16/9] flex items-center justify-center relative overflow-hidden"
              style={{ background: card.bgColor }}
            >
              {/* Grid pattern background */}
              <svg
                width="100%"
                height="100%"
                className="absolute inset-0 opacity-[0.08]"
              >
                <defs>
                  <pattern
                    id={`grid-${card.id}`}
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 20 0 L 0 0 0 20"
                      fill="none"
                      stroke={card.color}
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect
                  width="100%"
                  height="100%"
                  fill={`url(#grid-${card.id})`}
                />
              </svg>

              {/* Icon + text */}
              <div className="relative z-10 text-center px-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${card.color}15`,
                  }}
                >
                  <card.icon
                    className="w-7 h-7"
                    style={{ color: card.color }}
                  />
                </div>
                <p
                  className="text-sm font-semibold"
                  style={{ color: card.color }}
                >
                  Simulação em desenvolvimento
                </p>
                <p className="text-xs text-text-muted mt-1">
                  Dados serão adicionados pelo administrador
                </p>
              </div>
            </div>

            {/* Card footer */}
            <div className="px-5 py-4">
              <h4 className="text-sm font-bold text-text-primary mb-1">
                {card.title}
              </h4>
              <p className="text-xs text-text-muted leading-relaxed">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
