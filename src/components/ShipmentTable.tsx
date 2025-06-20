import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import EditableCell from "@/components/EditableCell";
import { Shipment } from "@/hooks/useShipments";
import { useMemo } from "react";

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
  const groupedByDays = useMemo(() => {
    const groups: { [key: string]: Shipment[] } = {};

    shipments.forEach((shipment) => {
      const dateKey = shipment.date;
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(shipment);
    });

    return Object.entries(groups).sort((a, b) => {
      const dateA = new Date(a[0].split(".").reverse().join("-"));
      const dateB = new Date(b[0].split(".").reverse().join("-"));
      return dateB.getTime() - dateA.getTime();
    });
  }, [shipments]);

  if (shipments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Icon name="Package" className="h-12 w-12 mx-auto mb-4 text-gray-300" />
        <p>Перевозки не найдены</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {groupedByDays.map(([date, dayShipments]) => (
        <div key={date} className="bg-white rounded-lg border border-gray-200">
          <div className="bg-blue-50 px-6 py-3 border-b border-gray-200 rounded-t-lg">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <Icon name="Calendar" className="h-4 w-4" />
              {date} ({dayShipments.length} заявок)
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-2 px-3 font-semibold text-gray-700 w-20 text-xs">
                    Номер
                  </th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700 w-28 text-xs">
                    Откуда
                  </th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700 w-28 text-xs">
                    Куда
                  </th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700 w-36 text-xs">
                    Организация
                  </th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700 w-32 text-xs">
                    Водитель
                  </th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700 w-18 text-xs">
                    Кол-во
                  </th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700 w-28 text-xs">
                    Оператор
                  </th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700 w-20 text-xs">
                    Стоимость
                  </th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700 w-28 text-xs">
                    Вид оплаты
                  </th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700 w-12 text-xs"></th>
                </tr>
              </thead>
              <tbody>
                {dayShipments.map((shipment, index) => (
                  <tr
                    key={shipment.id}
                    className={`border-b border-gray-100 hover:bg-blue-50/50 hover:shadow-sm transition-all duration-200 ease-in-out h-10 ${
                      index % 2 === 0 ? "bg-white" : "bg-blue-25"
                    }`}
                  >
                    <td className="py-2 px-3 font-medium text-blue-600 w-20 text-xs whitespace-nowrap truncate">
                      <EditableCell
                        value={shipment.id}
                        onSave={(value) =>
                          onUpdateField(shipment.id, "id", value)
                        }
                        className="font-medium text-blue-600 text-xs whitespace-nowrap truncate"
                      />
                    </td>
                    <td className="py-2 px-3 text-gray-900 w-28 text-xs whitespace-nowrap truncate">
                      <EditableCell
                        value={shipment.origin}
                        onSave={(value) =>
                          onUpdateField(shipment.id, "origin", value)
                        }
                        className="text-gray-900 text-xs whitespace-nowrap truncate"
                      />
                    </td>
                    <td className="py-2 px-3 text-gray-900 w-28 text-xs whitespace-nowrap truncate">
                      <EditableCell
                        value={shipment.destination}
                        onSave={(value) =>
                          onUpdateField(shipment.id, "destination", value)
                        }
                        className="text-gray-900 text-xs whitespace-nowrap truncate"
                      />
                    </td>
                    <td className="py-2 px-3 text-gray-700 w-36 text-xs whitespace-nowrap truncate">
                      <EditableCell
                        value={shipment.organization}
                        onSave={(value) =>
                          onUpdateField(shipment.id, "organization", value)
                        }
                        className="text-gray-700 text-xs whitespace-nowrap truncate"
                      />
                    </td>
                    <td className="py-2 px-3 text-gray-900 w-32 text-xs">
                      <EditableCell
                        value={shipment.driver}
                        onSave={(value) =>
                          onUpdateField(shipment.id, "driver", value)
                        }
                        className="text-gray-900 text-xs"
                      />
                    </td>
                    <td className="py-2 px-3 text-gray-900 w-18 text-xs whitespace-nowrap truncate">
                      <EditableCell
                        value={shipment.quantity}
                        onSave={(value) =>
                          onUpdateField(shipment.id, "quantity", value)
                        }
                        type="number"
                        className="text-gray-900 text-xs whitespace-nowrap truncate"
                      />
                    </td>
                    <td className="py-2 px-3 text-gray-900 w-28 text-xs whitespace-nowrap truncate">
                      <EditableCell
                        value={shipment.operator}
                        onSave={(value) =>
                          onUpdateField(shipment.id, "operator", value)
                        }
                        className="text-gray-900 text-xs whitespace-nowrap truncate"
                      />
                    </td>
                    <td className="py-2 px-3 text-gray-900 w-20 text-xs whitespace-nowrap truncate">
                      <EditableCell
                        value={shipment.cost}
                        onSave={(value) =>
                          onUpdateField(shipment.id, "cost", value)
                        }
                        type="number"
                        className="text-gray-900 text-xs whitespace-nowrap truncate"
                      />
                    </td>
                    <td className="py-2 px-3 text-gray-900 w-28 text-xs whitespace-nowrap truncate">
                      <EditableCell
                        value={shipment.paymentType}
                        onSave={(value) =>
                          onUpdateField(shipment.id, "paymentType", value)
                        }
                        className="text-gray-900 text-xs whitespace-nowrap truncate"
                      />
                    </td>
                    <td className="py-2 px-3 w-12">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEditShipment(shipment)}
                        className="h-6 w-6 p-0 hover:bg-blue-100/60 hover:scale-105 transition-all duration-200 ease-in-out"
                      >
                        <Icon name="Edit" className="h-3 w-3 text-gray-500" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShipmentTable;
