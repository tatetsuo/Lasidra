"use client";

import Image from "next/image";
import { Instagram, ExternalLink, BarChart3 } from "lucide-react";

const banners = [
  {
    id: "radar",
    image: "/images/weather-radar.png",
    title: "Radar Meteorológico",
    description: "Monitoramento de precipitação em tempo real",
  },
  {
    id: "weather-map",
    image: "/images/weather-map.png",
    title: "Mapas Meteorológicos",
    description: "Frentes, pressão e sistemas atmosféricos",
  },
  {
    id: "control-room",
    image: "/images/control-room.png",
    title: "Sala de Monitoramento",
    description: "Centro de operações hidrológicas",
  },
  {
    id: "data-viz",
    image: "/images/data-visualization.png",
    title: "Análise de Dados",
    description: "Visualização de dados hidrológicos",
  },
];

export default function InstitutionalBanners() {
  return (
    <section className="py-16 sm:py-24 bg-bg-secondary dark:bg-slate-900 transition-colors duration-500" id="institutional-banners-section">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section header */}
      <div className="text-center mb-16">
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary dark:text-blue-400 bg-primary-50 dark:bg-blue-900/30 px-4 py-1.5 rounded-full mb-4">
          <BarChart3 className="w-4 h-4" />
          Tecnologia & Pesquisa
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-primary dark:text-white mb-4 tracking-tight">
          Ferramentas e Infraestrutura
        </h2>
        <p className="text-text-secondary dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto font-medium">
          Conheça as tecnologias e a infraestrutura que o Lasidra utiliza para
          monitorar e prever desastres naturais no Piauí.
        </p>
      </div>

      {/* Banners grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl dark:shadow-none dark:hover:shadow-[0_10px_40px_rgba(37,99,235,0.2)] transition-all duration-500 hover:-translate-y-2 border border-border-light/50 dark:border-slate-800"
            id={`banner-${banner.id}`}
          >
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="text-white font-bold text-lg sm:text-xl mb-2 drop-shadow-md">
                {banner.title}
              </h3>
              <p className="text-gray-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                {banner.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Instagram CTA */}
      <div className="text-center">
        <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-white dark:bg-slate-800 rounded-3xl shadow-xl dark:shadow-2xl border border-border-light dark:border-slate-700 p-8 sm:px-12 sm:py-8 transition-colors duration-500 hover:-translate-y-1 hover:shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-white shadow-lg shadow-pink-500/20">
              <Instagram className="w-7 h-7" />
            </div>
            <div className="text-left">
              <p className="text-base sm:text-lg font-bold text-text-primary dark:text-white">
                Siga-nos no Instagram
              </p>
              <p className="text-sm text-text-secondary dark:text-gray-400 font-medium">
                Acompanhe novidades e alertas do Lasidra
              </p>
            </div>
          </div>
          <a
            href="https://www.instagram.com/lasidra_ufpi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary hover:bg-primary-light dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold rounded-xl text-sm transition-all duration-300 shadow-md hover:shadow-lg w-full sm:w-auto mt-4 sm:mt-0"
            id="instagram-cta"
          >
            @lasidra_ufpi
            <ExternalLink className="w-4 h-4 opacity-70" />
          </a>
        </div>
      </div>
    </div>
  </section>
  );
}
