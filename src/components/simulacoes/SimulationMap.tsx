"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { supabase } from "@/lib/supabase";

/* Ícone customizado vermelho para barragens */
const redIcon = new L.DivIcon({
  className: "custom-dam-marker",
  html: `
    <div style="position: relative; width: 32px; height: 32px;">
      <div style="width: 18px; height: 18px; background: #DC2626; border: 3px solid #FFFFFF; border-radius: 50%; box-shadow: 0 2px 10px rgba(220, 38, 38, 0.6); position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 2;"></div>
      <div style="width: 32px; height: 32px; background: rgba(220, 38, 38, 0.15); border-radius: 50%; position: absolute; top: 0; left: 0; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

/* Ícone customizado amarelo para drenagem */
const yellowIcon = new L.DivIcon({
  className: "custom-rain-marker",
  html: `
    <div style="position: relative; width: 32px; height: 32px;">
      <div style="width: 18px; height: 18px; background: #EAB308; border: 3px solid #FFFFFF; border-radius: 50%; box-shadow: 0 2px 10px rgba(234, 179, 8, 0.6); position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 2;"></div>
      <div style="width: 32px; height: 32px; background: rgba(234, 179, 8, 0.15); border-radius: 50%; position: absolute; top: 0; left: 0; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

interface SimulationMapProps {
  onSelectSimulation: (sim: any) => void;
  selectedSimulationId?: string | null;
}

export default function SimulationMap({
  onSelectSimulation,
  selectedSimulationId,
}: SimulationMapProps) {
  const [simulations, setSimulations] = useState<any[]>([]);

  useEffect(() => {
    const fetchSimulations = async () => {
      const { data, error } = await supabase.from("simulations").select("*");
      if (!error && data) {
        setSimulations(data);
      }
    };
    fetchSimulations();
  }, []);

  return (
    <MapContainer
      center={[-7.0, -42.5]}
      zoom={7}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {simulations.map((sim) => {
        const isDrenagem = sim.type === 'drenagem';
        const icon = isDrenagem ? yellowIcon : redIcon;
        const mainColor = isDrenagem ? "#EAB308" : "#DC2626";
        const hoverColor = isDrenagem ? "#CA8A04" : "#B91C1C";

        return (
          <Marker key={sim.id} position={[sim.latitude, sim.longitude]} icon={icon}>
            <Popup>
              <div
                style={{
                  minWidth: 220,
                  fontFamily: "Inter, sans-serif",
                  padding: "4px 0",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                  <h3
                    style={{
                      margin: "0",
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "#1A1A2E",
                      lineHeight: 1.3,
                    }}
                  >
                    {sim.dam_name ? sim.dam_name : "Ponto Customizado"}
                  </h3>
                  <span style={{ 
                    background: isDrenagem ? "#FEF9C3" : "#FEE2E2", 
                    color: isDrenagem ? "#854D0E" : "#991B1B", 
                    padding: "2px 6px", 
                    borderRadius: "9999px", 
                    fontSize: "10px", 
                    fontWeight: "bold" 
                  }}>
                    {isDrenagem ? "Drenagem" : "Barragem"}
                  </span>
                </div>

                <div style={{ marginBottom: 10 }}>
                  <p style={{ margin: "0 0 4px 0", fontSize: "12px", color: "#4A5568", display: "flex", alignItems: "center", gap: "6px" }}>
                    <span>📍</span> Coord: {sim.latitude.toFixed(4)}, {sim.longitude.toFixed(4)}
                  </p>
                  {!isDrenagem && sim.rupture_type && (
                    <p style={{ margin: "0 0 4px 0", fontSize: "12px", color: "#4A5568", display: "flex", alignItems: "center", gap: "6px" }}>
                      <span>🌊</span> Ruptura: {sim.rupture_type}
                    </p>
                  )}
                  {isDrenagem && sim.rain_volume && (
                    <p style={{ margin: "0 0 4px 0", fontSize: "12px", color: "#4A5568", display: "flex", alignItems: "center", gap: "6px" }}>
                      <span>🌧️</span> Volume: {sim.rain_volume}
                    </p>
                  )}
                </div>

                <div style={{ height: 1, background: "#E5E7EB", margin: "0 0 10px 0" }} />

                <button
                  onClick={() => onSelectSimulation(sim)}
                  style={{
                    width: "100%",
                    padding: "8px 16px",
                    background: selectedSimulationId === sim.id ? hoverColor : mainColor,
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    transition: "background 0.2s",
                    boxShadow: `0 2px 6px ${mainColor}40`,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = hoverColor)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = selectedSimulationId === sim.id ? hoverColor : mainColor)}
                >
                  🔬 Ver Resultados
                </button>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
