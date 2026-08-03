"use client";

import Link from "next/link";
import {
  MapPin,
  Mail,
  Phone,
  Instagram,
  ExternalLink,
  FlaskConical,
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
    <footer className="bg-primary text-white" id="footer">
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-secondary via-secondary-light to-secondary" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 sm:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Column 1 — About */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 text-secondary">
                <FlaskConical className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold tracking-tight">Lasidra</h3>
                <span className="text-[10px] font-medium text-white/60 tracking-wider uppercase">
                  UFPI
                </span>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Laboratório de Sistemas de Informações e Decisões aplicados a
              Recursos Hídricos e Ambientais. Vinculado à Universidade Federal
              do Piauí, dedicado à pesquisa em recursos hídricos, simulações
              hidrológicas e alertas meteorológicos.
            </p>
            <a
              href="https://www.instagram.com/lasidra_ufpi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/90 hover:text-white text-sm font-medium transition-all duration-250"
              id="footer-instagram"
            >
              <Instagram className="w-4 h-4" />
              @lasidra_ufpi
              <ExternalLink className="w-3 h-3 opacity-50" />
            </a>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-5">
              Links Rápidos
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-secondary text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary/40 group-hover:bg-secondary transition-colors duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-5">
              Contato
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                <span className="text-white/70 text-sm leading-relaxed">
                  Campus Universitário Ministro Petrônio Portella, Bairro
                  Ininga, Teresina — PI, CEP 64049-550
                </span>
              </li>
              <li>
                <a
                  href="mailto:lasidra@ufpi.edu.br"
                  className="flex items-center gap-3 text-white/70 hover:text-secondary text-sm transition-colors duration-200"
                  id="footer-email"
                >
                  <Mail className="w-4 h-4 text-secondary shrink-0" />
                  lasidra@ufpi.edu.br
                </a>
              </li>
              <li>
                <a
                  href="tel:+558631215000"
                  className="flex items-center gap-3 text-white/70 hover:text-secondary text-sm transition-colors duration-200"
                  id="footer-phone"
                >
                  <Phone className="w-4 h-4 text-secondary shrink-0" />
                  (86) 3121-5000
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
            <p>
              © {currentYear} Lasidra — Universidade Federal do Piauí. Todos os
              direitos reservados.
            </p>
            {/* Botão de Direitos Autorais */}
            <Link
              href="/diretrizes"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/60 hover:text-secondary text-xs font-medium transition-all duration-250 border border-white/10 hover:border-secondary/30"
              id="footer-copyright-btn"
            >
              <Scale className="w-3 h-3" />
              Direitos Autorais
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {/* Contador de Visitantes */}
            <VisitorCounter />
            <p className="text-white/30">
              Desenvolvido por{" "}
              <a
                href="https://github.com/tatetsuo"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/70 transition-colors underline decoration-transparent hover:decoration-white/30"
              >
                Gabriel Maia
              </a>{" "}
              em auxílio com o{" "}
              <span className="text-secondary/60">LASIDRA</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
