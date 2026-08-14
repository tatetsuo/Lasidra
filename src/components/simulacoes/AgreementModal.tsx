"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertTriangle, ShieldCheck, X } from "lucide-react";

interface AgreementModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export default function AgreementModal({ isOpen, onAccept, onDecline }: AgreementModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onDecline}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl dark:shadow-[0_20px_60px_rgba(37,99,235,0.15)] border border-border-light dark:border-slate-700 overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="bg-alert-orange/10 dark:bg-alert-orange/20 px-6 py-5 flex items-center justify-between border-b border-alert-orange/20 dark:border-alert-orange/10">
          <div className="flex items-center gap-3 text-alert-orange">
            <AlertTriangle className="w-6 h-6" />
            <h3 className="text-lg font-bold">Aviso de Responsabilidade</h3>
          </div>
          <button 
            onClick={onDecline}
            className="text-text-muted hover:text-text-primary dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 sm:p-8">
          <div className="flex items-start gap-4 mb-6">
            <ShieldCheck className="w-6 h-6 text-primary dark:text-blue-400 shrink-0 mt-0.5" />
            <div className="space-y-4 text-sm leading-relaxed text-text-secondary dark:text-gray-300">
              <p>
                Os dados de simulação apresentados a seguir são resultados de modelos matemáticos com finalidade <strong>acadêmica e de pesquisa</strong>.
              </p>
              <p>
                As informações não substituem laudos oficiais e o LASIDRA/UFPI não se responsabiliza por decisões tomadas exclusivamente com base nestas simulações.
              </p>
              <p>
                Ao prosseguir, você confirma que leu e concorda com as nossas{" "}
                <Link href="/diretrizes" className="text-primary hover:text-primary-light dark:text-blue-400 dark:hover:text-blue-300 font-bold underline transition-colors" target="_blank">
                  Diretrizes de Uso
                </Link>.
              </p>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row items-center gap-3 justify-end pt-4 border-t border-border-light dark:border-slate-700">
            <button
              onClick={onDecline}
              className="w-full sm:w-auto px-5 py-2.5 text-sm font-semibold text-text-secondary hover:text-text-primary dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              Não Concordo
            </button>
            <button
              onClick={onAccept}
              className="w-full sm:w-auto px-6 py-2.5 bg-primary hover:bg-primary-light dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all text-sm"
            >
              Li e Concordo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
