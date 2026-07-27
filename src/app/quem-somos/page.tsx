import type { Metadata } from "next";
import {
  FlaskConical,
  Target,
  Users,
  BookOpen,
  Droplets,
  BarChart3,
  ShieldAlert,
  GraduationCap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Quem Somos",
  description:
    "Conheça o Lasidra — Laboratório de Sistemas de Informações e Decisões aplicados a Recursos Hídricos e Ambientais da UFPI.",
};

const areasDeAtuacao = [
  {
    icon: Droplets,
    title: "Recursos Hídricos",
    description:
      "Modelagem e simulação de sistemas hídricos, incluindo barragens, rios e bacias hidrográficas do estado do Piauí.",
  },
  {
    icon: ShieldAlert,
    title: "Alertas Meteorológicos",
    description:
      "Desenvolvimento de sistemas de alerta precoce para eventos extremos como inundações, secas e tempestades severas.",
  },
  {
    icon: BarChart3,
    title: "Geoprocessamento",
    description:
      "Utilização de SIG, sensoriamento remoto e análise espacial para mapeamento de áreas de risco e vulnerabilidade.",
  },
  {
    icon: GraduationCap,
    title: "Formação Acadêmica",
    description:
      "Orientação de pesquisas de graduação, mestrado e doutorado nas áreas de hidrologia e ciências ambientais.",
  },
];

const equipe = [
  {
    nome: "Prof. Dr. Jean Prost Moscardi",
    cargo: "Coordenador do Lasidra",
    area: "Recursos Hídricos e Hidrologia",
  },
  {
    nome: "Prof. Dr. [Nome do Pesquisador]",
    cargo: "Pesquisador Sênior",
    area: "Geoprocessamento e SIG",
  },
  {
    nome: "Prof. Dr. [Nome do Pesquisador]",
    cargo: "Pesquisador",
    area: "Meteorologia e Climatologia",
  },
  {
    nome: "[Nome do Mestrando/Doutorando]",
    cargo: "Estudante de Pós-Graduação",
    area: "Simulações Hidrológicas",
  },
];

export default function QuemSomosPage() {
  return (
    <>
      {/* Page hero */}
      <section className="bg-gradient-hero text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 mb-6">
            <FlaskConical className="w-8 h-8 text-secondary" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Quem Somos
          </h1>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Conheça o laboratório que está na linha de frente da pesquisa em
            recursos hídricos e alertas meteorológicos no Piauí.
          </p>
        </div>
      </section>

      {/* About section */}
      <section className="py-16 sm:py-20 bg-bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
              Sobre o Laboratório
            </h2>
          </div>

          <div className="prose prose-lg max-w-none text-text-secondary leading-relaxed space-y-4">
            <p>
              O <strong className="text-text-primary">Lasidra</strong>{" "}
              (Laboratório de Sistemas de Informações e Decisões aplicados a
              Recursos Hídricos e Ambientais) é um laboratório de pesquisa
              vinculado à{" "}
              <strong className="text-text-primary">
                Universidade Federal do Piauí (UFPI)
              </strong>
              , localizado no Campus Universitário Ministro Petrônio Portella,
              em Teresina.
            </p>
            <p>
              Fundado com a missão de desenvolver soluções tecnológicas para o
              monitoramento e a gestão de recursos hídricos, o Lasidra atua na
              interface entre a pesquisa acadêmica e a aplicação prática,
              fornecendo ferramentas e dados que auxiliam na tomada de decisão
              frente a desastres naturais, especialmente inundações e secas que
              afetam comunidades no estado do Piauí e na região Nordeste do
              Brasil.
            </p>
            <p>
              Através do portal{" "}
              <strong className="text-secondary">UFPI !AVISA!</strong>, o
              laboratório disponibiliza ao público simulações hidrológicas,
              alertas meteorológicos e dados de mapeamento de áreas de risco,
              contribuindo para a cultura de prevenção e resiliência da
              população piauiense.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 sm:py-20 bg-bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-secondary-50 flex items-center justify-center">
              <Target className="w-5 h-5 text-secondary" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
              Missão
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-border-light shadow-sm p-8 sm:p-10">
            <blockquote className="text-lg sm:text-xl text-text-primary leading-relaxed font-medium italic border-l-4 border-secondary pl-6">
              &ldquo;Desenvolver e disseminar conhecimento científico e
              tecnológico na área de recursos hídricos e meio ambiente,
              contribuindo para a prevenção de desastres naturais, a gestão
              sustentável dos recursos hídricos e a melhoria da qualidade de
              vida das comunidades do Piauí e do Nordeste brasileiro.&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      {/* Areas of expertise */}
      <section className="py-16 sm:py-20 bg-bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
              Áreas de Atuação
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {areasDeAtuacao.map((area) => (
              <div
                key={area.title}
                className="bg-white rounded-xl border border-border-light shadow-sm p-6 hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                    <area.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-bold text-text-primary">
                    {area.title}
                  </h3>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 sm:py-20 bg-bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
              Equipe
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {equipe.map((membro, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-border-light shadow-sm p-6 flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg shrink-0">
                  {membro.nome.charAt(0) === "["
                    ? "?"
                    : membro.nome
                        .split(" ")
                        .filter(
                          (n) =>
                            n.length > 2 && !["Dr.", "Prof."].includes(n)
                        )
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-text-primary">
                    {membro.nome}
                  </h3>
                  <p className="text-xs text-secondary font-semibold mt-0.5">
                    {membro.cargo}
                  </p>
                  <p className="text-xs text-text-muted mt-1">{membro.area}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-text-muted text-sm mt-8 italic">
            Os nomes da equipe são placeholders e devem ser substituídos pelos
            nomes reais dos membros do Lasidra.
          </p>
        </div>
      </section>
    </>
  );
}
