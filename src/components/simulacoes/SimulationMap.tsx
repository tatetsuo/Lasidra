"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { supabase } from "@/lib/supabase";

/* Ícone customizado roxo para simulações */
const purpleIcon = new L.DivIcon({
  className: "custom-sim-marker",
  html: `
    <div style="position: relative; width: 32px; height: 32px;">
      <div style="width: 18px; height: 18px; background: #9333EA; border: 3px solid #FFFFFF; border-radius: 50%; box-shadow: 0 2px 10px rgba(147, 51, 234, 0.6); position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 2;"></div>
      <div style="width: 32px; height: 32px; background: rgba(147, 51, 234, 0.15); border-radius: 50%; position: absolute; top: 0; left: 0; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
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

      {simulations.map((sim) => (
        <Marker key={sim.id} position={[sim.latitude, sim.longitude]} icon={purpleIcon}>
          <Popup>
            <div
              style={{
                minWidth: 220,
                fontFamily: "Inter, sans-serif",
                padding: "4px 0",
              }}
            >
              <h3
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#1A1A2E",
                  lineHeight: 1.3,
                }}
              >
                {sim.dam_name ? sim.dam_name : "Simulação Customizada"}
              </h3>

              <div style={{ marginBottom: 10 }}>
                <p style={{ margin: "0 0 4px 0", fontSize: "12px", color: "#4A5568", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>📍</span> Coord: {sim.latitude.toFixed(4)}, {sim.longitude.toFixed(4)}
                </p>
                <p style={{ margin: "0 0 4px 0", fontSize: "12px", color: "#4A5568", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>🌧️</span> Ruptura: {sim.rupture_type}
                </p>
              </div>

              <div style={{ height: 1, background: "#E5E7EB", margin: "0 0 10px 0" }} />

              <button
                onClick={() => onSelectSimulation(sim)}
                style={{
                  width: "100%",
                  padding: "8px 16px",
                  background: selectedSimulationId === sim.id ? "#7E22CE" : "#9333EA",
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
                  boxShadow: "0 2px 6px rgba(147, 51, 234, 0.3)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#7E22CE")}
                onMouseLeave={(e) => (e.currentTarget.style.background = selectedSimulationId === sim.id ? "#7E22CE" : "#9333EA")}
              >
                🔬 Ver Resultados
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
