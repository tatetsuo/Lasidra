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
      <div className="min-h-screen bg-bg-primary flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10">
              <Lock className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Acesso Restrito
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <div className="mt-1">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Senha</label>
                <div className="mt-1">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
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
    <div className="min-h-screen bg-bg-primary">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Painel de Administração</h1>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none"
          >
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Navegação por Abas */}
        <div className="mb-6 flex gap-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("relatos")}
            className={`pb-4 px-2 font-medium flex items-center gap-2 transition-colors ${
              activeTab === "relatos"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <MapPin className="w-5 h-5" />
            Relatos
          </button>
          <button
            onClick={() => setActiveTab("simulacoes")}
            className={`pb-4 px-2 font-medium flex items-center gap-2 transition-colors ${
              activeTab === "simulacoes"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Activity className="w-5 h-5" />
            Simulações
          </button>
        </div>

        {/* Tab de Relatos */}
        {activeTab === "relatos" && (
          <div className="bg-white shadow overflow-hidden sm:rounded-md border border-gray-200">
            <ul role="list" className="divide-y divide-gray-200">
              {reports.map((report) => (
                <li key={report.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg font-bold text-primary truncate">{report.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">Categoria: {report.category}</p>
                      <p className="text-sm text-gray-700 mt-2">{report.description}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        Criado em: {new Date(report.created_at).toLocaleString('pt-BR')} | 
                        Coord: {report.latitude.toFixed(4)}, {report.longitude.toFixed(4)}
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex flex-col items-end gap-2">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          report.status === "resolvido"
                            ? "bg-green-100 text-green-800"
                            : report.status === "em andamento"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {report.status}
                      </span>
                      <div className="flex gap-2 mt-2">
                        {report.status !== "pendente" && (
                          <button
                            onClick={() => updateReportStatus(report.id, "pendente")}
                            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded border"
                          >
                            Pendente
                          </button>
                        )}
                        {report.status !== "em andamento" && (
                          <button
                            onClick={() => updateReportStatus(report.id, "em andamento")}
                            className="text-xs bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-2 py-1 rounded border"
                          >
                            Em Andamento
                          </button>
                        )}
                        {report.status !== "resolvido" && (
                          <button
                            onClick={() => updateReportStatus(report.id, "resolvido")}
                            className="text-xs bg-green-100 hover:bg-green-200 text-green-800 px-2 py-1 rounded border"
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
                <li className="p-8 text-center text-gray-500">Nenhum relato encontrado.</li>
              )}
            </ul>
          </div>
        )}

        {/* Tab de Simulações */}
        {activeTab === "simulacoes" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Gerenciar Simulações</h2>
              {!showSimForm && (
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setEditingSimulation(null);
                      setFormSimType("barragem");
                      setShowSimForm(true);
                    }}
                    className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700"
                  >
                    + Simulação de Barragem
                  </button>
                  <button
                    onClick={() => {
                      setEditingSimulation(null);
                      setFormSimType("drenagem");
                      setShowSimForm(true);
                    }}
                    className="px-4 py-2 bg-yellow-500 text-white font-medium rounded-md hover:bg-yellow-600"
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
              <div className="bg-white shadow overflow-hidden sm:rounded-md border border-gray-200">
                <ul role="list" className="divide-y divide-gray-200">
                  {simulations.map((sim) => (
                    <li key={sim.id} className="p-4 hover:bg-gray-50">
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-lg font-bold text-primary">
                                {sim.dam_name ? sim.dam_name : "Ponto Customizado"}
                              </h4>
                              <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${sim.type === 'drenagem' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                {sim.type === 'drenagem' ? 'Drenagem' : 'Barragem'}
                              </span>
                            </div>
                            <span className="text-xs text-gray-400">
                              {new Date(sim.created_at).toLocaleString('pt-BR')}
                            </span>
                          </div>
                          
                          {/* Ações: Editar e Excluir */}
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditSimulation(sim)}
                              className="inline-flex items-center justify-center p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                              title="Editar"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteSimulation(sim.id)}
                              className="inline-flex items-center justify-center p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                              title="Excluir"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-2">
                          {sim.type === 'barragem' || !sim.type ? (
                            <>
                              <div>
                                <strong className="block text-gray-500">Ruptura/Drenagem</strong>
                                <span>{sim.rupture_type}</span>
                              </div>
                              <div>
                                <strong className="block text-gray-500">Alcance d'água</strong>
                                <span>{sim.water_reach}</span>
                              </div>
                              <div>
                                <strong className="block text-gray-500">Força de Chegada</strong>
                                <span>{sim.arrival_force}</span>
                              </div>
                            </>
                          ) : (
                            <>
                              <div>
                                <strong className="block text-gray-500">Volume (mm)</strong>
                                <span>{sim.rain_volume}</span>
                              </div>
                              <div>
                                <strong className="block text-gray-500">Intensidade (mm/h)</strong>
                                <span>{sim.rain_intensity}</span>
                              </div>
                              <div>
                                <strong className="block text-gray-500">Duração (hs)</strong>
                                <span>{sim.rain_duration}</span>
                              </div>
                            </>
                          )}
                        </div>
                        
                        {sim.media_url && (
                          <div className="mt-2 text-xs font-medium text-purple-600 flex items-center gap-1">
                            📎 Contém Mídia Anexada
                          </div>
                        )}
                        
                        <p className="text-xs text-gray-400 mt-2">
                          Coord: {sim.latitude.toFixed(4)}, {sim.longitude.toFixed(4)}
                        </p>
                      </div>
                    </li>
                  ))}
                  {simulations.length === 0 && (
                    <li className="p-8 text-center text-gray-500">Nenhuma simulação cadastrada.</li>
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
