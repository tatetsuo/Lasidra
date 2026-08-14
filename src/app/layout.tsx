import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "UFPI !AVISA! — Portal de Avisos Meteorológicos e Simulações",
    template: "%s | UFPI !AVISA!",
  },
  description:
    "Portal de avisos meteorológicos, simulações hidrológicas e alertas de desastres naturais do laboratório Lasidra — Universidade Federal do Piauí (UFPI).",
  keywords: [
    "UFPI",
    "Lasidra",
    "avisos meteorológicos",
    "simulações hidrológicas",
    "barragens",
    "inundações",
    "Piauí",
    "alertas",
    "desastres naturais",
  ],
  authors: [{ name: "Lasidra — UFPI" }],
  openGraph: {
    title: "UFPI !AVISA! — Portal de Avisos Meteorológicos e Simulações",
    description:
      "Simulações hidrológicas e alertas de desastres naturais do Lasidra/UFPI.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable} suppressHydrationWarning>
      <body className="font-[family-name:var(--font-inter)] min-h-screen flex flex-col bg-bg-primary dark:bg-slate-900 dark:text-gray-100">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
