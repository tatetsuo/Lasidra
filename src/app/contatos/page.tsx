"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Instagram,
  ExternalLink,
  Clock,
  CheckCircle2,
} from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    label: "Endereço",
    value:
      "Campus Universitário Ministro Petrônio Portella, Bairro Ininga, Teresina — PI, CEP 64049-550",
    href: "https://maps.google.com/?q=Universidade+Federal+do+Piauí+Teresina",
  },
  {
    icon: Mail,
    label: "E-mail",
    value: "lasidra@ufpi.edu.br",
    href: "mailto:lasidra@ufpi.edu.br",
  },
  {
    icon: Phone,
    label: "Telefone",
    value: "(86) 3121-5000",
    href: "tel:+558631215000",
  },
  {
    icon: Clock,
    label: "Horário de Funcionamento",
    value: "Segunda a Sexta, 8h às 17h",
    href: null,
  },
];

export default function ContatosPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    assunto: "",
    mensagem: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Visual-only form — no backend
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      {/* Page hero */}
      <section className="bg-gradient-hero text-white py-16 sm:py-20 transition-colors duration-500 border-b border-primary-light/10 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 mb-6">
            <Mail className="w-8 h-8 text-secondary" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Contatos
          </h1>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Entre em contato com o Lasidra para dúvidas, parcerias, solicitações
            de dados ou sugestões.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-20 bg-bg-primary dark:bg-slate-950 transition-colors duration-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            {/* Left column — Contact info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary dark:text-white mb-2">
                  Informações de Contato
                </h2>
                <p className="text-text-secondary dark:text-gray-400 text-sm leading-relaxed">
                  O Lasidra está localizado no campus principal da UFPI em
                  Teresina. Visite-nos ou entre em contato pelos canais abaixo.
                </p>
              </div>

              <div className="space-y-5">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-primary dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-text-muted dark:text-gray-500 mb-0.5">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={
                            item.href.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            item.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="text-sm text-text-primary dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 transition-colors font-medium"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm text-text-primary dark:text-gray-300 font-medium">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social */}
              <div className="pt-4 border-t border-border-light dark:border-slate-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-text-muted dark:text-gray-500 mb-3">
                  Redes Sociais
                </p>
                <a
                  href="https://www.instagram.com/lasidra_ufpi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                  id="contatos-instagram"
                >
                  <Instagram className="w-5 h-5" />
                  @lasidra_ufpi
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              </div>
            </div>

            {/* Right column — Contact form */}
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-border-light dark:border-slate-700 shadow-md dark:shadow-2xl p-6 sm:p-8 lg:p-10 transition-colors duration-500">
                <h2 className="text-xl font-bold text-text-primary dark:text-white mb-2">
                  Envie uma Mensagem
                </h2>
                <p className="text-text-secondary dark:text-gray-400 text-sm mb-8">
                  Preencha o formulário abaixo e entraremos em contato o mais
                  breve possível.
                </p>

                {formSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
                    <div className="w-16 h-16 rounded-full bg-alert-green/10 dark:bg-alert-green/20 flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-8 h-8 text-alert-green" />
                    </div>
                    <h3 className="text-lg font-bold text-text-primary dark:text-white mb-2">
                      Mensagem Enviada!
                    </h3>
                    <p className="text-text-secondary dark:text-gray-400 text-sm">
                      Obrigado pelo contato. Retornaremos em breve.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="contact-nome"
                          className="block text-sm font-semibold text-text-primary dark:text-gray-300 mb-1.5"
                        >
                          Nome Completo
                        </label>
                        <input
                          type="text"
                          id="contact-nome"
                          name="nome"
                          value={formData.nome}
                          onChange={handleChange}
                          required
                          placeholder="Seu nome"
                          className="w-full px-4 py-3 rounded-xl border border-border dark:border-slate-700 bg-bg-secondary dark:bg-slate-800 text-text-primary dark:text-white text-sm placeholder:text-text-muted dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-blue-500/30 focus:border-primary dark:focus:border-blue-500 transition-all"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-sm font-semibold text-text-primary dark:text-gray-300 mb-1.5"
                        >
                          E-mail
                        </label>
                        <input
                          type="email"
                          id="contact-email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="seu@email.com"
                          className="w-full px-4 py-3 rounded-xl border border-border dark:border-slate-700 bg-bg-secondary dark:bg-slate-800 text-text-primary dark:text-white text-sm placeholder:text-text-muted dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-blue-500/30 focus:border-primary dark:focus:border-blue-500 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-assunto"
                        className="block text-sm font-semibold text-text-primary dark:text-gray-300 mb-1.5"
                      >
                        Assunto
                      </label>
                      <select
                        id="contact-assunto"
                        name="assunto"
                        value={formData.assunto}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-border dark:border-slate-700 bg-bg-secondary dark:bg-slate-800 text-text-primary dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-blue-500/30 focus:border-primary dark:focus:border-blue-500 transition-all"
                      >
                        <option value="">Selecione um assunto</option>
                        <option value="duvida">Dúvida geral</option>
                        <option value="parceria">Proposta de parceria</option>
                        <option value="dados">Solicitação de dados</option>
                        <option value="bug">Reportar problema no portal</option>
                        <option value="sugestao">Sugestão</option>
                        <option value="outro">Outro</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-mensagem"
                        className="block text-sm font-semibold text-text-primary dark:text-gray-300 mb-1.5"
                      >
                        Mensagem
                      </label>
                      <textarea
                        id="contact-mensagem"
                        name="mensagem"
                        value={formData.mensagem}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Descreva sua mensagem..."
                        className="w-full px-4 py-3 rounded-xl border border-border dark:border-slate-700 bg-bg-secondary dark:bg-slate-800 text-text-primary dark:text-white text-sm placeholder:text-text-muted dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-blue-500/30 focus:border-primary dark:focus:border-blue-500 transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary hover:bg-primary-light text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-sm hover:-translate-y-0.5 w-full sm:w-auto justify-center"
                      id="contact-submit"
                    >
                      <Send className="w-4 h-4" />
                      Enviar Mensagem
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
