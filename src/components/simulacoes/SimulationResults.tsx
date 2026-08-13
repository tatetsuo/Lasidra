"use client";

import { useState, useEffect } from "react";
import { X, Gauge, Waves, CloudRain, ShieldAlert, ArrowUp, Info, Play, Image as ImageIcon, MapPin, Target } from "lucide-react";

interface SimulationResultsProps {
  group: any[];
  onClose: () => void;
}

function getYouTubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export default function SimulationResults({
  group,
  onClose,
}: SimulationResultsProps) {
  const isDrenagem = group && group.length > 0 && group[0].type === 'drenagem';

  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    return isDrenagem ? group[0].return_period_tag || "Geral" : "Geral";
  });

  const simsInCategory = isDrenagem 
    ? group.filter(s => (s.return_period_tag || "Geral") === selectedCategory)
    : group;

  const [selectedSimId, setSelectedSimId] = useState<string>(() => {
    return simsInCategory[0]?.id;
  });

  useEffect(() => {
    if (simsInCategory.length > 0 && !simsInCategory.find(s => s.id === selectedSimId)) {
      setSelectedSimId(simsInCategory[0].id);
    }
  }, [selectedCategory, simsInCategory]);

  const sim = group.find(s => s.id === selectedSimId) || group[0];

  const uniqueCategories = isDrenagem
    ? Array.from(new Set(group.map(s => s.return_period_tag || "Geral")))
    : [];


  const barragemCards = [
    {
      id: "ruptura",
      title: "Tipo de Ruptura",
      icon: ShieldAlert,
      value: sim.rupture_type,
      color: "#DC2626",
      bgColor: "rgba(220, 38, 38, 0.06)",
    },
    {
      id: "alcance",
      title: "Alcance Máx. da Lâmina",
      icon: Target,
      value: sim.water_reach,
      color: "#8B5CF6",
      bgColor: "rgba(139, 92, 246, 0.06)",
    },
    {
      id: "velocidade_profundidade",
      title: "Velocidade / Profundidade",
      icon: Waves,
      value: `${sim.water_velocity || '-'} / ${sim.water_depth || '-'}`,
      color: "#2563EB",
      bgColor: "rgba(37, 99, 235, 0.06)",
    },
    {
      id: "forca",
      title: "Força de Chegada (Vel x Prof)",
      icon: Gauge,
      value: sim.arrival_force,
      color: "#16A34A",
      bgColor: "rgba(22, 163, 74, 0.06)",
    },
  ];

  const drenagemCards = [
    {
      id: "volume",
      title: "Volume da Chuva",
      icon: Waves,
      value: sim.rain_volume,
      color: "#EA580C",
      bgColor: "rgba(234, 88, 12, 0.06)",
    },
    {
      id: "intensidade",
      title: "Intensidade da Chuva",
      icon: CloudRain,
      value: sim.rain_intensity,
      color: "#2563EB",
      bgColor: "rgba(37, 99, 235, 0.06)",
    },
    {
      id: "duracao",
      title: "Duração da Chuva",
      icon: Gauge,
      value: sim.rain_duration,
      color: "#8B5CF6",
      bgColor: "rgba(139, 92, 246, 0.06)",
    },
  ];

  const activeCards = isDrenagem ? drenagemCards : barragemCards;

  const youtubeId = sim.media_url ? getYouTubeId(sim.media_url) : null;
  const isImage = sim.media_url ? sim.media_url.match(/\.(jpeg|jpg|gif|png)$/i) != null : false;

  return (
    <div className="animate-fade-in-up">
      {/* Header */}
      <div className="bg-white border border-border-light rounded-2xl shadow-md mb-6 overflow-hidden">
        <div className={`h-1 ${isDrenagem ? 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600' : 'bg-gradient-to-r from-red-500 via-red-600 to-red-800'}`} />
        <div className="px-6 py-5 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0 ${isDrenagem ? 'bg-yellow-500' : 'bg-red-600'}`}>
              {isDrenagem ? '🌧️' : '🚧'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-text-primary">
                  {sim.dam_name ? sim.dam_name : "Ponto de Simulação Customizado"}
                </h3>
                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${isDrenagem ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                  {isDrenagem ? 'Drenagem' : 'Barragem'}
                </span>
                {isDrenagem && sim.return_period_tag && (
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-blue-100 text-blue-800">
                    {sim.return_period_tag}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                <span className="text-xs text-text-muted flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {sim.latitude.toFixed(4)}, {sim.longitude.toFixed(4)}
                </span>
                <span className="text-xs text-text-muted">
                  📅 Inserido em: {new Date(sim.created_at).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-bg-secondary hover:bg-bg-tertiary text-text-secondary text-sm font-medium transition-all duration-200 border border-border-light"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              Voltar ao Mapa
            </button>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-alert-red/10 text-text-muted hover:text-alert-red transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {isDrenagem && uniqueCategories.length > 0 && (
        <div className="mb-6 p-5 bg-white border border-border-light rounded-2xl shadow-sm">
          <h4 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
            1. Escolha a Categoria de Retorno
          </h4>
          <div className="flex flex-wrap gap-2 mb-4">
            {uniqueCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === cat 
                    ? 'bg-yellow-500 text-white shadow-md' 
                    : 'bg-bg-secondary border border-border-light text-text-secondary hover:bg-bg-tertiary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          {simsInCategory.length > 1 && (
            <>
              <h4 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3 mt-5 border-t border-border-light pt-5">
                2. Filtre por Duração e Intensidade
              </h4>
              <div className="flex flex-wrap gap-2">
                {simsInCategory.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSimId(s.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedSimId === s.id 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'bg-bg-secondary border border-border-light text-text-secondary hover:bg-bg-tertiary'
                    }`}
                  >
                    ⏱️ {s.rain_duration} | 🌧️ {s.rain_intensity}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Grid para Dados Principais */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 ${!isDrenagem ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-5 mb-6`}>
        {activeCards.map((card, index) => (
          <div
            key={card.id}
            className="bg-white rounded-xl border border-border-light shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group flex flex-col"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Ícone */}
            <div className="w-full h-12 flex items-center px-4" style={{ background: card.bgColor }}>
               <card.icon className="w-5 h-5 mr-2" style={{ color: card.color }} />
               <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">
                 {card.title}
               </p>
            </div>
            
            {/* Texto */}
            <div className="p-5 flex-1 flex flex-col justify-center">
              <h4 className="text-xl sm:text-2xl font-bold text-gray-900 break-words">
                {card.value || '-'}
              </h4>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Aba de Outros */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 h-full">
          <h4 className="text-md font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Info className="w-5 h-5 text-secondary" />
            Outras Informações / Observações
          </h4>
          <p className="text-gray-700 whitespace-pre-line text-sm leading-relaxed">
            {sim.others && sim.others.trim() !== "" ? sim.others : "Nenhuma observação adicional fornecida."}
          </p>
        </div>

        {/* Media Player */}
        {sim.media_url && (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 h-full flex flex-col">
            <h4 className="text-md font-bold text-gray-900 mb-3 flex items-center gap-2">
              {youtubeId ? <Play className="w-5 h-5 text-red-600" /> : <ImageIcon className="w-5 h-5 text-purple-600" />}
              Mídia Anexada
            </h4>
            <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center relative min-h-[200px]">
              {youtubeId ? (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${youtubeId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : isImage ? (
                <img
                  src={sim.media_url}
                  alt="Simulação"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-4">
                  <p className="text-sm text-gray-600 mb-2">Um link de arquivo foi anexado a esta simulação.</p>
                  <a
                    href={sim.media_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-purple-100 text-purple-700 font-medium rounded-md hover:bg-purple-200"
                  >
                    Abrir Link Externo
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
