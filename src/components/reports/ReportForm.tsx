"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

interface ReportFormProps {
  latitude: number;
  longitude: number;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ReportForm({ latitude, longitude, onClose, onSuccess }: ReportFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Iluminação");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: dbError } = await supabase.from("reports").insert([
      {
        title,
        description,
        category,
        latitude,
        longitude,
        status: "pendente",
      },
    ]);

    setLoading(false);

    if (dbError) {
      setError(dbError.message);
    } else {
      onSuccess();
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Novo Relato</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Título</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm p-2 border"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Lâmpada queimada"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Categoria</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm p-2 border"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Iluminação">Iluminação</option>
              <option value="Segurança">Segurança</option>
              <option value="Infraestrutura">Infraestrutura</option>
              <option value="Limpeza">Limpeza</option>
              <option value="Outros">Outros</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Descrição</label>
            <textarea
              required
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm p-2 border"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detalhes do problema..."
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-secondary border border-transparent rounded-md hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:opacity-50"
            >
              {loading ? "Enviando..." : "Enviar Relato"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
