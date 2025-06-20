import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const Data = () => {
  const shipments = [
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "В пути":
        return "bg-blue-100 text-blue-800";
      case "Доставлено":
        return "bg-green-100 text-green-800";
      case "Планируется":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Данные по перевозкам
        </h1>
        <Button>
          <Icon name="Plus" className="h-4 w-4 mr-2" />
          Добавить заявку
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Все перевозки</CardTitle>
            <div className="flex items-center space-x-2">
              <Input placeholder="Поиск..." className="w-80" />
              <Button variant="outline">
                <Icon name="Filter" className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    № Заявки
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Откуда
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Куда
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Груз
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Вес, т
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Статус
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Водитель
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Дата
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody>
                {shipments.map((shipment) => (
                  <tr
                    key={shipment.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 font-medium text-blue-600">
                      {shipment.id}
                    </td>
                    <td className="py-3 px-4 text-gray-900">
                      {shipment.origin}
                    </td>
                    <td className="py-3 px-4 text-gray-900">
                      {shipment.destination}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {shipment.cargo}
                    </td>
                    <td className="py-3 px-4 text-gray-900">
                      {shipment.weight}
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(shipment.status)}>
                        {shipment.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-gray-900">
                      {shipment.driver}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{shipment.date}</td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm">
                        <Icon name="MoreHorizontal" className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Data;
