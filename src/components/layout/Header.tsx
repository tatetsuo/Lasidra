"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, FlaskConical } from "lucide-react";

const navItems = [
  { label: "Quem Somos", href: "/quem-somos" },
  { label: "Diretrizes", href: "/diretrizes" },
  { label: "Simulações", href: "/simulacoes" },
  { label: "Contatos", href: "/contatos" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-header"
          : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-18 sm:h-20">
          {/* Logo — Left-aligned */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group shrink-0"
            id="header-logo"
          >
            <div className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-primary text-white transition-transform duration-300 group-hover:scale-105">
              <FlaskConical className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-primary">
                Lasidra
              </span>
              <span className="text-[10px] sm:text-xs font-medium text-text-secondary -mt-1 tracking-wider uppercase">
                UFPI
              </span>
            </div>
          </Link>

          {/* Desktop Navigation — Centered absolutely */}
          <nav
            className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2"
            id="desktop-nav"
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  id={`nav-${item.href.replace("/", "")}`}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-250 ${
                    isActive
                      ? "text-primary bg-primary-50"
                      : "text-text-secondary hover:text-primary hover:bg-primary-50/50"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-secondary rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right spacer (empty — keeps layout balanced) */}
          <div className="hidden lg:block w-[140px]" />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-text-secondary hover:text-primary hover:bg-primary-50/50 transition-colors"
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav
          className="px-4 pb-4 space-y-1 border-t border-border-light"
          id="mobile-nav"
        >
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                id={`mobile-nav-${item.href.replace("/", "")}`}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "text-primary bg-primary-50 border-l-3 border-secondary"
                    : "text-text-secondary hover:text-primary hover:bg-primary-50/30"
                }`}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
