"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Gauge, Waves, CloudRain, ShieldAlert, ArrowUp, Info, Play, Image as ImageIcon, MapPin, Target, Columns, AlertTriangle, TrafficCone, Timer, Sun, Moon, ZoomIn, ZoomOut, Maximize, MousePointer2 } from "lucide-react";
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";

interface SimulationResultsProps {
  group: any[];
  onClose: () => void;
}

function getYouTubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

function getDamHazard(simulation: any) {
  if (!simulation) return null;
  const force = parseFloat(simulation.arrival_force) || 0;
  const depth = parseFloat(simulation.water_depth) || 0;

  if (force >= 2.0 || depth >= 1.5) return { level: 'Risco Extremo', color: 'bg-red-50 text-red-900 border-red-200', icon: <AlertTriangle className="w-5 h-5 text-red-600" />, message: 'Profundidade e força suficientes para arrastar veículos pesados e causar colapso estrutural em residências.' };
  if (force >= 1.0 || depth >= 0.5) return { level: 'Risco Alto', color: 'bg-orange-50 text-orange-900 border-orange-200', icon: <AlertTriangle className="w-5 h-5 text-orange-600" />, message: 'Arraste de veículos leves e pedestres. Inundação severa do primeiro pavimento.' };
  return { level: 'Risco Moderado', color: 'bg-yellow-50 text-yellow-900 border-yellow-200', icon: <Waves className="w-5 h-5 text-yellow-600" />, message: 'Água invade ruas e calçadas. Dificuldade de locomoção e possíveis danos a bens materiais.' };
}

function getDrainageHazard(simulation: any) {
  if (!simulation) return null;
  const intensity = parseFloat(simulation.rain_intensity) || 0;

  if (intensity >= 80) return { level: 'Alerta Vermelho', color: 'bg-red-50 text-red-900 border-red-200', icon: <AlertTriangle className="w-5 h-5 text-red-600" />, message: 'Enxurrada Extrema: Risco altíssimo de alagamentos súbitos e inundações relâmpago. Perigo à vida.' };
  if (intensity >= 40) return { level: 'Alerta Laranja', color: 'bg-orange-50 text-orange-900 border-orange-200', icon: <AlertTriangle className="w-5 h-5 text-orange-600" />, message: 'Chuva Intensa: Alagamentos severos em vias públicas. Trânsito paralisado e risco de danos materiais.' };
  return { level: 'Alerta Amarelo', color: 'bg-yellow-50 text-yellow-900 border-yellow-200', icon: <Waves className="w-5 h-5 text-yellow-600" />, message: 'Chuva Moderada: Possibilidade de acúmulo de água em pontos baixos e lentidão no trânsito.' };
}


const ZoomControls = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/80 backdrop-blur px-4 py-2 rounded-full border border-white/20 shadow-2xl z-[150]">
      <button onClick={() => zoomOut()} className="p-2 text-white hover:bg-white/20 rounded-full transition-colors" title="Afastar"><ZoomOut className="w-5 h-5" /></button>
      <button onClick={() => resetTransform()} className="px-3 py-1 text-white hover:bg-white/20 rounded-full transition-colors font-bold text-sm" title="Resetar">100%</button>
      <button onClick={() => zoomIn()} className="p-2 text-white hover:bg-white/20 rounded-full transition-colors" title="Aproximar"><ZoomIn className="w-5 h-5" /></button>
      <div className="w-px h-6 bg-white/20 mx-1"></div>
      <div className="flex items-center gap-2 px-2 text-white/70 text-xs">
        <MousePointer2 className="w-4 h-4" /> Use o scroll do mouse ou pinça para zoom
      </div>
    </div>
  );
};

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

  const [isComparing, setIsComparing] = useState(false);
  const [selectedSimId2, setSelectedSimId2] = useState<string>("");

  useEffect(() => {
    if (simsInCategory.length > 0 && !simsInCategory.find(s => s.id === selectedSimId)) {
      setSelectedSimId(simsInCategory[0].id);
    }
  }, [selectedCategory, simsInCategory]);

  const sim = group.find(s => s.id === selectedSimId) || group[0];
  const sim2 = group.find(s => s.id === selectedSimId2);

  const uniqueCategories = isDrenagem
    ? Array.from(new Set(group.map(s => s.return_period_tag || "Geral")))
    : [];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImageIndex2, setCurrentImageIndex2] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxTitle, setLightboxTitle] = useState<string | null>(null);

  const getBarragemCards = (simulation: any) => [
    {
      id: "ruptura",
      title: "Tipo de Ruptura",
      tooltip: "Modo como a barragem falha (ex: Galgamento/Piping), essencial para prever a rapidez do fluxo da água.",
      icon: ShieldAlert,
      value: simulation?.rupture_type,
      color: "#DC2626",
      bgColor: "rgba(220, 38, 38, 0.06)",
    },
    {
      id: "alcance",
      title: "Alcance Máx. da Lâmina",
      tooltip: "A distância máxima que a onda de cheia atinge a partir do ponto de ruptura da barragem.",
      icon: Target,
      value: simulation?.water_reach,
      color: "#8B5CF6",
      bgColor: "rgba(139, 92, 246, 0.06)",
    },
    {
      id: "velocidade_profundidade",
      title: "Velocidade / Profundidade",
      tooltip: "Quão rápido a água se move (m/s) e a altura da lâmina d'água (m) no ponto afetado.",
      icon: Waves,
      value: `${simulation?.water_velocity || '-'} / ${simulation?.water_depth || '-'}`,
      color: "#2563EB",
      bgColor: "rgba(37, 99, 235, 0.06)",
    },
    {
      id: "forca",
      title: "Força de Chegada",
      tooltip: "Multiplicação da velocidade pela profundidade. Acima de 1.0 m²/s já apresenta risco letal para adultos.",
      icon: Gauge,
      value: simulation?.arrival_force,
      color: "#16A34A",
      bgColor: "rgba(22, 163, 74, 0.06)",
    },
  ];

  const getDrenagemCards = (simulation: any) => [
    { id: "volume", title: "Volume da Chuva", tooltip: "Quantidade total de chuva (precipitação) esperada para o evento, medida em milímetros (mm).", icon: Waves, value: simulation?.rain_volume, color: "#EA580C", bgColor: "rgba(234, 88, 12, 0.06)" },
    { id: "intensidade", title: "Intensidade da Chuva", tooltip: "Força da chuva no tempo (mm/h). Chuvas muito intensas em curtos períodos causam enxurradas graves.", icon: CloudRain, value: simulation?.rain_intensity, color: "#2563EB", bgColor: "rgba(37, 99, 235, 0.06)" },
    { id: "duracao", title: "Duração da Chuva", tooltip: "Tempo total em que a chuva persiste no cenário modelado.", icon: Gauge, value: simulation?.rain_duration, color: "#8B5CF6", bgColor: "rgba(139, 92, 246, 0.06)" },
  ];

  const renderCarousel = (simulation: any, images: string[], currentIndex: number, setIndex: (i: number) => void) => {
    if (images.length === 0) return null;
    const titles = simulation.image_titles || [];
    const title = titles[currentIndex] || "";

    return (
      <div className="flex-1 bg-gray-100 flex flex-col relative w-full h-full group">
        <div
          className="absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer bg-gray-200"
          onClick={() => {
            setLightboxImage(images[currentIndex]);
            setLightboxTitle(title);
          }}
        >
          <img src={images[currentIndex]} alt="Simulação" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 bg-black/60 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all">
              <ZoomIn className="w-5 h-5" /> Ampliar Mapa
            </div>
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all z-10"
              >
                &#8592;
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all z-10"
              >
                &#8594;
              </button>
            </>
          )}
        </div>

        {/* Title area underneath */}
        {title && (
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-4 pt-4 pb-8 z-10 pointer-events-none">
            <h4 className="text-white font-bold text-sm shadow-sm">{title}</h4>
          </div>
        )}

        {images.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setIndex(idx); }}
                className={`w-3 h-3 rounded-full transition-all border border-black/20 ${idx === currentIndex ? 'bg-white scale-125 shadow-md' : 'bg-white/50 hover:bg-white/80'}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderScenario = (simulation: any, isSecondary: boolean = false) => {
    if (!simulation) return null;
    const cards = isDrenagem ? getDrenagemCards(simulation) : getBarragemCards(simulation);
    const hazard = isDrenagem ? getDrainageHazard(simulation) : getDamHazard(simulation);

    const simYoutubeId = simulation.video_url ? getYouTubeId(simulation.video_url) : (simulation.media_url ? getYouTubeId(simulation.media_url) : null);
    const rawImageUrls = simulation.image_urls || [];
    const legacyMedia = simulation.media_url && !getYouTubeId(simulation.media_url) ? [simulation.media_url] : [];
    const finalImageUrls = rawImageUrls.length > 0 ? rawImageUrls : legacyMedia;
    const hasImage = finalImageUrls.length > 0;

    const currentIndex = isSecondary ? currentImageIndex2 : currentImageIndex;
    const setIndex = isSecondary ? setCurrentImageIndex2 : setCurrentImageIndex;

    return (
      <div className={`flex flex-col gap-6 ${isComparing ? 'w-full lg:w-1/2' : 'w-full'}`}>
        {isComparing && (
          <div className="flex items-center justify-between mb-2 border-b pb-3">
            <span className="font-black text-gray-800 text-xl">
              {isSecondary ? "Cenário B" : "Cenário A"}
            </span>
            {isDrenagem ? (
              <span className="text-sm px-3 py-1.5 bg-gray-100 rounded-lg font-bold text-gray-700 shadow-sm border border-gray-200 flex items-center gap-1.5">
                <Timer className="w-4 h-4" /> {simulation.rain_duration} | <CloudRain className="w-4 h-4" /> {simulation.rain_intensity}
              </span>
            ) : (
              <span className="text-sm px-3 py-1.5 bg-gray-100 rounded-lg font-bold text-gray-700 shadow-sm border border-gray-200">
                {simulation.rupture_type}
              </span>
            )}
          </div>
        )}

        {/* 1. MÍDIAS (Destaque Principal) */}
        {(hasImage || simYoutubeId) && (
          <div className="flex flex-col gap-5">
            {hasImage && (
              <div className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden flex flex-col">
                <div className="px-5 py-3.5 border-b bg-gray-50 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-purple-600" />
                  <h4 className="font-bold text-gray-900">Mapa / Visualização Técnica</h4>
                </div>
                <div className={`relative w-full ${isComparing ? 'min-h-[400px] h-[40vh]' : 'min-h-[550px] h-[65vh]'}`}>
                  {renderCarousel(simulation, finalImageUrls, currentIndex, setIndex)}
                </div>
              </div>
            )}

            {simYoutubeId && (
              <div className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden flex flex-col">
                <div className="px-5 py-3.5 border-b bg-gray-50 flex items-center gap-2">
                  <Play className="w-5 h-5 text-red-600" />
                  <h4 className="font-bold text-gray-900">Vídeo Explicativo</h4>
                </div>
                <div className={`relative w-full ${isComparing ? 'min-h-[300px]' : 'min-h-[500px]'}`}>
                  <iframe className="absolute inset-0 w-full h-full" src={`https://www.youtube.com/embed/${simYoutubeId}`} frameBorder="0" allowFullScreen></iframe>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. ALERTA DE IMPACTO */}
        {hazard && (
          <div className={`flex items-start gap-4 p-5 rounded-2xl border shadow-md transition-all ${hazard.color} mt-2`}>
            <div className="mt-1">{hazard.icon}</div>
            <div className="flex flex-col">
              <h5 className="font-bold text-sm uppercase tracking-wider mb-1">{hazard.level}</h5>
              <p className="text-sm opacity-90 leading-relaxed font-medium">{hazard.message}</p>
            </div>
          </div>
        )}

        {/* 3. DADOS TÉCNICOS (Extra) */}
        <div className="mt-2">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 pl-1">Parâmetros Técnicos Extras</h4>
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${!isComparing && !isDrenagem ? 'lg:grid-cols-4' : (!isComparing ? 'lg:grid-cols-3' : '')} gap-4`}>
            {cards.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-visible flex flex-col"
              >
                <div className="w-full h-11 flex items-center px-4 relative" style={{ background: card.bgColor }}>
                  <card.icon className="w-4 h-4 mr-2" style={{ color: card.color }} />
                  <p className="text-[11px] text-gray-600 uppercase tracking-wider font-bold flex items-center gap-1.5 cursor-help group/tooltip">
                    {card.title}
                    {card.tooltip && (
                      <span className="relative flex">
                        <Info className="w-3.5 h-3.5 text-gray-400 hover:text-gray-700 transition-colors" />
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-2.5 bg-gray-900 text-white text-[11px] sm:text-xs rounded-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-50 text-center shadow-xl pointer-events-none normal-case tracking-normal">
                          {card.tooltip}
                          <span className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-gray-900"></span>
                        </span>
                      </span>
                    )}
                  </p>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-center">
                  <h4 className="text-xl sm:text-2xl font-black text-gray-900 break-words">
                    {card.value || '-'}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. OBSERVAÇÕES */}
        {simulation.others && simulation.others.trim() !== "" && (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 mt-auto">
            <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Info className="w-4 h-4 text-secondary" />
              Outras Informações / Observações
            </h4>
            <p className="text-gray-700 whitespace-pre-line text-sm leading-relaxed">
              {simulation.others}
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="animate-fade-in-up">
      {/* Header */}
      <div className="bg-white border border-border-light rounded-2xl shadow-md mb-6 overflow-hidden">
        <div className={`h-1 ${isDrenagem ? 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600' : 'bg-gradient-to-r from-red-500 via-red-600 to-red-800'}`} />
        <div className="px-6 py-5 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0 ${isDrenagem ? 'bg-yellow-500' : 'bg-red-600'}`}>
              {isDrenagem ? <CloudRain className="w-5 h-5" /> : <TrafficCone className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-text-primary flex items-center gap-2">
                  {sim.dam_name ? sim.dam_name : "Ponto de Simulação Customizado"}
                  {!isDrenagem && (
                    sim.time_of_day === "Dia de Chuva" || sim.time_of_day === "Noite" ? (
                      <span className="flex items-center gap-1 text-xs font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full"><CloudRain className="w-3.5 h-3.5" /> Dia de Chuva</span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full"><Sun className="w-3.5 h-3.5" /> Dia de Sol</span>
                    )
                  )}
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
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {simsInCategory.length > 1 && (
              <button
                onClick={() => {
                  setIsComparing(!isComparing);
                  if (!isComparing && simsInCategory.length > 1) {
                    const nextSim = simsInCategory.find(s => s.id !== selectedSimId);
                    if (nextSim) setSelectedSimId2(nextSim.id);
                  }
                }}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all border ${isComparing
                    ? 'bg-blue-600 text-white border-blue-700 shadow-md hover:bg-blue-700'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
              >
                <Columns className="w-4 h-4" />
                {isComparing ? 'Desativar Comparação' : 'Comparar Cenários'}
              </button>
            )}

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

      {/* Controles de Filtragem (Se Drenagem) */}
      {isDrenagem && uniqueCategories.length > 0 && (
        <div className="mb-6 p-5 bg-white border border-border-light rounded-2xl shadow-sm">
          <h4 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
            1. Escolha a Categoria de Retorno Principal
          </h4>
          <div className="flex flex-wrap gap-2 mb-4">
            {uniqueCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${selectedCategory === cat
                    ? 'bg-yellow-500 text-white shadow-md'
                    : 'bg-bg-secondary border border-border-light text-text-secondary hover:bg-bg-tertiary'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {simsInCategory.length > 1 && (
            <div className={`flex flex-col ${isComparing ? 'lg:flex-row gap-6' : ''}`}>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3 mt-4 border-t border-border-light pt-4">
                  2. Filtre o {isComparing ? 'Cenário A' : 'Cenário Específico'} (Duração e Intensidade)
                </h4>
                <div className="flex flex-wrap gap-2">
                  {simsInCategory.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSimId(s.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${selectedSimId === s.id
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-bg-secondary border border-border-light text-text-secondary hover:bg-bg-tertiary'
                        }`}
                    >
                      <span className="flex items-center justify-center gap-1.5">
                        <Timer className="w-4 h-4" /> {s.rain_duration} | <CloudRain className="w-4 h-4" /> {s.rain_intensity}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {isComparing && (
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3 mt-4 border-t border-border-light pt-4">
                    3. Filtre o Cenário B (Para Comparação)
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {simsInCategory.map(s => (
                      <button
                        key={s.id}
                        onClick={() => setSelectedSimId2(s.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${selectedSimId2 === s.id
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'bg-bg-secondary border border-border-light text-text-secondary hover:bg-bg-tertiary'
                          }`}
                      >
                        <span className="flex items-center justify-center gap-1.5">
                          <Timer className="w-4 h-4" /> {s.rain_duration} | <CloudRain className="w-4 h-4" /> {s.rain_intensity}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ÁREA DE RESULTADOS */}
      <div className={`flex flex-col ${isComparing ? 'lg:flex-row gap-8' : ''}`}>
        {renderScenario(sim, false)}
        {isComparing && renderScenario(sim2, true)}
      </div>

      {/* LIGHTBOX MODAL */}
      {lightboxImage && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[99999] flex flex-col bg-black/95 backdrop-blur-sm animate-in fade-in duration-200 m-0 p-0" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
          <div className="flex justify-between items-center p-4 sm:p-6 text-white border-b border-white/10 shrink-0 bg-black">
            <h3 className="text-lg sm:text-xl font-bold">{lightboxTitle || "Visualização Ampliada"}</h3>
            <button
              onClick={() => { setLightboxImage(null); setLightboxTitle(null); }}
              className="p-2 hover:bg-white/10 rounded-full transition-colors flex items-center gap-2 text-sm font-semibold"
            >
              <span className="hidden sm:inline">Fechar</span> <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 w-full h-full relative overflow-hidden bg-black/50">
            <TransformWrapper
              initialScale={1}
              minScale={1}
              maxScale={30}
              centerOnInit={true}
              limitToBounds={false}
              pinch={{ step: 2 }}
            >
              <>
                <ZoomControls />
                <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }} contentStyle={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img
                    src={lightboxImage}
                    alt="Ampliado"
                    className="max-w-full max-h-full object-contain cursor-grab active:cursor-grabbing"
                    draggable={false}
                  />
                </TransformComponent>
              </>
            </TransformWrapper>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
