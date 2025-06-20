import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useShipments, Shipment } from "@/hooks/useShipments";
import ShipmentFilters from "@/components/ShipmentFilters";
import WeekNavigation from "@/components/WeekNavigation";
import ShipmentTable from "@/components/ShipmentTable";
import AddShipmentDialog from "@/components/AddShipmentDialog";
import EditShipmentDialog from "@/components/EditShipmentDialog";

const Data = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingShipment, setEditingShipment] = useState<Shipment | null>(null);

  const { addShipment, updateShipmentField, groupedByWeeks } = useShipments();

  const currentWeekData = groupedByWeeks[selectedWeek] || [null, []];

  const filteredShipments = useMemo(() => {
    return currentWeekData[1].filter((shipment: Shipment) => {
      const matchesSearch =
        shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shipment.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shipment.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shipment.driver.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || shipment.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [currentWeekData, searchTerm, statusFilter]);

  const handleAddShipment = (formData: FormData) => {
    addShipment({
      origin: formData.get("origin") as string,
      destination: formData.get("destination") as string,
      cargo: formData.get("cargo") as string,
      weight: formData.get("weight") as string,
      driver: formData.get("driver") as string,
    });
    setIsAddDialogOpen(false);
  };

  const handleEditShipment = (formData: FormData) => {
    if (!editingShipment) return;

    const updatedShipment = {
      id: formData.get("id") as string,
      origin: formData.get("origin") as string,
      destination: formData.get("destination") as string,
      cargo: formData.get("cargo") as string,
      weight: formData.get("weight") as string,
      status: formData.get("status") as string,
      driver: formData.get("driver") as string,
    };

    Object.entries(updatedShipment).forEach(([field, value]) => {
      updateShipmentField(editingShipment.id, field as keyof Shipment, value);
    });

    setIsEditDialogOpen(false);
    setEditingShipment(null);
  };

  const openEditDialog = (shipment: Shipment) => {
    setEditingShipment(shipment);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Данные по перевозкам
        </h1>
        <AddShipmentDialog
          isOpen={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onSubmit={handleAddShipment}
        />
      </div>

      <EditShipmentDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        shipment={editingShipment}
        onSubmit={handleEditShipment}
      />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Перевозки по неделям</CardTitle>
            <WeekNavigation
              selectedWeek={selectedWeek}
              onWeekChange={setSelectedWeek}
              currentWeekData={currentWeekData}
              totalWeeks={groupedByWeeks.length}
            />
          </div>
        </CardHeader>
        <CardContent>
          <ShipmentFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            filteredCount={filteredShipments.length}
          />
          <ShipmentTable
            shipments={filteredShipments}
            onUpdateField={updateShipmentField}
            onEditShipment={openEditDialog}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Data;
