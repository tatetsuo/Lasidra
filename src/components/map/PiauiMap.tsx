"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { barragens, statusColor } from "@/data/barragens";

/* Ícone customizado vermelho para os marcadores */
const redIcon = new L.DivIcon({
  className: "custom-dam-marker",
  html: `
    <div style="
      position: relative;
      width: 28px;
      height: 28px;
    ">
      <div style="
        width: 16px;
        height: 16px;
        background: #DC2626;
        border: 3px solid #FFFFFF;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(220, 38, 38, 0.5);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      "></div>
      <div style="
        width: 28px;
        height: 28px;
        background: rgba(220, 38, 38, 0.15);
        border-radius: 50%;
        position: absolute;
        top: 0;
        left: 0;
        animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
      "></div>
    </div>
  `,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
  popupAnchor: [0, -14],
});

export default function PiauiMap() {
  return (
    <MapContainer
      center={[-7.0, -42.5]}
      zoom={7}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%", borderRadius: "0.75rem" }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {barragens.map((dam) => (
        <Marker key={dam.id} position={[dam.lat, dam.lng]} icon={redIcon}>
          <Popup>
            <div style={{ minWidth: 180, fontFamily: "Inter, sans-serif" }}>
              <h3
                style={{
                  margin: "0 0 6px 0",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#1A1A2E",
                }}
              >
                {dam.nome}
              </h3>
              <p
                style={{
                  margin: "0 0 3px 0",
                  fontSize: "12px",
                  color: "#4A5568",
                }}
              >
                📍 {dam.municipio}
              </p>
              <p
                style={{
                  margin: "0 0 6px 0",
                  fontSize: "12px",
                  color: "#4A5568",
                }}
              >
                🌊 {dam.rio}
              </p>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "2px 8px",
                  borderRadius: "9999px",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: statusColor(dam.status),
                  backgroundColor: `${statusColor(dam.status)}15`,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: statusColor(dam.status),
                    display: "inline-block",
                  }}
                />
                {dam.status}
              </span>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
