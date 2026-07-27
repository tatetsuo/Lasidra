import type { Metadata } from "next";
import Link from "next/link";
import { Lock, ArrowLeft, Construction, Database, Users, Settings } from "lucide-react";

export const metadata: Metadata = {
  title: "Administração",
  description: "Área administrativa do portal UFPI !AVISA! — acesso restrito.",
  robots: { index: false, follow: false },
};

const futureFeatures = [
  {
    icon: Database,
    title: "CRUD de Barragens",
    description:
      "Cadastrar, editar e remover barragens com coordenadas geográficas, dados técnicos e status.",
  },
  {
    icon: Settings,
    title: "Gerenciar Simulações",
    description:
      "Upload de dados de simulação, cenários de ruptura e resultados de modelos hidrológicos.",
  },
  {
    icon: Users,
    title: "Controle de Acesso",
    description:
      "Sistema de login com autenticação e níveis de permissão para administradores.",
  },
];

export default function AdminPage() {
  return (
    <>
      {/* Page hero */}
      <section className="bg-gradient-hero text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 mb-6">
            <Lock className="w-8 h-8 text-secondary" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Administração
          </h1>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Área restrita para gerenciamento de dados do portal UFPI !AVISA!.
          </p>
        </div>
      </section>

      {/* Under construction */}
      <section className="py-16 sm:py-20 bg-bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-border-light shadow-lg overflow-hidden">
            {/* Yellow accent bar */}
            <div className="h-1.5 bg-gradient-to-r from-secondary via-secondary-light to-secondary" />

            <div className="p-8 sm:p-12 text-center">
              {/* Construction icon */}
              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-secondary-50 mb-6">
                <Construction className="w-10 h-10 text-secondary" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full animate-pulse" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">
                Painel Administrativo em Desenvolvimento
              </h2>
              <p className="text-text-secondary text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-8">
                O sistema de administração está sendo desenvolvido para a
                próxima fase do projeto. Este painel permitirá o gerenciamento
                completo de barragens, simulações e dados do portal.
              </p>

              {/* Future features preview */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-left max-w-3xl mx-auto">
                {futureFeatures.map((feature) => (
                  <div
                    key={feature.title}
                    className="flex flex-col items-start gap-3 p-5 rounded-xl bg-bg-secondary border border-border-light"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-text-primary mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-text-muted leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Back button */}
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-light text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-sm hover:-translate-y-0.5 group"
                id="admin-back-home"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Voltar à Página Inicial
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
