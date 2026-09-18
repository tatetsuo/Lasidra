"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (el) {
      el.classList.add("animate-fade-in");
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden min-h-[520px] sm:min-h-[640px] flex items-center"
      id="hero-section"
      style={{
        background:
          "radial-gradient(ellipse 70% 80% at 80% 20%, rgba(0, 74, 153, 0.35) 0%, transparent 65%), #002244",
      }}
    >
      {/* Textura topográfica */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M0 30 Q15 10 30 30 Q45 50 60 30' fill='none' stroke='white' stroke-width='0.8'/%3E%3Cpath d='M0 50 Q15 30 30 50 Q45 70 60 50' fill='none' stroke='white' stroke-width='0.8'/%3E%3Cpath d='M0 10 Q15 -10 30 10 Q45 30 60 10' fill='none' stroke='white' stroke-width='0.8'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Linha de acento vertical dourada */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary opacity-80 hidden lg:block" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-28 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Coluna esquerda — texto */}
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6 animate-fade-in-up">
              <div className="w-8 h-px bg-secondary" />
              <span className="eyebrow-primary">Centro de Monitoramento Ativo</span>
            </div>

            {/* Título */}
            <h1 className="text-white mb-6 animate-fade-in-up stagger-1" style={{ lineHeight: 1.05 }}>
              <span
                className="block font-display"
                style={{
                  fontSize: "clamp(1rem, 2vw, 1.35rem)",
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: "0.3rem",
                }}
              >
                Bem-vindo ao portal
              </span>
              <span
                className="font-display"
                style={{
                  fontSize: "clamp(2.8rem, 7vw, 5rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  display: "block",
                }}
              >
                <span style={{ color: "rgba(255,255,255,0.85)" }}>!</span>
                <span
                  style={{
                    background: "linear-gradient(135deg, #E8B830 0%, #C8960F 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Lasidra
                </span>
                <span
                  style={{
                    color: "rgba(255,255,255,0.85)",
                    WebkitTextFillColor: "rgba(255,255,255,0.85)",
                  }}
                >
                  {" "}Avisa
                </span>
                <span style={{ color: "rgba(255,255,255,0.85)" }}>!</span>
              </span>
            </h1>

            {/* Subtítulo */}
            <p className="text-base sm:text-lg text-white/60 max-w-lg mb-10 leading-relaxed animate-fade-in-up stagger-2">
              Plataforma de simulação hidrológica e alertas meteorológicos do laboratório{" "}
              <span className="text-white/85 font-medium">Lasidra</span>{" "}
              — Universidade Federal do Piauí.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start gap-4 animate-fade-in-up stagger-3">
              <Link
                href="/simulacoes"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-secondary text-primary-dark font-semibold rounded-lg text-sm transition-all duration-200 hover:bg-secondary-light hover:shadow-[0_8px_24px_rgba(200,150,15,0.35)] w-full sm:w-auto justify-center sm:justify-start"
              >
                Explorar Simulações
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>

              <Link
                href="/quem-somos"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white/75 hover:text-white hover:border-white/40 font-medium rounded-lg text-sm transition-all duration-200 w-full sm:w-auto justify-center sm:justify-start"
              >
                Conheça o Lasidra
              </Link>
            </div>
          </div>

          {/* Coluna direita — imagem do Piauí */}
          <div className="hidden lg:flex items-center justify-center animate-fade-in-up stagger-2">
            <div className="relative w-80 xl:w-96">
              {/* Glow atrás da imagem */}
              <div
                className="absolute inset-0 blur-[100px] scale-75 pointer-events-none rounded-full"
                style={{ background: "rgba(0, 80, 160, 0.3)" }}
              />
              <Image
                src="/images/piaui-map.jpg"
                alt="Mapa do estado do Piauí"
                width={500}
                height={500}
                className="relative z-10 w-full h-auto object-contain select-none"
                style={{
                  mixBlendMode: "screen",
                  filter: "brightness(0.9) contrast(1.05)",
                }}
                priority
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-25">
        <ChevronDown className="w-5 h-5 text-white" />
      </div>
    </section>
  );
}
