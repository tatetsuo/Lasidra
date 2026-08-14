"use client";

import { useEffect, useState } from "react";
import { Lock, LogOut, MapPin, Activity, Pencil, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import dynamic from "next/dynamic";

const SimulationForm = dynamic(() => import("@/components/admin/SimulationForm"), {
  ssr: false,
});

export default function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const [activeTab, setActiveTab] = useState<"relatos" | "simulacoes">("relatos");
  
  // Relatos State
  const [reports, setReports] = useState<any[]>([]);
  
  // Simulações State
  const [simulations, setSimulations] = useState<any[]>([]);
  const [showSimForm, setShowSimForm] = useState(false);
  const [editingSimulation, setEditingSimulation] = useState<any>(null);
  const [formSimType, setFormSimType] = useState<"barragem" | "drenagem">("barragem");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      fetchReports();
      fetchSimulations();
    }
  }, [session]);

  const fetchReports = async () => {
    const { data, error } = await supabase.from("reports").select("*").order("created_at", { ascending: false });
    if (!error && data) {
      setReports(data);
    }
  };

  const fetchSimulations = async () => {
    const { data, error } = await supabase.from("simulations").select("*").order("created_at", { ascending: false });
    if (!error && data) {
      setSimulations(data);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert(error.message);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const updateReportStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase.from("reports").update({ status: newStatus }).eq("id", id);
    if (!error) {
      fetchReports();
    } else {
      alert("Erro ao atualizar status");
    }
  };

  const handleDeleteSimulation = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta simulação? Esta ação não pode ser desfeita.")) {
      const { error } = await supabase.from("simulations").delete().eq("id", id);
      if (!error) {
        fetchSimulations();
      } else {
        alert("Erro ao excluir simulação: " + error.message);
      }
    }
  };

  const handleEditSimulation = (sim: any) => {
    setEditingSimulation(sim);
    setFormSimType(sim.type || "barragem");
    setShowSimForm(true);
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-bg-primary dark:bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-500">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 dark:bg-blue-900/30">
              <Lock className="w-8 h-8 text-primary dark:text-blue-400" />
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Acesso Restrito
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white dark:bg-slate-900 py-8 px-4 shadow-xl dark:shadow-2xl sm:rounded-2xl sm:px-10 border border-gray-200 dark:border-slate-800 transition-colors duration-500">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <div className="mt-1">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-secondary dark:focus:ring-blue-500/50 focus:border-secondary dark:focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Senha</label>
                <div className="mt-1">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-secondary dark:focus:ring-blue-500/50 focus:border-secondary dark:focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-primary hover:bg-primary-light dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-colors"
                >
                  {loading ? "Entrando..." : "Entrar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary dark:bg-slate-950 transition-colors duration-500">
      <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-border-light dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto py-5 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Painel de Administração</h1>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-red-600 hover:bg-red-700 focus:outline-none transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        {/* Navegação por Abas */}
        <div className="mb-8 flex gap-6 border-b border-gray-200 dark:border-slate-700">
          <button
            onClick={() => setActiveTab("relatos")}
            className={`pb-4 px-2 font-semibold flex items-center gap-2 transition-colors ${
              activeTab === "relatos"
                ? "border-b-2 border-primary dark:border-blue-500 text-primary dark:text-blue-400"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <MapPin className="w-5 h-5" />
            Relatos
          </button>
          <button
            onClick={() => setActiveTab("simulacoes")}
            className={`pb-4 px-2 font-semibold flex items-center gap-2 transition-colors ${
              activeTab === "simulacoes"
                ? "border-b-2 border-primary dark:border-blue-500 text-primary dark:text-blue-400"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <Activity className="w-5 h-5" />
            Simulações
          </button>
        </div>

        {/* Tab de Relatos */}
        {activeTab === "relatos" && (
          <div className="bg-white dark:bg-slate-900 shadow-sm overflow-hidden sm:rounded-2xl border border-gray-200 dark:border-slate-800 transition-colors">
            <ul role="list" className="divide-y divide-gray-200 dark:divide-slate-800">
              {reports.map((report) => (
                <li key={report.id} className="p-5 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg font-bold text-primary dark:text-blue-400 truncate">{report.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Categoria: {report.category}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">{report.description}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                        Criado em: {new Date(report.created_at).toLocaleString('pt-BR')} | 
                        Coord: {report.latitude.toFixed(4)}, {report.longitude.toFixed(4)}
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex flex-col items-end gap-2">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                          report.status === "resolvido"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : report.status === "em andamento"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {report.status}
                      </span>
                      <div className="flex gap-2 mt-3">
                        {report.status !== "pendente" && (
                          <button
                            onClick={() => updateReportStatus(report.id, "pendente")}
                            className="text-xs font-semibold bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-lg border dark:border-slate-700 transition-colors"
                          >
                            Pendente
                          </button>
                        )}
                        {report.status !== "em andamento" && (
                          <button
                            onClick={() => updateReportStatus(report.id, "em andamento")}
                            className="text-xs font-semibold bg-yellow-50 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:hover:bg-yellow-900/40 text-yellow-800 dark:text-yellow-500 px-3 py-1.5 rounded-lg border border-yellow-200 dark:border-yellow-900/50 transition-colors"
                          >
                            Em Andamento
                          </button>
                        )}
                        {report.status !== "resolvido" && (
                          <button
                            onClick={() => updateReportStatus(report.id, "resolvido")}
                            className="text-xs font-semibold bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/40 text-green-800 dark:text-green-500 px-3 py-1.5 rounded-lg border border-green-200 dark:border-green-900/50 transition-colors"
                          >
                            Resolvido
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
              {reports.length === 0 && (
                <li className="p-8 text-center text-gray-500 dark:text-gray-400 font-medium">Nenhum relato encontrado.</li>
              )}
            </ul>
          </div>
        )}

        {/* Tab de Simulações */}
        {activeTab === "simulacoes" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Gerenciar Simulações</h2>
              {!showSimForm && (
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      setEditingSimulation(null);
                      setFormSimType("barragem");
                      setShowSimForm(true);
                    }}
                    className="px-4 py-2.5 bg-red-600 dark:bg-red-700 text-white font-bold rounded-lg shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-sm"
                  >
                    + Simulação de Barragem
                  </button>
                  <button
                    onClick={() => {
                      setEditingSimulation(null);
                      setFormSimType("drenagem");
                      setShowSimForm(true);
                    }}
                    className="px-4 py-2.5 bg-yellow-500 dark:bg-yellow-600 text-white font-bold rounded-lg shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-sm"
                  >
                    + Simulação de Drenagem
                  </button>
                </div>
              )}
            </div>

            {showSimForm ? (
              <SimulationForm
                simType={formSimType}
                initialData={editingSimulation}
                onSuccess={() => {
                  setShowSimForm(false);
                  setEditingSimulation(null);
                  fetchSimulations();
                }}
              />
            ) : (
              <div className="bg-white dark:bg-slate-900 shadow-sm overflow-hidden sm:rounded-2xl border border-gray-200 dark:border-slate-800 transition-colors">
                <ul role="list" className="divide-y divide-gray-200 dark:divide-slate-800">
                  {simulations.map((sim) => (
                    <li key={sim.id} className="p-5 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <h4 className="text-lg font-bold text-primary dark:text-blue-400">
                                {sim.dam_name ? sim.dam_name : "Ponto Customizado"}
                              </h4>
                              <span className={`px-2.5 py-1 text-xs font-bold rounded-lg ${sim.type === 'drenagem' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                                {sim.type === 'drenagem' ? 'Drenagem' : 'Barragem'}
                              </span>
                            </div>
                            <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
                              {new Date(sim.created_at).toLocaleString('pt-BR')}
                            </span>
                          </div>
                          
                          {/* Ações: Editar e Excluir */}
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditSimulation(sim)}
                              className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                              title="Editar"
                            >
                              <Pencil className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteSimulation(sim.id)}
                              className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                              title="Excluir"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-2">
                          {sim.type === 'barragem' || !sim.type ? (
                            <>
                              <div>
                                <strong className="block text-gray-500 dark:text-gray-400 text-xs uppercase mb-1">Ruptura/Drenagem</strong>
                                <span className="font-semibold text-gray-900 dark:text-gray-200">{sim.rupture_type}</span>
                              </div>
                              <div>
                                <strong className="block text-gray-500 dark:text-gray-400 text-xs uppercase mb-1">Alcance d'água</strong>
                                <span className="font-semibold text-gray-900 dark:text-gray-200">{sim.water_reach}</span>
                              </div>
                              <div>
                                <strong className="block text-gray-500 dark:text-gray-400 text-xs uppercase mb-1">Força de Chegada</strong>
                                <span className="font-semibold text-gray-900 dark:text-gray-200">{sim.arrival_force}</span>
                              </div>
                            </>
                          ) : (
                            <>
                              <div>
                                <strong className="block text-gray-500 dark:text-gray-400 text-xs uppercase mb-1">Volume (mm)</strong>
                                <span className="font-semibold text-gray-900 dark:text-gray-200">{sim.rain_volume}</span>
                              </div>
                              <div>
                                <strong className="block text-gray-500 dark:text-gray-400 text-xs uppercase mb-1">Intensidade (mm/h)</strong>
                                <span className="font-semibold text-gray-900 dark:text-gray-200">{sim.rain_intensity}</span>
                              </div>
                              <div>
                                <strong className="block text-gray-500 dark:text-gray-400 text-xs uppercase mb-1">Duração (hs)</strong>
                                <span className="font-semibold text-gray-900 dark:text-gray-200">{sim.rain_duration}</span>
                              </div>
                            </>
                          )}
                        </div>
                        
                        {sim.media_url && (
                          <div className="mt-2 text-xs font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1.5 bg-purple-50 dark:bg-purple-900/20 w-fit px-3 py-1.5 rounded-lg border border-purple-100 dark:border-purple-800/30">
                            📎 Contém Mídia Anexada
                          </div>
                        )}
                        
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 font-mono bg-gray-50 dark:bg-slate-800/50 w-fit px-2 py-1 rounded border border-gray-100 dark:border-slate-700/50">
                          Coord: {sim.latitude.toFixed(4)}, {sim.longitude.toFixed(4)}
                        </p>
                      </div>
                    </li>
                  ))}
                  {simulations.length === 0 && (
                    <li className="p-8 text-center text-gray-500 dark:text-gray-400 font-medium">Nenhuma simulação cadastrada.</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
