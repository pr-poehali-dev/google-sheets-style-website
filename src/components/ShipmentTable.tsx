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
    <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
      <table className="w-full table-fixed">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="text-left py-4 px-4 font-semibold text-gray-700 w-24 text-sm">
              № Заявки
            </th>
            <th className="text-left py-4 px-4 font-semibold text-gray-700 w-32 text-sm">
              Откуда
            </th>
            <th className="text-left py-4 px-4 font-semibold text-gray-700 w-32 text-sm">
              Куда
            </th>
            <th className="text-left py-4 px-4 font-semibold text-gray-700 w-40 text-sm">
              Груз
            </th>
            <th className="text-left py-4 px-4 font-semibold text-gray-700 w-20 text-sm">
              Вес, т
            </th>
            <th className="text-left py-4 px-4 font-semibold text-gray-700 w-32 text-sm">
              Статус
            </th>
            <th className="text-left py-4 px-4 font-semibold text-gray-700 w-32 text-sm">
              Водитель
            </th>
            <th className="text-left py-4 px-4 font-semibold text-gray-700 w-24 text-sm">
              Дата
            </th>
            <th className="text-left py-4 px-4 font-semibold text-gray-700 w-16 text-sm">
              Действия
            </th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment, index) => (
            <tr
              key={shipment.id}
              className={`border-b border-gray-100 hover:bg-blue-50 transition-colors h-14 ${
                index % 2 === 0 ? "bg-white" : "bg-blue-25"
              }`}
            >
              <td className="py-3 px-4 font-medium text-blue-600 w-24 text-sm">
                <EditableCell
                  value={shipment.id}
                  onSave={(value) => onUpdateField(shipment.id, "id", value)}
                  className="font-medium text-blue-600 text-sm"
                />
              </td>
              <td className="py-3 px-4 text-gray-900 w-32 text-sm">
                <EditableCell
                  value={shipment.origin}
                  onSave={(value) =>
                    onUpdateField(shipment.id, "origin", value)
                  }
                  className="text-gray-900 text-sm"
                />
              </td>
              <td className="py-3 px-4 text-gray-900 w-32 text-sm">
                <EditableCell
                  value={shipment.destination}
                  onSave={(value) =>
                    onUpdateField(shipment.id, "destination", value)
                  }
                  className="text-gray-900 text-sm"
                />
              </td>
              <td className="py-3 px-4 text-gray-700 w-40 text-sm">
                <EditableCell
                  value={shipment.cargo}
                  onSave={(value) => onUpdateField(shipment.id, "cargo", value)}
                  className="text-gray-700 text-sm"
                />
              </td>
              <td className="py-3 px-4 text-gray-900 w-20 text-sm">
                <EditableCell
                  value={shipment.weight}
                  onSave={(value) =>
                    onUpdateField(shipment.id, "weight", value)
                  }
                  type="number"
                  className="text-gray-900 text-sm"
                />
              </td>
              <td className="py-3 px-4 w-32 text-sm">
                <EditableCell
                  value={shipment.status}
                  onSave={(value) =>
                    onUpdateField(shipment.id, "status", value)
                  }
                  type="status"
                />
              </td>
              <td className="py-3 px-4 text-gray-900 w-32 text-sm">
                <EditableCell
                  value={shipment.driver}
                  onSave={(value) =>
                    onUpdateField(shipment.id, "driver", value)
                  }
                  className="text-gray-900 text-sm"
                />
              </td>
              <td className="py-3 px-4 text-gray-700 w-24 text-sm">
                <EditableCell
                  value={shipment.date}
                  onSave={(value) => onUpdateField(shipment.id, "date", value)}
                  className="text-gray-700 text-sm"
                />
              </td>
              <td className="py-3 px-4 w-16">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEditShipment(shipment)}
                  className="h-8 w-8 p-0 hover:bg-blue-100"
                >
                  <Icon name="Edit" className="h-4 w-4 text-gray-500" />
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
