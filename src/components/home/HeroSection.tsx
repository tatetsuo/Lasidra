"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ShieldAlert, ArrowDown } from "lucide-react";

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
      className="relative overflow-hidden bg-gradient-hero min-h-[520px] sm:min-h-[580px] flex items-center"
      id="hero-section"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.04]">
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="hero-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* Floating decorative circles */}
      <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-secondary/10 blur-3xl" />
      <div className="absolute bottom-10 left-[5%] w-48 h-48 rounded-full bg-white/5 blur-2xl" />
      <div className="absolute top-1/2 right-[30%] w-32 h-32 rounded-full bg-secondary/5 blur-2xl" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center w-full">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 text-xs sm:text-sm font-medium mb-8 animate-fade-in-up">
          <ShieldAlert className="w-4 h-4 text-secondary" />
          Portal de Avisos Meteorológicos e Simulações
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 animate-fade-in-up stagger-1 tracking-tight">
          UFPI{" "}
          <span className="text-secondary relative">
            !AVISA!
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-secondary/30 rounded-full" />
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up stagger-2">
          Plataforma de monitoramento, simulação hidrológica e alertas de
          desastres naturais do laboratório{" "}
          <span className="text-secondary font-semibold">Lasidra</span> —
          Universidade Federal do Piauí.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up stagger-3">
          <Link
            href="/simulacoes"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-secondary hover:bg-secondary-light text-primary-dark font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base hover:-translate-y-0.5"
            id="hero-cta-simulacoes"
          >
            Explorar Simulações
          </Link>
          <Link
            href="/quem-somos"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 transition-all duration-300 text-sm sm:text-base hover:-translate-y-0.5"
            id="hero-cta-about"
          >
            Conheça o Lasidra
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="mt-14 sm:mt-16 animate-bounce">
          <ArrowDown className="w-5 h-5 text-white/30 mx-auto" />
        </div>
      </div>
    </section>
  );
}
