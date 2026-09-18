"use client";

import Link from "next/link";
import {
  MapPin,
  Mail,
  Phone,
  Instagram,
  ExternalLink,
  Droplets,
  Scale,
} from "lucide-react";
import VisitorCounter from "./VisitorCounter";

const quickLinks = [
  { label: "Quem Somos", href: "/quem-somos" },
  { label: "Diretrizes de Uso", href: "/diretrizes" },
  { label: "Simulações", href: "/simulacoes" },
  { label: "Contatos", href: "/contatos" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#001833] dark:bg-slate-950 text-white transition-colors duration-300" id="footer">
      {/* Linha de acento topo — mais sutil */}
      <div className="h-px bg-gradient-to-r from-transparent via-secondary/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Conteúdo principal */}
        <div className="py-14 sm:py-16 grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-20">

          {/* Coluna 1 — Sobre */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/8 text-secondary">
                <Droplets className="w-4 h-4" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-bold font-display">Lasidra</span>
                <span className="text-[10px] font-medium text-white/35 tracking-widest uppercase">UFPI</span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              Laboratório de Simulações de Drenagens e Represas da Universidade Federal do Piauí. Pesquisa em recursos hídricos e alertas meteorológicos.
            </p>
            <a
              href="https://www.instagram.com/lasidra_ufpi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-150"
              id="footer-instagram"
            >
              <Instagram className="w-3.5 h-3.5" />
              @lasidra_ufpi
              <ExternalLink className="w-3 h-3 opacity-50" />
            </a>
          </div>

          {/* Coluna 2 — Links */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-5">
              Navegação
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3 — Contato */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-5">
              Contato
            </h3>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-secondary/70 mt-0.5 shrink-0" />
                <span className="text-white/50 text-sm leading-relaxed">
                  Campus Ministro Petrônio Portella, Ininga,<br />Teresina — PI, CEP 64049-550
                </span>
              </li>
              <li>
                <a
                  href="mailto:lasidra@ufpi.edu.br"
                  className="flex items-center gap-2.5 text-white/50 hover:text-white text-sm transition-colors duration-150"
                  id="footer-email"
                >
                  <Mail className="w-3.5 h-3.5 text-secondary/70 shrink-0" />
                  lasidra@ufpi.edu.br
                </a>
              </li>
              <li>
                <a
                  href="tel:+558631215000"
                  className="flex items-center gap-2.5 text-white/50 hover:text-white text-sm transition-colors duration-150"
                  id="footer-phone"
                >
                  <Phone className="w-3.5 h-3.5 text-secondary/70 shrink-0" />
                  (86) 3121-5000
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="border-t border-white/8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <p>© {currentYear} Lasidra — Universidade Federal do Piauí</p>
            <div className="flex items-center gap-2">
              <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank">
                <img alt="Licença Creative Commons" style={{ borderWidth: 0, height: "14px" }} src="https://i.creativecommons.org/l/by-nc-nd/4.0/80x15.png" />
              </a>
              <span>
                <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank" className="hover:text-white/60 transition-colors underline">
                  CC BY-NC-ND 4.0
                </a>
              </span>
            </div>
            <Link
              href="/diretrizes"
              className="inline-flex items-center gap-1.5 text-white/30 hover:text-white/60 transition-colors duration-150"
              id="footer-copyright-btn"
            >
              <Scale className="w-3 h-3" />
              Direitos Autorais
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <VisitorCounter />
            <p className="text-white/25">
              Desenvolvido por{" "}
              <a
                href="https://github.com/tatetsuo"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/50 transition-colors underline"
              >
                Gabriel Maia
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
