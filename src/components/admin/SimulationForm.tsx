"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { barragens } from "@/data/barragens";
import dynamic from "next/dynamic";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

// Map click handler component
function MapClickHandler({ onClick }: { onClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function SimulationForm({ 
  onSuccess, 
  initialData,
  simType
}: { 
  onSuccess: () => void;
  initialData?: any;
  simType: "barragem" | "drenagem";
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [selectedDamId, setSelectedDamId] = useState<string>("");
  const [lat, setLat] = useState<number | "">("");
  const [lng, setLng] = useState<number | "">("");
  
  // Barragem fields
  const [ruptureType, setRuptureType] = useState("Overtopping (Galgamento)");
  const [customRupture, setCustomRupture] = useState("");
  const [waterReach, setWaterReach] = useState("");
  const [waterVelocity, setWaterVelocity] = useState("");
  const [waterDepth, setWaterDepth] = useState("");
  const [arrivalForce, setArrivalForce] = useState("");

  // Drenagem fields
  const [rainIntensity, setRainIntensity] = useState("");
  const [rainDuration, setRainDuration] = useState("");
  const [rainVolume, setRainVolume] = useState("");
  
  // Shared fields
  const [others, setOthers] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");

  useEffect(() => {
    if (initialData) {
      setLat(initialData.latitude);
      setLng(initialData.longitude);
      setSelectedDamId(initialData.dam_id || "");
      
      const commonRuptures = ["Overtopping (Galgamento)", "Piping (Piping interno)", "Falha Estrutural"];
      if (initialData.rupture_type) {
        if (commonRuptures.includes(initialData.rupture_type)) {
          setRuptureType(initialData.rupture_type);
        } else {
          setRuptureType("Outro");
          setCustomRupture(initialData.rupture_type);
        }
      }

      setWaterReach(initialData.water_reach || "");
      setWaterVelocity(initialData.water_velocity || "");
      setWaterDepth(initialData.water_depth || "");
      setArrivalForce(initialData.arrival_force || "");

      setRainIntensity(initialData.rain_intensity || "");
      setRainDuration(initialData.rain_duration || "");
      setRainVolume(initialData.rain_volume || "");

      setOthers(initialData.others || "");
      setMediaUrl(initialData.media_url || "");
    }
  }, [initialData]);

  const handleDamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedDamId(val);
    if (val !== "") {
      const dam = barragens.find((b) => b.id.toString() === val);
      if (dam) {
        setLat(dam.lat);
        setLng(dam.lng);
      }
    } else {
      setLat("");
      setLng("");
    }
  };

  const handleMapClick = (mapLat: number, mapLng: number) => {
    setSelectedDamId(""); // Custom point
    setLat(mapLat);
    setLng(mapLng);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lat === "" || lng === "") {
      setError("Por favor, selecione um local no mapa ou uma barragem.");
      return;
    }

    setLoading(true);
    setError(null);

    const finalRuptureType = ruptureType === "Outro" ? customRupture : ruptureType;
    let damName = "";
    if (selectedDamId !== "") {
      damName = barragens.find((b) => b.id.toString() === selectedDamId)?.nome || "";
    }

    const payload: any = {
      type: simType,
      latitude: lat,
      longitude: lng,
      dam_id: selectedDamId !== "" ? selectedDamId : null,
      dam_name: damName,
      others: others,
      media_url: mediaUrl,
    };

    if (simType === "barragem") {
      payload.rupture_type = finalRuptureType;
      payload.water_reach = waterReach;
      payload.water_velocity = waterVelocity;
      payload.water_depth = waterDepth;
      payload.arrival_force = arrivalForce;
      
      // Limpar campos de drenagem
      payload.rain_intensity = null;
      payload.rain_duration = null;
      payload.rain_volume = null;
    } else {
      payload.rain_intensity = rainIntensity;
      payload.rain_duration = rainDuration;
      payload.rain_volume = rainVolume;

      // Limpar campos de barragem
      payload.rupture_type = null;
      payload.water_reach = null;
      payload.water_velocity = null;
      payload.water_depth = null;
      payload.arrival_force = null;
    }

    let dbError;
    
    if (initialData && initialData.id) {
      // UPDATE
      const { error: updateError } = await supabase
        .from("simulations")
        .update(payload)
        .eq("id", initialData.id);
      dbError = updateError;
    } else {
      // INSERT
      const { error: insertError } = await supabase
        .from("simulations")
        .insert([payload]);
      dbError = insertError;
    }

    setLoading(false);

    if (dbError) {
      setError(dbError.message);
    } else {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl border border-gray-200 shadow-sm animate-fade-in-up">
      <h3 className="text-xl font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
        {simType === "barragem" ? "🚧 " : "🌧️ "}
        {initialData 
          ? \`Editar Simulação de \${simType === 'barragem' ? 'Barragem' : 'Drenagem'}\` 
          : \`Nova Simulação de \${simType === 'barragem' ? 'Barragem' : 'Drenagem'}\`}
      </h3>
      
      {error && <div className="p-3 bg-red-100 text-red-800 rounded-md text-sm">{error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lado Esquerdo: Localização */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-700">1. Localização</h4>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ponto Existente (Opcional)</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm p-2 border"
              value={selectedDamId}
              onChange={handleDamChange}
            >
              <option value="">-- Ponto Customizado (Clique no Mapa) --</option>
              {barragens.map((dam) => (
                <option key={dam.id} value={dam.id}>
                  {dam.nome} ({dam.municipio})
                </option>
              ))}
            </select>
          </div>
          
          <div className="text-sm text-gray-500">
            Ou clique no mapa para escolher uma coordenada específica:
          </div>

          <div className="h-[250px] w-full rounded-lg overflow-hidden border border-gray-300 relative z-0">
            <MapContainer
              center={initialData ? [initialData.latitude, initialData.longitude] : [-7.0, -42.5]}
              zoom={initialData ? 12 : 6}
              scrollWheelZoom={true}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <MapClickHandler onClick={handleMapClick} />
              {lat !== "" && lng !== "" && (
                <Marker position={[lat as number, lng as number]} icon={customIcon} />
              )}
            </MapContainer>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Latitude</label>
              <input type="number" step="any" required value={lat} onChange={(e) => setLat(parseFloat(e.target.value))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Longitude</label>
              <input type="number" step="any" required value={lng} onChange={(e) => setLng(parseFloat(e.target.value))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border sm:text-sm" />
            </div>
          </div>
        </div>

        {/* Lado Direito: Dados Técnicos */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-700">2. Parâmetros da Simulação</h4>
          
          {simType === "barragem" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tipo de Ruptura</label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border sm:text-sm"
                  value={ruptureType}
                  onChange={(e) => setRuptureType(e.target.value)}
                >
                  <option value="Overtopping (Galgamento)">Overtopping (Galgamento)</option>
                  <option value="Piping (Piping interno)">Piping (Piping interno)</option>
                  <option value="Falha Estrutural">Falha Estrutural</option>
                  <option value="Outro">Outro...</option>
                </select>
              </div>
              
              {ruptureType === "Outro" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Especifique o Tipo</label>
                  <input type="text" required value={customRupture} onChange={(e) => setCustomRupture(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border sm:text-sm" />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">Máximo alcance da Lâmina d'água</label>
                <input type="text" required value={waterReach} onChange={(e) => setWaterReach(e.target.value)} placeholder="Ex: 5 km" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border sm:text-sm" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Velocidade da água</label>
                  <input type="text" required value={waterVelocity} onChange={(e) => setWaterVelocity(e.target.value)} placeholder="Ex: 2 m/s" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border sm:text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Profundidade da água</label>
                  <input type="text" required value={waterDepth} onChange={(e) => setWaterDepth(e.target.value)} placeholder="Ex: 1.5 m" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border sm:text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Velocidade x Profundidade (Força de Chegada)</label>
                <input type="text" required value={arrivalForce} onChange={(e) => setArrivalForce(e.target.value)} placeholder="Ex: 3 m²/s" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border sm:text-sm" />
              </div>
            </>
          )}

          {simType === "drenagem" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Volume da Chuva (mm)</label>
                <input type="text" required value={rainVolume} onChange={(e) => setRainVolume(e.target.value)} placeholder="Ex: 120 mm" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border sm:text-sm" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Intensidade (mm/h)</label>
                  <input type="text" required value={rainIntensity} onChange={(e) => setRainIntensity(e.target.value)} placeholder="Ex: 30 mm/h" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border sm:text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Duração (hs)</label>
                  <input type="text" required value={rainDuration} onChange={(e) => setRainDuration(e.target.value)} placeholder="Ex: 4 hs" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border sm:text-sm" />
                </div>
              </div>
            </>
          )}

          <div className="pt-4 border-t">
            <label className="block text-sm font-medium text-gray-700">URL da Mídia (YouTube, Google Drive, Imgur)</label>
            <input type="url" value={mediaUrl} onChange={(e) => setMediaUrl(e.target.value)} placeholder="https://youtube.com/watch?v=..." className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border sm:text-sm text-purple-700 font-medium" />
            <p className="text-xs text-gray-500 mt-1">Insira um link para incorporar um vídeo ou foto à simulação.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Outros / Observações adicionais</label>
            <textarea rows={3} value={others} onChange={(e) => setOthers(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border sm:text-sm"></textarea>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t gap-3">
        <button
          type="button"
          onClick={() => onSuccess()}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 text-sm font-medium text-white bg-secondary border border-transparent rounded-md shadow-sm hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:opacity-50"
        >
          {loading ? "Salvando..." : (initialData ? "Salvar Alterações" : "Salvar Simulação")}
        </button>
      </div>
    </form>
  );
}
