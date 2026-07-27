import type { Metadata } from "next";
import { Scale, FileText, ShieldCheck, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Diretrizes de Uso e Direitos Autorais",
  description:
    "Termos de uso, política de privacidade e direitos autorais do portal UFPI !AVISA! do laboratório Lasidra.",
};

export default function DiretrizesPage() {
  return (
    <>
      {/* Page hero */}
      <section className="bg-gradient-hero text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 mb-6">
            <Scale className="w-8 h-8 text-secondary" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Diretrizes de Uso e Direitos Autorais
          </h1>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Termos e condições para utilização dos dados, simulações e conteúdos
            disponibilizados pelo portal UFPI !AVISA!.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-20 bg-bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Important notice */}
          <div className="bg-secondary-50 border border-secondary/20 rounded-xl p-6 mb-12 flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-secondary shrink-0 mt-0.5" />
            <div>
              <h2 className="text-base font-bold text-text-primary mb-1">
                Aviso Importante
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                Ao acessar e utilizar o portal UFPI !AVISA! e suas simulações,
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
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-white text-sm font-bold">
                  1
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
                  Termos de Uso
                </h2>
              </div>
              <div className="pl-11 space-y-4 text-text-secondary text-sm leading-relaxed">
                <p>
                  <strong className="text-text-primary">
                    1.1. Aceitação dos Termos.
                  </strong>{" "}
                  O acesso e a utilização do portal UFPI !AVISA!, incluindo
                  todas as simulações hidrológicas, mapas, dados e conteúdos
                  disponibilizados, estão condicionados à aceitação integral
                  destes Termos de Uso. Ao acessar o portal, o usuário declara
                  ter lido, compreendido e aceito todas as condições aqui
                  estabelecidas.
                </p>
                <p>
                  <strong className="text-text-primary">
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
                  <strong className="text-text-primary">
                    1.3. Limitação de Responsabilidade.
                  </strong>{" "}
                  O Lasidra e a UFPI não se responsabilizam por decisões tomadas
                  exclusivamente com base nos dados e simulações apresentados
                  neste portal. Os resultados devem ser utilizados apenas como
                  referência complementar a análises técnicas especializadas.
                </p>
                <p>
                  <strong className="text-text-primary">
                    1.4. Uso Permitido.
                  </strong>{" "}
                  O conteúdo do portal pode ser utilizado para fins acadêmicos,
                  educacionais e de pesquisa, desde que devidamente citada a
                  fonte (Lasidra/UFPI) e respeitadas as condições de direitos
                  autorais descritas na Seção 2.
                </p>
                <p>
                  <strong className="text-text-primary">
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

            <hr className="border-border-light" />

            {/* Section 2 */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-white text-sm font-bold">
                  2
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
                  Direitos Autorais e Propriedade Intelectual
                </h2>
              </div>
              <div className="pl-11 space-y-4 text-text-secondary text-sm leading-relaxed">
                <p>
                  <strong className="text-text-primary">
                    2.1. Titularidade.
                  </strong>{" "}
                  Todo o conteúdo disponibilizado no portal UFPI !AVISA! —
                  incluindo, mas não se limitando a, textos, imagens, mapas,
                  simulações, algoritmos, bases de dados e elementos gráficos —
                  é de propriedade intelectual do Lasidra e da Universidade
                  Federal do Piauí (UFPI), protegido pela legislação brasileira
                  de direitos autorais (Lei nº 9.610/1998) e pela legislação de
                  propriedade intelectual aplicável.
                </p>
                <p>
                  <strong className="text-text-primary">
                    2.2. Citação e Referência.
                  </strong>{" "}
                  A utilização dos dados e simulações em publicações acadêmicas,
                  relatórios técnicos ou materiais educacionais deve obrigatoriamente
                  incluir a seguinte citação:
                </p>
                <div className="bg-bg-secondary rounded-lg p-4 border border-border-light font-mono text-xs">
                  LASIDRA/UFPI. Portal UFPI !AVISA! — Simulações Hidrológicas e
                  Alertas Meteorológicos. Universidade Federal do Piauí,
                  Teresina, PI. Disponível em: [URL]. Acesso em: [data].
                </div>
                <p>
                  <strong className="text-text-primary">
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

            <hr className="border-border-light" />

            {/* Section 3 */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-white text-sm font-bold">
                  3
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
                  Política de Privacidade
                </h2>
              </div>
              <div className="pl-11 space-y-4 text-text-secondary text-sm leading-relaxed">
                <p>
                  <strong className="text-text-primary">
                    3.1. Coleta de Dados.
                  </strong>{" "}
                  O portal pode coletar dados de navegação anônimos (como
                  páginas visitadas e tempo de permanência) para fins de
                  melhoria contínua da plataforma. Nenhum dado pessoal é
                  coletado sem o consentimento explícito do usuário.
                </p>
                <p>
                  <strong className="text-text-primary">
                    3.2. Cookies.
                  </strong>{" "}
                  O portal pode utilizar cookies essenciais para o funcionamento
                  adequado do sistema. Cookies de análise serão utilizados
                  apenas com o consentimento do usuário.
                </p>
                <p>
                  <strong className="text-text-primary">
                    3.3. Compartilhamento.
                  </strong>{" "}
                  Os dados de navegação coletados não serão compartilhados com
                  terceiros, exceto quando exigido por lei ou ordem judicial.
                </p>
              </div>
            </div>

            <hr className="border-border-light" />

            {/* Section 4 */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-white text-sm font-bold">
                  4
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
                  Disposições Gerais
                </h2>
              </div>
              <div className="pl-11 space-y-4 text-text-secondary text-sm leading-relaxed">
                <p>
                  <strong className="text-text-primary">
                    4.1. Alterações.
                  </strong>{" "}
                  O Lasidra reserva-se o direito de alterar estes termos a
                  qualquer momento, sem aviso prévio. As alterações entrarão em
                  vigor imediatamente após sua publicação no portal.
                </p>
                <p>
                  <strong className="text-text-primary">
                    4.2. Legislação Aplicável.
                  </strong>{" "}
                  Estes termos são regidos pela legislação da República
                  Federativa do Brasil. Eventuais disputas serão submetidas ao
                  foro da Comarca de Teresina, estado do Piauí.
                </p>
                <p>
                  <strong className="text-text-primary">
                    4.3. Contato.
                  </strong>{" "}
                  Para dúvidas, sugestões ou solicitações relacionadas a estes
                  termos, entre em contato pelo e-mail{" "}
                  <a
                    href="mailto:lasidra@ufpi.edu.br"
                    className="text-primary hover:text-primary-light font-semibold transition-colors"
                  >
                    lasidra@ufpi.edu.br
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>

          {/* Last updated */}
          <div className="mt-12 pt-8 border-t border-border-light flex items-center gap-3 text-text-muted text-sm">
            <FileText className="w-4 h-4" />
            <p>
              <strong>Última atualização:</strong> Junho de 2026
            </p>
          </div>

          {/* Agreement note */}
          <div className="mt-8 bg-primary-50 rounded-xl p-6 flex items-start gap-4">
            <ShieldCheck className="w-6 h-6 text-primary shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-text-primary mb-1">
                Ao utilizar o portal, você concorda
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                A utilização contínua do portal UFPI !AVISA! após a publicação
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
