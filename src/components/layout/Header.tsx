"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, FlaskConical, Sun, Moon } from "lucide-react";
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
          ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-header dark:shadow-[0_2px_10px_rgba(0,0,0,0.5)] border-b border-transparent dark:border-slate-800"
          : "bg-white dark:bg-slate-900 border-b border-transparent dark:border-slate-800"
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
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-primary dark:text-white transition-colors">
                Lasidra
              </span>
              <span className="text-[10px] sm:text-xs font-medium text-text-secondary dark:text-gray-400 -mt-1 tracking-wider uppercase transition-colors">
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
                      ? "text-primary dark:text-blue-400 bg-primary-50 dark:bg-blue-900/30"
                      : "text-text-secondary dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 hover:bg-primary-50/50 dark:hover:bg-slate-800"
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

          {/* Actions: Theme Toggle + Mobile Menu */}
          <div className="flex items-center justify-end gap-2 shrink-0 lg:w-[140px]">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center justify-center w-10 h-10 rounded-lg text-text-secondary hover:text-primary hover:bg-primary-50/50 transition-colors"
              aria-label="Alternar tema"
              id="theme-toggle"
            >
              {mounted && theme === "dark" ? (
                <Sun className="w-5 h-5 text-secondary-light" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

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
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white dark:bg-slate-900 ${
          mobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav
          className="px-4 pb-4 space-y-1 border-t border-border-light dark:border-slate-800"
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
                    ? "text-primary dark:text-blue-400 bg-primary-50 dark:bg-blue-900/30 border-l-3 border-secondary dark:border-blue-500"
                    : "text-text-secondary dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 hover:bg-primary-50/30 dark:hover:bg-slate-800"
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
