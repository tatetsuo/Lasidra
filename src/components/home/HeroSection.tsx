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
      className="relative overflow-hidden bg-gradient-hero dark:bg-none dark:bg-slate-900 min-h-[520px] sm:min-h-[600px] flex items-center transition-colors duration-500"
      id="hero-section"
    >
      {/* Background pattern (Dark Mode only) */}
      <div className="absolute inset-0 opacity-0 dark:opacity-20 transition-opacity duration-500">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="hero-grid-dark" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" className="text-blue-500" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid-dark)" />
        </svg>
      </div>

      {/* Floating decorative circles */}
      <div className="absolute top-20 right-[10%] w-72 h-72 rounded-full bg-secondary/15 dark:bg-blue-600/20 blur-3xl animate-pulse" />
      <div className="absolute bottom-10 left-[5%] w-56 h-56 rounded-full bg-white/10 dark:bg-purple-600/20 blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-[30%] w-40 h-40 rounded-full bg-secondary/10 dark:bg-secondary/20 blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center w-full">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 dark:bg-slate-800/60 backdrop-blur-md border border-white/20 dark:border-slate-700 shadow-xl text-white dark:text-gray-200 text-xs sm:text-sm font-semibold mb-8 animate-fade-in-up hover:bg-white/20 dark:hover:bg-slate-800 transition-colors">
          <ShieldAlert className="w-4 h-4 text-secondary dark:text-alert-blue" />
          Portal de Avisos Meteorológicos e Simulações
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] animate-fade-in-up mb-6">
          Bem-vindo ao Portal <br className="hidden sm:block" />
          <span className="text-secondary dark:text-blue-400 relative inline-block">
            !Lasidra Avisa!
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-secondary/40 dark:bg-blue-500/40 rounded-full" />
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-white/80 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up stagger-2 font-medium">
          Plataforma de monitoramento, simulação hidrológica e alertas de
          desastres naturais do laboratório{" "}
          <span className="text-secondary dark:text-blue-400 font-bold">Lasidra</span> —
          Universidade Federal do Piauí.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-in-up stagger-3">
          <Link
            href="/simulacoes"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary hover:bg-secondary-light dark:bg-blue-600 dark:hover:bg-blue-500 text-primary-dark dark:text-white font-bold rounded-2xl shadow-[0_0_20px_rgba(212,160,23,0.3)] dark:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-300 text-sm sm:text-base hover:-translate-y-1 w-full sm:w-auto"
            id="hero-cta-simulacoes"
          >
            Explorar Simulações
          </Link>
          <Link
            href="/quem-somos"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 dark:bg-slate-800/50 hover:bg-white/20 dark:hover:bg-slate-700/80 backdrop-blur-md text-white font-bold rounded-2xl border border-white/20 dark:border-slate-600 transition-all duration-300 text-sm sm:text-base hover:-translate-y-1 w-full sm:w-auto"
            id="hero-cta-about"
          >
            Conheça o Lasidra
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 sm:mt-20 animate-bounce">
          <ArrowDown className="w-6 h-6 text-white/40 dark:text-gray-500 mx-auto" />
        </div>
      </div>
    </section>
  );
}
