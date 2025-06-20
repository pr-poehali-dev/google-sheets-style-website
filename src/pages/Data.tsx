import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";

const Data = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const [shipments, setShipments] = useState([
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
  ]);

  const filteredShipments = shipments.filter((shipment) => {
    const matchesSearch =
      shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.driver.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || shipment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleAddShipment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const newShipment = {
      id: `ТР-2024-${String(shipments.length + 1).padStart(3, "0")}`,
      origin: formData.get("origin") as string,
      destination: formData.get("destination") as string,
      cargo: formData.get("cargo") as string,
      weight: formData.get("weight") as string,
      status: "Планируется",
      driver: formData.get("driver") as string,
      date: new Date().toLocaleDateString("ru-RU"),
    };

    setShipments([...shipments, newShipment]);
    setIsAddDialogOpen(false);
  };

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
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Icon name="Plus" className="h-4 w-4 mr-2" />
              Добавить заявку
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Новая заявка на перевозку</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddShipment} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="origin">Откуда</Label>
                  <Input id="origin" name="origin" required />
                </div>
                <div>
                  <Label htmlFor="destination">Куда</Label>
                  <Input id="destination" name="destination" required />
                </div>
              </div>
              <div>
                <Label htmlFor="cargo">Груз</Label>
                <Input id="cargo" name="cargo" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="weight">Вес (тонн)</Label>
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    step="0.1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="driver">Водитель</Label>
                  <Input id="driver" name="driver" required />
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Отмена
                </Button>
                <Button type="submit">Создать заявку</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Все перевозки ({filteredShipments.length})</CardTitle>
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Поиск..."
                className="w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все статусы</SelectItem>
                  <SelectItem value="В пути">В пути</SelectItem>
                  <SelectItem value="Доставлено">Доставлено</SelectItem>
                  <SelectItem value="Планируется">Планируется</SelectItem>
                </SelectContent>
              </Select>
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
                {filteredShipments.map((shipment) => (
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
          {filteredShipments.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Icon
                name="Package"
                className="h-12 w-12 mx-auto mb-4 text-gray-300"
              />
              <p>Перевозки не найдены</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Data;
