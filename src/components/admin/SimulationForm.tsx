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
  const [returnPeriodTag, setReturnPeriodTag] = useState("");
  
  // Shared fields
  const [others, setOthers] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [customPointName, setCustomPointName] = useState("");
  const [customPoints, setCustomPoints] = useState<any[]>([]);

  useEffect(() => {
    const fetchCustomPoints = async () => {
      const { data } = await supabase
        .from("simulations")
        .select("dam_name, latitude, longitude")
        .is("dam_id", null);
      if (data) {
        const unique = Array.from(new Set(data.filter(d => d.dam_name).map(d => JSON.stringify({
          dam_name: d.dam_name,
          latitude: d.latitude,
          longitude: d.longitude
        })))).map(s => JSON.parse(s as string));
        setCustomPoints(unique);
      }
    };
    fetchCustomPoints();
  }, []);

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
      setReturnPeriodTag(initialData.return_period_tag || "");

      setOthers(initialData.others || "");
      setMediaUrl(initialData.media_url || "");
      setVideoUrl(initialData.video_url || "");
      
      // Migrate legacy media_url to image_urls if applicable
      let initImageUrls = initialData.image_urls || [];
      if (initImageUrls.length === 0 && initialData.media_url && initialData.media_url.match(/\.(jpeg|jpg|gif|png)$/i)) {
        initImageUrls = [initialData.media_url];
      }
      setImageUrls(initImageUrls);
    }
  }, [initialData]);

  const handleDamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedDamId(val);
    if (val.startsWith("custom_")) {
      const parts = val.split("_");
      setLat(parseFloat(parts[1]));
      setLng(parseFloat(parts[2]));
      setCustomPointName(parts.slice(3).join("_"));
    } else if (val !== "") {
      const dam = barragens.find((b) => b.id.toString() === val);
      if (dam) {
        setLat(dam.lat);
        setLng(dam.lng);
        setCustomPointName("");
      }
    } else {
      setLat("");
      setLng("");
      setCustomPointName("");
    }
  };

  const handleMapClick = (mapLat: number, mapLng: number) => {
    setSelectedDamId(""); // Custom point
    setCustomPointName("");
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
    let finalDamName = "";
    let finalDamId = null;
    
    if (selectedDamId !== "" && !selectedDamId.startsWith("custom_")) {
      finalDamName = barragens.find((b) => b.id.toString() === selectedDamId)?.nome || "";
      finalDamId = selectedDamId;
    } else {
      finalDamName = customPointName;
      finalDamId = null;
    }

    if (!finalDamName && finalDamId === null) {
      setError("Por favor, digite um nome para o Ponto Personalizado.");
      setLoading(false);
      return;
    }

    const finalImageUrls: string[] = [...imageUrls];

    if (imageFiles.length > 0) {
      try {
        const uploadPromises = imageFiles.map(async (file) => {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
          
          const { error: uploadError } = await supabase.storage
            .from('simulations')
            .upload(fileName, file);
            
          if (uploadError) {
            throw new Error(uploadError.message);
          }
          
          const { data: publicUrlData } = supabase.storage
            .from('simulations')
            .getPublicUrl(fileName);
            
          return publicUrlData.publicUrl;
        });

        const uploadedUrls = await Promise.all(uploadPromises);
        finalImageUrls.push(...uploadedUrls);
      } catch (err: any) {
        setError("Erro ao fazer upload de imagens: " + err.message);
        setLoading(false);
        return;
      }
    }

    const payload: any = {
      type: simType,
      latitude: lat,
      longitude: lng,
      dam_id: finalDamId,
      dam_name: finalDamName,
      others: others,
      media_url: mediaUrl,
      video_url: videoUrl,
      image_urls: finalImageUrls,
    };

    if (simType === "barragem") {
      payload.rupture_type = finalRuptureType;
      payload.water_reach = waterReach;
      payload.water_velocity = waterVelocity;
      payload.water_depth = waterDepth;
      payload.arrival_force = arrivalForce;
      
      // Limpar campos de drenagem
      payload.rain_intensity = "";
      payload.rain_duration = "";
      payload.rain_volume = "";
      payload.return_period_tag = "";
    } else {
      payload.rain_intensity = rainIntensity;
      payload.rain_duration = rainDuration;
      payload.rain_volume = rainVolume;
      payload.return_period_tag = returnPeriodTag;

      // Limpar campos de barragem
      payload.rupture_type = "";
      payload.water_reach = "";
      payload.water_velocity = "";
      payload.water_depth = "";
      payload.arrival_force = "";
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
          ? `Editar Simulação de ${simType === 'barragem' ? 'Barragem' : 'Drenagem'}` 
          : `Nova Simulação de ${simType === 'barragem' ? 'Barragem' : 'Drenagem'}`}
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
              <option value="">-- Ponto Customizado (Novo - Clique no Mapa) --</option>
              <optgroup label="Barragens Cadastradas">
                {barragens.map((dam) => (
                  <option key={dam.id} value={dam.id}>
                    {dam.nome} ({dam.municipio})
                  </option>
                ))}
              </optgroup>
              {customPoints.length > 0 && (
                <optgroup label="Pontos Personalizados (Anteriores)">
                  {customPoints.map((pt, idx) => (
                    <option key={`custom-${idx}`} value={`custom_${pt.latitude}_${pt.longitude}_${pt.dam_name}`}>
                      {pt.dam_name}
                    </option>
                  ))}
                </optgroup>
              )}
            </select>
          </div>

          {(selectedDamId === "" || selectedDamId.startsWith("custom_")) && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Nome do Ponto Personalizado</label>
              <input 
                type="text" 
                required 
                value={customPointName} 
                onChange={(e) => setCustomPointName(e.target.value)} 
                placeholder="Ex: Rio Parnaíba (Trecho Centro)" 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border sm:text-sm" 
              />
            </div>
          )}
          
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

              <div>
                <label className="block text-sm font-medium text-gray-700">Categoria (Anos de Retorno)</label>
                <select
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border sm:text-sm"
                  value={returnPeriodTag}
                  onChange={(e) => setReturnPeriodTag(e.target.value)}
                >
                  <option value="">-- Selecione uma Categoria --</option>
                  <option value="Muito frequente (até 10 anos de retorno)">Muito frequente (até 10 anos de retorno)</option>
                  <option value="Frequente (entre 10 e 50 anos de retorno)">Frequente (entre 10 e 50 anos de retorno)</option>
                  <option value="Raro (entre 50 a 100 anos de retorno)">Raro (entre 50 a 100 anos de retorno)</option>
                  <option value="Muito raro (entre 100 a 500 anos de retorno)">Muito raro (entre 100 a 500 anos de retorno)</option>
                  <option value="Raríssimo (entre 500 a 1000 anos de retorno)">Raríssimo (entre 500 a 1000 anos de retorno)</option>
                  <option value="Absurdo (mais de 1000 anos de retorno)">Absurdo (mais de 1000 anos de retorno)</option>
                </select>
              </div>
            </>
          )}

          <div className="pt-4 border-t space-y-4">
            <h4 className="font-semibold text-gray-700">3. Anexos e Mídia (Opcionais)</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Box de Imagem */}
              <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 flex flex-col justify-between">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">📸 Fotos / Mapas (Imagens)</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      if (e.target.files) {
                        setImageFiles(Array.from(e.target.files));
                      }
                    }}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-secondary/10 file:text-secondary
                      hover:file:bg-secondary/20
                    "
                  />
                  {imageFiles.length > 0 && (
                    <p className="text-xs text-blue-600 mt-2 font-medium">{imageFiles.length} arquivo(s) selecionado(s) pronto(s) para envio.</p>
                  )}
                  {imageUrls.length > 0 && (
                    <div className="mt-3 bg-white p-2 border border-gray-200 rounded-md">
                      <p className="text-xs text-green-700 font-medium mb-2">✅ {imageUrls.length} imagem(ns) já salva(s) na nuvem.</p>
                      <button 
                        type="button" 
                        onClick={() => setImageUrls([])} 
                        className="text-xs font-semibold text-red-600 hover:text-red-800 bg-red-50 px-2 py-1 rounded"
                      >
                        Apagar Todas as Salvas
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Box de Vídeo */}
              <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 flex flex-col justify-between">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">🎥 Entrevista / Explicação (Vídeo)</label>
                  <input 
                    type="url" 
                    value={videoUrl} 
                    onChange={(e) => setVideoUrl(e.target.value)} 
                    placeholder="https://youtube.com/watch?v=..." 
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border sm:text-sm text-red-600 font-medium" 
                  />
                  <p className="text-xs text-gray-500 mt-2">Insira um link do YouTube para exibir o reprodutor de vídeo incorporado.</p>
                </div>
              </div>
            </div>
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
