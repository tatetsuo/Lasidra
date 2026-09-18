"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon, Droplets } from "lucide-react";
import { useTheme } from "next-themes";

const navItems = [
  { label: "Quem Somos", href: "/quem-somos" },
  { label: "Diretrizes", href: "/diretrizes" },
  { label: "Simulações", href: "/simulacoes" },
  { label: "Contatos", href: "/contatos" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 bg-white dark:bg-slate-950 transition-all duration-200 ${
        scrolled
          ? "shadow-[0_1px_0_0_rgba(15,25,35,0.08)] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.06)]"
          : "border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16 sm:h-18">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group shrink-0"
            id="header-logo"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary dark:bg-primary-dark text-secondary transition-transform duration-200 group-hover:scale-95">
              <Droplets className="w-4 h-4" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold tracking-tight text-primary dark:text-white font-display transition-colors">
                Lasidra
              </span>
              <span className="text-[10px] font-medium text-text-muted dark:text-slate-500 tracking-widest uppercase">
                UFPI
              </span>
            </div>
          </Link>

          {/* Desktop Nav — centralizado */}
          <nav
            className="hidden lg:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2"
            id="desktop-nav"
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  id={`nav-${item.href.replace("/", "")}`}
                  className={`relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "text-primary dark:text-white"
                      : "text-text-secondary dark:text-slate-400 hover:text-primary dark:hover:text-white hover:bg-primary-50/60 dark:hover:bg-white/5"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-secondary rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Ações: Tema + Menu Mobile */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center justify-center w-9 h-9 rounded-md text-text-muted hover:text-primary dark:text-slate-400 dark:hover:text-white hover:bg-primary-50/60 dark:hover:bg-white/5 transition-colors"
              aria-label="Alternar tema"
              id="theme-toggle"
            >
              {mounted && theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-md text-text-muted hover:text-primary dark:text-slate-400 dark:hover:text-white hover:bg-primary-50/60 dark:hover:bg-white/5 transition-colors"
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-200 ease-in-out ${
          mobileMenuOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav
          className="px-4 pb-3 pt-1 space-y-0.5 border-t border-border-light dark:border-slate-800/80"
          id="mobile-nav"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                id={`mobile-nav-${item.href.replace("/", "")}`}
                className={`block px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-150 ${
                  isActive
                    ? "text-primary dark:text-white bg-primary-50 dark:bg-white/5"
                    : "text-text-secondary dark:text-slate-400 hover:text-primary dark:hover:text-white hover:bg-primary-50/50 dark:hover:bg-white/5"
                }`}
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
