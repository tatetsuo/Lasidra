"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { barragens, statusColor } from "@/data/barragens";
import { supabase } from "@/lib/supabase";
import ReportForm from "../reports/ReportForm";

/* Ícone customizado vermelho para as barragens */
const redIcon = new L.DivIcon({
  className: "custom-dam-marker",
  html: `
    <div style="position: relative; width: 28px; height: 28px;">
      <div style="width: 16px; height: 16px; background: #DC2626; border: 3px solid #FFFFFF; border-radius: 50%; box-shadow: 0 2px 8px rgba(220, 38, 38, 0.5); position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"></div>
      <div style="width: 28px; height: 28px; background: rgba(220, 38, 38, 0.15); border-radius: 50%; position: absolute; top: 0; left: 0; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
    </div>
  `,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
  popupAnchor: [0, -14],
});

/* Ícone customizado azul para os relatos */
const blueIcon = new L.DivIcon({
  className: "custom-report-marker",
  html: `
    <div style="position: relative; width: 28px; height: 28px;">
      <div style="width: 16px; height: 16px; background: #2563EB; border: 3px solid #FFFFFF; border-radius: 50%; box-shadow: 0 2px 8px rgba(37, 99, 235, 0.5); position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"></div>
      <div style="width: 28px; height: 28px; background: rgba(37, 99, 235, 0.15); border-radius: 50%; position: absolute; top: 0; left: 0; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
    </div>
  `,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
  popupAnchor: [0, -14],
});

// Componente para capturar cliques no mapa
function MapClickHandler({ onClick }: { onClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function PiauiMap() {
  const [reports, setReports] = useState<any[]>([]);
  const [newReportLocation, setNewReportLocation] = useState<{ lat: number; lng: number } | null>(null);

  const fetchReports = async () => {
    const { data, error } = await supabase.from("reports").select("*");
    if (!error && data) {
      setReports(data);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleMapClick = (lat: number, lng: number) => {
    setNewReportLocation({ lat, lng });
  };

  const handleCloseForm = () => {
    setNewReportLocation(null);
  };

  const handleSuccessForm = () => {
    setNewReportLocation(null);
    fetchReports();
  };

  return (
    <>
      <MapContainer
        center={[-7.0, -42.5]}
        zoom={7}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%", borderRadius: "0.75rem" }}
        className="z-0 relative"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler onClick={handleMapClick} />

        {/* Marcadores de Barragens */}
        {barragens.map((dam) => (
          <Marker key={dam.id} position={[dam.lat, dam.lng]} icon={redIcon}>
            <Popup>
              <div style={{ minWidth: 180, fontFamily: "Inter, sans-serif" }}>
                <h3 style={{ margin: "0 0 6px 0", fontSize: "14px", fontWeight: 700, color: "#1A1A2E" }}>
                  {dam.nome}
                </h3>
                <p style={{ margin: "0 0 3px 0", fontSize: "12px", color: "#4A5568" }}>📍 {dam.municipio}</p>
                <p style={{ margin: "0 0 6px 0", fontSize: "12px", color: "#4A5568" }}>🌊 {dam.rio}</p>
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
                    style={{ width: 6, height: 6, borderRadius: "50%", background: statusColor(dam.status), display: "inline-block" }}
                  />
                  {dam.status}
                </span>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Marcadores de Relatos (Supabase) */}
        {reports.map((report) => (
          <Marker key={report.id} position={[report.latitude, report.longitude]} icon={blueIcon}>
            <Popup>
              <div style={{ minWidth: 180, fontFamily: "Inter, sans-serif" }}>
                <h3 style={{ margin: "0 0 6px 0", fontSize: "14px", fontWeight: 700, color: "#1A1A2E" }}>
                  {report.title}
                </h3>
                <p style={{ margin: "0 0 3px 0", fontSize: "12px", color: "#4A5568" }}>
                  🏷️ {report.category}
                </p>
                <p style={{ margin: "0 0 6px 0", fontSize: "12px", color: "#4A5568" }}>
                  {report.description}
                </p>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "2px 8px",
                    borderRadius: "9999px",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: report.status === "resolvido" ? "#16A34A" : report.status === "em andamento" ? "#D97706" : "#DC2626",
                    backgroundColor: report.status === "resolvido" ? "#16A34A15" : report.status === "em andamento" ? "#D9770615" : "#DC262615",
                  }}
                >
                  Status: {report.status}
                </span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {newReportLocation && (
        <ReportForm
          latitude={newReportLocation.lat}
          longitude={newReportLocation.lng}
          onClose={handleCloseForm}
          onSuccess={handleSuccessForm}
        />
      )}
    </>
  );
}
