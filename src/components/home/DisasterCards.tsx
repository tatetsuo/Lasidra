"use client";

import Image from "next/image";
import { AlertTriangle, ArrowRight } from "lucide-react";

const disasters = [
  {
    id: "flood-alerts",
    image: "/images/flood-alert.png",
    title: "Alertas de Chuvas e Inundações: Informe-se e Proteja-se",
    description:
      "Acompanhe os alertas meteorológicos para o estado do Piauí e saiba como agir em situações de chuvas intensas e inundações nas áreas urbanas e rurais.",
    tag: "Alerta",
    tagColor: "bg-alert-red/10 text-alert-red",
  },
  {
    id: "flood-prevention",
    image: "/images/flood-prevention.png",
    title: "Como Prevenir Inundações em Piauí: Dicas Essenciais",
    description:
      "Conheça as medidas preventivas recomendadas por especialistas do Lasidra para minimizar os impactos de inundações em comunidades vulneráveis.",
    tag: "Prevenção",
    tagColor: "bg-alert-green/10 text-alert-green",
  },
  {
    id: "flood-mapping",
    image: "/images/flood-mapping.png",
    title: "Mapeamento de Áreas Alagadas: Tecnologia a Serviço da Segurança",
    description:
      "Utilizando tecnologias de geoprocessamento e sensoriamento remoto, o Lasidra mapeia áreas suscetíveis a inundações no Piauí com alta precisão.",
    tag: "Mapeamento",
    tagColor: "bg-alert-blue/10 text-alert-blue",
  },
];

export default function DisasterCards() {
  return (
    <section className="py-16 sm:py-24 bg-bg-primary dark:bg-slate-950 transition-colors duration-500" id="disaster-cards-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-alert-orange bg-alert-orange/10 dark:bg-alert-orange/20 px-4 py-1.5 rounded-full mb-4">
            <AlertTriangle className="w-4 h-4" />
            Desastres
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-primary dark:text-white mb-4 tracking-tight">
            Informação que Salva Vidas
          </h2>
          <p className="text-text-secondary dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto font-medium">
            Mantenha-se informado sobre riscos de inundação, medidas preventivas
            e avanços tecnológicos no monitoramento hidrológico do Piauí.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {disasters.map((item, index) => (
            <article
              key={item.id}
              className="group bg-white dark:bg-slate-900 rounded-2xl border border-border-light dark:border-slate-800 shadow-md hover:shadow-2xl dark:shadow-none dark:hover:shadow-[0_10px_40px_rgba(37,99,235,0.15)] transition-all duration-500 overflow-hidden hover:-translate-y-2 flex flex-col"
              id={`disaster-card-${item.id}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Tag badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold backdrop-blur-md bg-white/90 dark:bg-slate-900/90 shadow-sm ${item.tagColor.replace('/10', '/0')}`}
                  >
                    {item.tag}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                <h3 className="text-lg sm:text-xl font-bold text-text-primary dark:text-gray-100 mb-3 leading-tight line-clamp-2 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-text-secondary dark:text-gray-400 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3 flex-1">
                  {item.description}
                </p>
                <button
                  className="inline-flex items-center gap-2 text-sm font-bold text-primary dark:text-blue-400 hover:text-primary-light dark:hover:text-blue-300 transition-colors group/btn mt-auto"
                  aria-label={`Saiba mais sobre ${item.title}`}
                >
                  Saiba mais
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
