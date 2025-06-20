import { useState, useMemo } from "react";

export interface Shipment {
  id: string;
  origin: string;
  destination: string;
  cargo: string;
  weight: string;
  status: string;
  driver: string;
  date: string;
}

const initialShipments: Shipment[] = [
  {
    id: "ТР-2024-001",
    origin: "Москва",
    destination: "СПб",
    cargo: "Бытовая техника",
    weight: "12.5",
    status: "В пути",
    driver: "Иванов А.С.",
    date: "15.12.2024",
  },
  {
    id: "ТР-2024-002",
    origin: "Екатеринбург",
    destination: "Казань",
    cargo: "Продукты питания",
    weight: "8.2",
    status: "Доставлено",
    driver: "Петров В.М.",
    date: "14.12.2024",
  },
  {
    id: "ТР-2024-003",
    origin: "Новосибирск",
    destination: "Омск",
    cargo: "Стройматериалы",
    weight: "15.8",
    status: "Планируется",
    driver: "Сидоров П.К.",
    date: "16.12.2024",
  },
];

export const useShipments = () => {
  const [shipments, setShipments] = useState<Shipment[]>(initialShipments);

  const addShipment = (
    shipmentData: Omit<Shipment, "id" | "status" | "date">,
  ) => {
    const newShipment: Shipment = {
      ...shipmentData,
      id: `ТР-2024-${String(shipments.length + 1).padStart(3, "0")}`,
      status: "Планируется",
      date: new Date().toLocaleDateString("ru-RU"),
    };
    setShipments((prev) => [...prev, newShipment]);
  };

  const updateShipment = (id: string, updates: Partial<Shipment>) => {
    setShipments((prev) =>
      prev.map((shipment) =>
        shipment.id === id ? { ...shipment, ...updates } : shipment,
      ),
    );
  };

  const updateShipmentField = (
    id: string,
    field: keyof Shipment,
    value: string,
  ) => {
    updateShipment(id, { [field]: value });
  };

  const groupedByWeeks = useMemo(() => {
    const weeks: { [key: string]: Shipment[] } = {};

    shipments.forEach((shipment) => {
      const [day, month, year] = shipment.date.split(".");
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      const monday = new Date(date);
      monday.setDate(date.getDate() - date.getDay() + 1);
      const weekKey = monday.toLocaleDateString("ru-RU");

      if (!weeks[weekKey]) {
        weeks[weekKey] = [];
      }
      weeks[weekKey].push(shipment);
    });

    return Object.entries(weeks).sort((a, b) => {
      const dateA = new Date(a[0].split(".").reverse().join("-"));
      const dateB = new Date(b[0].split(".").reverse().join("-"));
      return dateB.getTime() - dateA.getTime();
    });
  }, [shipments]);

  return {
    shipments,
    addShipment,
    updateShipment,
    updateShipmentField,
    groupedByWeeks,
  };
};
