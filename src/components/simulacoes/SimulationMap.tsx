"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { barragens, statusColor, type Dam } from "@/data/barragens";

/* Ícone customizado vermelho para os marcadores */
const redIcon = new L.DivIcon({
  className: "custom-dam-marker",
  html: `
    <div style="
      position: relative;
      width: 32px;
      height: 32px;
    ">
      <div style="
        width: 18px;
        height: 18px;
        background: #DC2626;
        border: 3px solid #FFFFFF;
        border-radius: 50%;
        box-shadow: 0 2px 10px rgba(220, 38, 38, 0.6);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
      "></div>
      <div style="
        width: 32px;
        height: 32px;
        background: rgba(220, 38, 38, 0.15);
        border-radius: 50%;
        position: absolute;
        top: 0;
        left: 0;
        animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
      "></div>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

interface SimulationMapProps {
  onSelectDam: (dam: Dam) => void;
  selectedDamId?: number | null;
}

export default function SimulationMap({
  onSelectDam,
  selectedDamId,
}: SimulationMapProps) {
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

      {barragens.map((dam) => (
        <Marker key={dam.id} position={[dam.lat, dam.lng]} icon={redIcon}>
          <Popup>
            <div
              style={{
                minWidth: 220,
                fontFamily: "Inter, sans-serif",
                padding: "4px 0",
              }}
            >
              {/* Dam name */}
              <h3
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#1A1A2E",
                  lineHeight: 1.3,
                }}
              >
                {dam.nome}
              </h3>

              {/* Info rows */}
              <div style={{ marginBottom: 10 }}>
                <p
                  style={{
                    margin: "0 0 4px 0",
                    fontSize: "12px",
                    color: "#4A5568",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span>📍</span> {dam.municipio}
                </p>
                <p
                  style={{
                    margin: "0 0 4px 0",
                    fontSize: "12px",
                    color: "#4A5568",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span>🌊</span> {dam.rio}
                </p>
              </div>

              {/* Status badge */}
              <div
                style={{
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    padding: "3px 10px",
                    borderRadius: "9999px",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: statusColor(dam.status),
                    backgroundColor: `${statusColor(dam.status)}15`,
                  }}
                >
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: statusColor(dam.status),
                      display: "inline-block",
                    }}
                  />
                  {dam.status}
                </span>
              </div>

              {/* Divider */}
              <div
                style={{
                  height: 1,
                  background: "#E5E7EB",
                  margin: "0 0 10px 0",
                }}
              />

              {/* CTA Button */}
              <button
                onClick={() => onSelectDam(dam)}
                style={{
                  width: "100%",
                  padding: "8px 16px",
                  background:
                    selectedDamId === dam.id ? "#004A99" : "#003366",
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
                  boxShadow: "0 2px 6px rgba(0, 51, 102, 0.3)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#004A99")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background =
                    selectedDamId === dam.id ? "#004A99" : "#003366")
                }
              >
                🔬 Ver Simulações
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
