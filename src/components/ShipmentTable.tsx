import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import EditableCell from "@/components/EditableCell";
import { Shipment } from "@/hooks/useShipments";

interface ShipmentTableProps {
  shipments: Shipment[];
  onUpdateField: (id: string, field: keyof Shipment, value: string) => void;
  onEditShipment: (shipment: Shipment) => void;
}

const ShipmentTable = ({
  shipments,
  onUpdateField,
  onEditShipment,
}: ShipmentTableProps) => {
  if (shipments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Icon name="Package" className="h-12 w-12 mx-auto mb-4 text-gray-300" />
        <p>Перевозки не найдены</p>
      </div>
    );
  }

  return (
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
                <EditableCell
                  value={shipment.id}
                  onSave={(value) => onUpdateField(shipment.id, "id", value)}
                  className="font-medium text-blue-600"
                />
              </td>
              <td className="py-3 px-4 text-gray-900">
                <EditableCell
                  value={shipment.origin}
                  onSave={(value) =>
                    onUpdateField(shipment.id, "origin", value)
                  }
                  className="text-gray-900"
                />
              </td>
              <td className="py-3 px-4 text-gray-900">
                <EditableCell
                  value={shipment.destination}
                  onSave={(value) =>
                    onUpdateField(shipment.id, "destination", value)
                  }
                  className="text-gray-900"
                />
              </td>
              <td className="py-3 px-4 text-gray-600">
                <EditableCell
                  value={shipment.cargo}
                  onSave={(value) => onUpdateField(shipment.id, "cargo", value)}
                  className="text-gray-600"
                />
              </td>
              <td className="py-3 px-4 text-gray-900">
                <EditableCell
                  value={shipment.weight}
                  onSave={(value) =>
                    onUpdateField(shipment.id, "weight", value)
                  }
                  type="number"
                  className="text-gray-900"
                />
              </td>
              <td className="py-3 px-4">
                <EditableCell
                  value={shipment.status}
                  onSave={(value) =>
                    onUpdateField(shipment.id, "status", value)
                  }
                  type="status"
                />
              </td>
              <td className="py-3 px-4 text-gray-900">
                <EditableCell
                  value={shipment.driver}
                  onSave={(value) =>
                    onUpdateField(shipment.id, "driver", value)
                  }
                  className="text-gray-900"
                />
              </td>
              <td className="py-3 px-4 text-gray-600">
                <EditableCell
                  value={shipment.date}
                  onSave={(value) => onUpdateField(shipment.id, "date", value)}
                  className="text-gray-600"
                />
              </td>
              <td className="py-3 px-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEditShipment(shipment)}
                >
                  <Icon name="Edit" className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShipmentTable;
