import React, { useState, useMemo } from "react";
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
import EditableCell from "@/components/EditableCell";

const Data = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingShipment, setEditingShipment] = useState<any>(null);

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
    {
      id: "ТР-2024-004",
      origin: "Красноярск",
      destination: "Иркутск",
      cargo: "Мебель",
      weight: "6.3",
      status: "В пути",
      driver: "Козлов Д.И.",
      date: "08.12.2024",
    },
    {
      id: "ТР-2024-005",
      origin: "Ростов-на-Дону",
      destination: "Волгоград",
      cargo: "Электроника",
      weight: "4.7",
      status: "Доставлено",
      driver: "Морозов С.А.",
      date: "09.12.2024",
    },
  ]);

  const updateShipmentField = (
    shipmentId: string,
    field: string,
    value: string,
  ) => {
    setShipments(
      shipments.map((shipment) =>
        shipment.id === shipmentId ? { ...shipment, [field]: value } : shipment,
      ),
    );
  };

  // Группировка заявок по неделям
  const groupedByWeeks = useMemo(() => {
    const weeks: { [key: string]: any[] } = {};

    shipments.forEach((shipment) => {
      const [day, month, year] = shipment.date.split(".");
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

      // Получаем понедельник недели
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

  const currentWeekData = groupedByWeeks[selectedWeek] || [null, []];
  const filteredShipments = currentWeekData[1].filter((shipment: any) => {
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

  const handleEditShipment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const updatedShipment = {
      ...editingShipment,
      id: formData.get("id") as string,
      origin: formData.get("origin") as string,
      destination: formData.get("destination") as string,
      cargo: formData.get("cargo") as string,
      weight: formData.get("weight") as string,
      status: formData.get("status") as string,
      driver: formData.get("driver") as string,
    };

    setShipments(
      shipments.map((shipment) =>
        shipment.id === editingShipment.id ? updatedShipment : shipment,
      ),
    );
    setIsEditDialogOpen(false);
    setEditingShipment(null);
  };

  const openEditDialog = (shipment: any) => {
    setEditingShipment(shipment);
    setIsEditDialogOpen(true);
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

      {/* Диалог редактирования */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Редактировать перевозку</DialogTitle>
          </DialogHeader>
          {editingShipment && (
            <form onSubmit={handleEditShipment} className="space-y-4">
              <div>
                <Label htmlFor="edit-id">Номер заявки</Label>
                <Input
                  id="edit-id"
                  name="id"
                  defaultValue={editingShipment.id}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-origin">Откуда</Label>
                  <Input
                    id="edit-origin"
                    name="origin"
                    defaultValue={editingShipment.origin}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="edit-destination">Куда</Label>
                  <Input
                    id="edit-destination"
                    name="destination"
                    defaultValue={editingShipment.destination}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-cargo">Груз</Label>
                <Input
                  id="edit-cargo"
                  name="cargo"
                  defaultValue={editingShipment.cargo}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-weight">Вес (тонн)</Label>
                  <Input
                    id="edit-weight"
                    name="weight"
                    type="number"
                    step="0.1"
                    defaultValue={editingShipment.weight}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="edit-driver">Водитель</Label>
                  <Input
                    id="edit-driver"
                    name="driver"
                    defaultValue={editingShipment.driver}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-status">Статус</Label>
                <Select name="status" defaultValue={editingShipment.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Планируется">Планируется</SelectItem>
                    <SelectItem value="В пути">В пути</SelectItem>
                    <SelectItem value="Доставлено">Доставлено</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditDialogOpen(false);
                    setEditingShipment(null);
                  }}
                >
                  Отмена
                </Button>
                <Button type="submit">Сохранить</Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Навигация по неделям */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Перевозки по неделям</CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedWeek(Math.max(0, selectedWeek - 1))}
                disabled={selectedWeek === 0}
              >
                <Icon name="ChevronLeft" className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium min-w-[200px] text-center">
                {currentWeekData[0] ? (
                  <>
                    Неделя с {currentWeekData[0]}
                    <span className="text-gray-500 ml-2">
                      ({currentWeekData[1].length} заявок)
                    </span>
                  </>
                ) : (
                  "Нет данных"
                )}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setSelectedWeek(
                    Math.min(groupedByWeeks.length - 1, selectedWeek + 1),
                  )
                }
                disabled={selectedWeek >= groupedByWeeks.length - 1}
              >
                <Icon name="ChevronRight" className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-600">
              Показано заявок: {filteredShipments.length}
            </div>
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
                      <EditableCell
                        value={shipment.id}
                        onSave={(value) =>
                          updateShipmentField(shipment.id, "id", value)
                        }
                        className="font-medium text-blue-600"
                      />
                    </td>
                    <td className="py-3 px-4 text-gray-900">
                      <EditableCell
                        value={shipment.origin}
                        onSave={(value) =>
                          updateShipmentField(shipment.id, "origin", value)
                        }
                        className="text-gray-900"
                      />
                    </td>
                    <td className="py-3 px-4 text-gray-900">
                      <EditableCell
                        value={shipment.destination}
                        onSave={(value) =>
                          updateShipmentField(shipment.id, "destination", value)
                        }
                        className="text-gray-900"
                      />
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      <EditableCell
                        value={shipment.cargo}
                        onSave={(value) =>
                          updateShipmentField(shipment.id, "cargo", value)
                        }
                        className="text-gray-600"
                      />
                    </td>
                    <td className="py-3 px-4 text-gray-900">
                      <EditableCell
                        value={shipment.weight}
                        onSave={(value) =>
                          updateShipmentField(shipment.id, "weight", value)
                        }
                        type="number"
                        className="text-gray-900"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <EditableCell
                        value={shipment.status}
                        onSave={(value) =>
                          updateShipmentField(shipment.id, "status", value)
                        }
                        type="status"
                      />
                    </td>
                    <td className="py-3 px-4 text-gray-900">
                      <EditableCell
                        value={shipment.driver}
                        onSave={(value) =>
                          updateShipmentField(shipment.id, "driver", value)
                        }
                        className="text-gray-900"
                      />
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      <EditableCell
                        value={shipment.date}
                        onSave={(value) =>
                          updateShipmentField(shipment.id, "date", value)
                        }
                        className="text-gray-600"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(shipment)}
                      >
                        <Icon name="Edit" className="h-4 w-4" />
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
