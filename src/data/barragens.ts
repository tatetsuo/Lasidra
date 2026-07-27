export interface Dam {
  id: number;
  nome: string;
  municipio: string;
  rio: string;
  status: "Operacional" | "Monitoramento" | "Alerta";
  lat: number;
  lng: number;
}

/**
 * Dados mockados — Barragens reais do Piauí.
 * Serão substituídos por dados do backend/admin na próxima fase.
 */
export const barragens: Dam[] = [
  {
    id: 1,
    nome: "Barragem de Boa Esperança",
    municipio: "Guadalupe",
    rio: "Rio Parnaíba",
    status: "Operacional",
    lat: -6.75,
    lng: -43.58,
  },
  {
    id: 2,
    nome: "Barragem Pedra Redonda",
    municipio: "Oeiras",
    rio: "Rio Canindé",
    status: "Operacional",
    lat: -7.02,
    lng: -42.13,
  },
  {
    id: 3,
    nome: "Barragem do Bezerro",
    municipio: "José de Freitas",
    rio: "Rio Poti",
    status: "Monitoramento",
    lat: -4.75,
    lng: -42.58,
  },
  {
    id: 4,
    nome: "Barragem Salinas",
    municipio: "São Raimundo Nonato",
    rio: "Rio Piauí",
    status: "Operacional",
    lat: -9.01,
    lng: -42.7,
  },
  {
    id: 5,
    nome: "Barragem Piracuruca",
    municipio: "Piracuruca",
    rio: "Rio Piracuruca",
    status: "Monitoramento",
    lat: -3.93,
    lng: -41.71,
  },
  {
    id: 6,
    nome: "Barragem Jenipapo",
    municipio: "União",
    rio: "Rio Parnaíba",
    status: "Operacional",
    lat: -4.59,
    lng: -42.86,
  },
];

/** Cor do badge de status */
export function statusColor(status: Dam["status"]): string {
  switch (status) {
    case "Operacional":
      return "#16A34A";
    case "Monitoramento":
      return "#EA580C";
    case "Alerta":
      return "#DC2626";
    default:
      return "#4A5568";
  }
}
