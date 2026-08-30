"use client";

import { Instagram } from "lucide-react";
import Script from "next/script";

export default function DisasterCards() {
  return (
    <section className="py-16 sm:py-24 bg-bg-primary dark:bg-slate-950 transition-colors duration-500" id="disaster-cards-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-pink-600 bg-pink-100 dark:bg-pink-900/30 px-4 py-1.5 rounded-full mb-4">
            <Instagram className="w-4 h-4" />
            Notícias e Atualizações
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-primary dark:text-white mb-4 tracking-tight">
            Últimas Notícias do Lasidra
          </h2>
          <p className="text-text-secondary dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto font-medium">
            Acompanhe nossas redes sociais para ficar por dentro dos alertas,
            informações sobre inundações e avanços tecnológicos do laboratório.
          </p>
        </div>

        {/* Instagram Widget Container */}
        <div className="max-w-5xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-border-light dark:border-slate-800 p-4 sm:p-8 min-h-[500px] flex items-center justify-center">

          <div className="w-full h-full flex items-center justify-center">
            <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
            <div className="elfsight-app-ff42f75e-1da3-4830-9af8-6aa2fcd4f062" data-elfsight-app-lazy></div>
          </div>

        </div>
      </div>
    </section>
  );
}
