"use client";

import Image from "next/image";
import { Instagram, ExternalLink } from "lucide-react";

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
    <section
      className="py-20 sm:py-28 bg-bg-secondary dark:bg-slate-900 transition-colors duration-300"
      id="institutional-banners-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Cabeçalho de seção — editorial */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="section-divider" />
            <span className="eyebrow">Tecnologia & Pesquisa</span>
          </div>
          <h2 className="text-display-md text-text-primary dark:text-white">
            Ferramentas e Infraestrutura
          </h2>
          <p className="text-text-secondary dark:text-slate-400 text-sm max-w-md leading-relaxed mt-3">
            Conheça as tecnologias e a infraestrutura que o Lasidra utiliza para monitorar e prever desastres naturais no Piauí.
          </p>
        </div>

 /*       {/* Grid de imagens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-16">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="group relative aspect-[4/3] rounded-lg overflow-hidden border border-border-light dark:border-slate-800 hover:border-border dark:hover:border-slate-700 transition-all duration-300"
              id={`banner-${banner.id}`}
            >
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />

              {/* Overlay mais natural */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Conteúdo */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-semibold text-sm mb-1">
                  {banner.title}
                </h3>
                <p className="text-white/60 text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {banner.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        */

        {/* Instagram CTA — design clean e integrado */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-xl border border-border-light dark:border-slate-800 bg-white dark:bg-slate-900/80">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-white shrink-0">
              <Instagram className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary dark:text-white">
                Siga-nos no Instagram
              </p>
              <p className="text-xs text-text-muted dark:text-slate-500 mt-0.5">
                Acompanhe novidades e alertas do Lasidra
              </p>
            </div>
          </div>
          <a
            href="https://www.instagram.com/lasidra_ufpi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-light dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-medium rounded-lg text-sm transition-all duration-200 w-full sm:w-auto justify-center border border-transparent dark:border-slate-700"
            id="instagram-cta"
          >
            @lasidra_ufpi
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>
        </div>
      </div>
    </section>
  );
}
