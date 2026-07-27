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
    <section className="py-16 sm:py-20 bg-bg-primary" id="disaster-cards-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-alert-orange bg-alert-orange/10 px-3 py-1 rounded-full mb-4">
            <AlertTriangle className="w-3.5 h-3.5" />
            Desastres
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-3">
            Informação que Salva Vidas
          </h2>
          <p className="text-text-secondary text-sm sm:text-base max-w-2xl mx-auto">
            Mantenha-se informado sobre riscos de inundação, medidas preventivas
            e avanços tecnológicos no monitoramento hidrológico do Piauí.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {disasters.map((item, index) => (
            <article
              key={item.id}
              className="group bg-white rounded-xl border border-border-light shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden hover:-translate-y-1"
              id={`disaster-card-${item.id}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                {/* Tag badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${item.tagColor}`}
                  >
                    {item.tag}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-text-primary mb-2 leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
                  {item.description}
                </p>
                <button
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-light transition-colors group/btn"
                  aria-label={`Saiba mais sobre ${item.title}`}
                >
                  Saiba mais
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
