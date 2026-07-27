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
    <section className="py-16 sm:py-20 bg-bg-secondary" id="institutional-banners-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary bg-primary-50 px-3 py-1 rounded-full mb-4">
            <BarChart3 className="w-3.5 h-3.5" />
            Tecnologia & Pesquisa
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-3">
            Ferramentas e Infraestrutura
          </h2>
          <p className="text-text-secondary text-sm sm:text-base max-w-2xl mx-auto">
            Conheça as tecnologias e a infraestrutura que o Lasidra utiliza para
            monitorar e prever desastres naturais no Piauí.
          </p>
        </div>

        {/* Banners grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-12">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              id={`banner-${banner.id}`}
            >
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-primary/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <h3 className="text-white font-bold text-sm sm:text-base mb-1">
                  {banner.title}
                </h3>
                <p className="text-white/60 text-xs sm:text-sm">
                  {banner.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white rounded-2xl shadow-md border border-border-light p-6 sm:px-10 sm:py-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-white shadow-md">
                <Instagram className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-text-primary">
                  Siga-nos no Instagram
                </p>
                <p className="text-xs text-text-secondary">
                  Acompanhe novidades e alertas do Lasidra
                </p>
              </div>
            </div>
            <a
              href="https://www.instagram.com/lasidra_ufpi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-light text-white font-semibold rounded-xl text-sm transition-all duration-300 hover:-translate-y-0.5 shadow-sm hover:shadow-md"
              id="instagram-cta"
            >
              @lasidra_ufpi
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
