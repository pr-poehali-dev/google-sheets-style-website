import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const RecentOrders = () => {
  const orders = [
    {
      id: "ТР-2024-001",
      route: "Москва → Санкт-Петербург",
      cargo: "Бытовая техника",
      weight: "12.5 т",
      status: "В пути",
      driver: "Иванов А.С.",
    },
    {
      id: "ТР-2024-002",
      route: "Екатеринбург → Казань",
      cargo: "Продукты питания",
      weight: "8.2 т",
      status: "Доставлено",
      driver: "Петров В.М.",
    },
    {
      id: "ТР-2024-003",
      route: "Новосибирск → Омск",
      cargo: "Стройматериалы",
      weight: "15.8 т",
      status: "Планируется",
      driver: "Сидоров П.К.",
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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Последние заявки</CardTitle>
        <Button variant="outline" size="sm">
          Все заявки
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="font-medium text-gray-900">{order.id}</span>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-1">{order.route}</p>
                <p className="text-xs text-gray-500">
                  {order.cargo} • {order.weight} • {order.driver}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentOrders;
