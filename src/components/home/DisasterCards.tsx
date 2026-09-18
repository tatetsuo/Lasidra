"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { Instagram, ExternalLink, ArrowRight } from "lucide-react";

const INSTAGRAM_POST_URLS = [
  "https://www.instagram.com/lasidra_ufpi/",
];

export default function DisasterCards() {
  const embedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Força o processamento dos embeds do Instagram após montagem
    if (typeof window !== "undefined" && (window as any).instgrm) {
      (window as any).instgrm.Embeds.process();
    }
  }, []);

  return (
    <section
      className="py-20 sm:py-28 bg-white dark:bg-slate-950 transition-colors duration-300 relative"
      id="disaster-cards-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Cabeçalho editorial */}
        <div className="mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-pink-400" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-pink-500 dark:text-pink-400">
                Redes Sociais
              </span>
            </div>
            <h2 className="text-display-md text-text-primary dark:text-white">
              Últimas Notícias
            </h2>
            <p className="text-text-secondary dark:text-slate-400 text-sm leading-relaxed mt-2 max-w-md">
              Acompanhe alertas, informações sobre inundações e os avanços do laboratório direto do nosso Instagram.
            </p>
          </div>
          <a
            href="https://www.instagram.com/lasidra_ufpi"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-5 py-2.5 border border-border-light dark:border-slate-700 rounded-lg text-sm font-medium text-text-secondary dark:text-slate-400 hover:text-text-primary dark:hover:text-white hover:border-border dark:hover:border-slate-600 transition-all duration-200 shrink-0"
            id="instagram-profile-link"
          >
            <Instagram className="w-4 h-4" />
            @lasidra_ufpi
            <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>

        {/* 
          Widget: Instagram Official Embed
          O embed oficial do Instagram é gratuito e sem marca d'água.
          Exibe o feed de forma responsiva usando o script oficial do Instagram.
          
          NOTA: O embed oficial do Instagram mostra apenas posts individuais.
          Para um feed completo, usamos o Elfsight existente ou
          o container abaixo com o widget que já estava configurado.
        */}
        <div className="max-w-5xl">
          <div className="rounded-xl overflow-hidden border border-border-light dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm dark:shadow-none">
            {/* Header do widget */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-border-light dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400">
                  <Instagram className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-xs font-semibold text-text-primary dark:text-white">
                  @lasidra_ufpi
                </span>
                <span className="text-xs text-text-muted dark:text-slate-500">· Instagram</span>
              </div>
              <a
                href="https://www.instagram.com/lasidra_ufpi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-text-muted dark:text-slate-500 hover:text-primary dark:hover:text-white transition-colors"
              >
                Ver perfil
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>

            {/* Widget Elfsight — mantido pois já está configurado e funcionando */}
            <div className="w-full min-h-[400px] flex items-center justify-center bg-white dark:bg-slate-950 rounded-b-xl overflow-hidden relative" ref={embedRef}>
              <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
              <div
                className="elfsight-app-ff42f75e-1da3-4830-9af8-6aa2fcd4f062 w-full"
                data-elfsight-app-lazy
              />
            </div>
          </div>

          {/* Fallback CTA caso o widget não carregue */}
          <p className="text-center text-xs text-text-muted dark:text-slate-600 mt-4">
            Problemas ao visualizar?{" "}
            <a
              href="https://www.instagram.com/lasidra_ufpi"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary dark:hover:text-blue-400 transition-colors"
            >
              Acesse o perfil diretamente
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
