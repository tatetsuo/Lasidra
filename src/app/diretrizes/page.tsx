import type { Metadata } from "next";
import { Scale, FileText, ShieldCheck, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Diretrizes de Uso e Direitos Autorais",
  description:
    "Termos de uso, política de privacidade e direitos autorais do portal !Lasidra Avisa! do laboratório Lasidra.",
};

export default function DiretrizesPage() {
  return (
    <>
      {/* Page hero */}
      <section className="bg-gradient-hero text-white py-16 sm:py-20 transition-colors duration-500 border-b border-primary-light/10 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 mb-6">
            <Scale className="w-8 h-8 text-secondary" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Diretrizes de Uso e Direitos Autorais
          </h1>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Consulte as informações legais e os termos de uso dos dados
            disponibilizados pelo portal !Lasidra Avisa!.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-20 bg-bg-primary dark:bg-slate-950 transition-colors duration-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Important notice */}
          <div className="bg-secondary-50 dark:bg-slate-900 border border-secondary/20 dark:border-slate-800 rounded-xl p-6 mb-12 flex items-start gap-4 transition-colors duration-500">
            <AlertTriangle className="w-6 h-6 text-secondary dark:text-alert-orange shrink-0 mt-0.5" />
            <div>
              <h2 className="text-base font-bold text-text-primary dark:text-white mb-1">
                Aviso Importante
              </h2>
              <p className="text-sm text-text-secondary dark:text-gray-400 leading-relaxed">
                Ao acessar e utilizar o portal !Lasidra Avisa! e suas simulações,
                você concorda com os termos e condições descritos abaixo. Leia
                atentamente antes de prosseguir.
              </p>
            </div>
          </div>

          {/* Document sections */}
          <div className="space-y-12">
            {/* Section 1 */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary dark:bg-blue-600 text-white text-sm font-bold shadow-sm">
                  1
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary dark:text-white">
                  Termos de Uso
                </h2>
              </div>
              <div className="pl-11 space-y-4 text-text-secondary dark:text-gray-400 text-sm leading-relaxed">
                <p>
                  <strong className="text-text-primary dark:text-gray-200">
                    1.1. Aceitação dos Termos.
                  </strong>{" "}
                  O acesso e a utilização do portal !Lasidra Avisa!, incluindo
                  simulações, mapas, e relatos, estão sujeitos à aceitação
                  integral destas diretrizes. O uso contínuo implica na
                  concordância com as regras aqui estabelecidas.
                </p>
                <p>
                  <strong className="text-text-primary dark:text-gray-200">
                    1.2. Natureza dos Dados.
                  </strong>{" "}
                  As simulações e dados apresentados neste portal são resultados
                  de modelos matemáticos e computacionais desenvolvidos pelo
                  Lasidra/UFPI com finalidade acadêmica e de pesquisa. Os
                  resultados não substituem laudos técnicos oficiais, pareceres
                  de engenharia ou análises de risco realizadas por órgãos
                  competentes.
                </p>
                <p>
                  <strong className="text-text-primary dark:text-gray-200">
                    1.3. Limitação de Responsabilidade.
                  </strong>{" "}
                  O Lasidra e a UFPI não se responsabilizam por decisões tomadas
                  exclusivamente com base nos dados e simulações apresentados
                  neste portal. Os resultados devem ser utilizados apenas como
                  referência complementar a análises técnicas especializadas.
                </p>
                <p>
                  <strong className="text-text-primary dark:text-gray-200">
                    1.4. Uso Permitido.
                  </strong>{" "}
                  O conteúdo do portal pode ser utilizado para fins acadêmicos,
                  educacionais e de pesquisa, desde que devidamente citada a
                  fonte (Lasidra/UFPI) e respeitadas as condições de direitos
                  autorais descritas na Seção 2.
                </p>
                <p>
                  <strong className="text-text-primary dark:text-gray-200">
                    1.5. Uso Proibido.
                  </strong>{" "}
                  É expressamente proibido: (a) utilizar os dados para fins
                  comerciais sem autorização prévia por escrito do Lasidra; (b)
                  modificar, descompilar ou realizar engenharia reversa das
                  simulações; (c) reproduzir os dados atribuindo a fonte a
                  terceiros; (d) utilizar os dados para disseminar informações
                  falsas ou alarmistas.
                </p>
              </div>
            </div>

            <hr className="border-border-light dark:border-slate-800" />

            {/* Section 2 */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary dark:bg-blue-600 text-white text-sm font-bold shadow-sm">
                  2
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary dark:text-white">
                  Direitos Autorais e Propriedade Intelectual
                </h2>
              </div>
              <div className="pl-11 space-y-4 text-text-secondary dark:text-gray-400 text-sm leading-relaxed">
                <p>
                  <strong className="text-text-primary dark:text-gray-200">
                    2.1. Titularidade.
                  </strong>{" "}
                  Todo o conteúdo disponibilizado no portal !Lasidra Avisa! —
                  incluindo, mas não se limitando a, modelos de simulação,
                  bases de dados cartográficas, layouts, textos e imagens — é de
                  propriedade exclusiva do laboratório Lasidra/UFPI, sendo
                  protegido pela legislação de direitos autorais e de
                  propriedade intelectual aplicável.
                </p>
                <p>
                  <strong className="text-text-primary dark:text-gray-200">
                    2.2. Citação e Referência.
                  </strong>{" "}
                  A utilização dos dados e simulações em publicações acadêmicas,
                  relatórios técnicos ou materiais educacionais deve obrigatoriamente
                  incluir a seguinte citação:
                </p>
                <div className="bg-bg-secondary dark:bg-slate-800 rounded-lg p-4 border border-border-light dark:border-slate-700 font-mono text-xs text-text-primary dark:text-gray-300">
                  LASIDRA/UFPI. Portal !Lasidra Avisa! — Simulações Hidrológicas e
                  Alertas Meteorológicos. Universidade Federal do Piauí,
                  Teresina, PI. Disponível em: [URL]. Acesso em: [data].
                </div>
                <p>
                  <strong className="text-text-primary dark:text-gray-200">
                    2.3. Licenciamento.
                  </strong>{" "}
                  Salvo indicação expressa em contrário, os dados e simulações
                  são disponibilizados sob licença restrita para uso acadêmico e
                  educacional. Para utilização em contextos não cobertos por esta
                  licença, entre em contato com o Lasidra pelo e-mail
                  lasidra@ufpi.edu.br.
                </p>
              </div>
            </div>

            <hr className="border-border-light dark:border-slate-800" />

            {/* Section 3 */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary dark:bg-blue-600 text-white text-sm font-bold shadow-sm">
                  3
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary dark:text-white">
                  Política de Privacidade
                </h2>
              </div>
              <div className="pl-11 space-y-4 text-text-secondary dark:text-gray-400 text-sm leading-relaxed">
                <p>
                  <strong className="text-text-primary dark:text-gray-200">
                    3.1. Coleta de Dados.
                  </strong>{" "}
                  O portal pode coletar dados de navegação anônimos (como
                  páginas visitadas e tempo de permanência) para fins de
                  melhoria contínua da plataforma. Nenhum dado pessoal é
                  coletado sem o consentimento explícito do usuário.
                </p>
                <p>
                  <strong className="text-text-primary dark:text-gray-200">
                    3.2. Cookies.
                  </strong>{" "}
                  O portal pode utilizar cookies essenciais para o funcionamento
                  adequado do sistema. Cookies de análise serão utilizados
                  apenas com o consentimento do usuário.
                </p>
                <p>
                  <strong className="text-text-primary dark:text-gray-200">
                    3.3. Compartilhamento.
                  </strong>{" "}
                  Os dados de navegação coletados não serão compartilhados com
                  terceiros, exceto quando exigido por lei ou ordem judicial.
                </p>
              </div>
            </div>

            <hr className="border-border-light dark:border-slate-800" />

            {/* Section 4 */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary dark:bg-blue-600 text-white text-sm font-bold shadow-sm">
                  4
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary dark:text-white">
                  Disposições Gerais
                </h2>
              </div>
              <div className="pl-11 space-y-4 text-text-secondary dark:text-gray-400 text-sm leading-relaxed">
                <p>
                  <strong className="text-text-primary dark:text-gray-200">
                    4.1. Alterações.
                  </strong>{" "}
                  O Lasidra reserva-se o direito de alterar estes termos a
                  qualquer momento, sem aviso prévio. As alterações entrarão em
                  vigor imediatamente após sua publicação no portal.
                </p>
                <p>
                  <strong className="text-text-primary dark:text-gray-200">
                    4.2. Legislação Aplicável.
                  </strong>{" "}
                  Estes termos são regidos pela legislação da República
                  Federativa do Brasil. Eventuais disputas serão submetidas ao
                  foro da Comarca de Teresina, estado do Piauí.
                </p>
                <p>
                  <strong className="text-text-primary dark:text-gray-200">
                    4.3. Contato.
                  </strong>{" "}
                  Para dúvidas, sugestões ou solicitações relacionadas a estes
                  termos, entre em contato pelo e-mail{" "}
                  <a
                    href="mailto:lasidra@ufpi.edu.br"
                    className="text-primary hover:text-primary-light dark:text-blue-400 font-semibold transition-colors"
                  >
                    lasidra@ufpi.edu.br
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>

          {/* Last updated */}
          <div className="mt-12 pt-8 border-t border-border-light dark:border-slate-800 flex items-center gap-3 text-text-muted dark:text-gray-500 text-sm">
            <FileText className="w-4 h-4" />
            <p>
              <strong className="dark:text-gray-400">Última atualização:</strong> Junho de 2026
            </p>
          </div>

          {/* Agreement note */}
          <div className="mt-8 bg-primary-50 dark:bg-slate-900 rounded-xl p-6 flex items-start gap-4 border border-transparent dark:border-slate-800">
            <ShieldCheck className="w-6 h-6 text-primary dark:text-blue-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-text-primary dark:text-white mb-1">
                Ao utilizar o portal, você concorda
              </h3>
              <p className="text-xs text-text-secondary dark:text-gray-400 leading-relaxed">
                A utilização contínua do portal !Lasidra Avisa! após a publicação
                de quaisquer alterações nestes termos constitui aceitação dessas
                alterações. Recomendamos que você revise periodicamente esta
                página.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
