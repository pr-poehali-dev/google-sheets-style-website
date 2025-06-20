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
                  <th className="text-left py-4 px-4 font-semibold text-gray-700 w-20 text-sm">
                    Дата
                  </th>
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
                    Организация
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700 w-32 text-sm">
                    Водитель
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700 w-20 text-sm">
                    Количество
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700 w-32 text-sm">
                    Оператор
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700 w-24 text-sm">
                    Стоимость
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700 w-32 text-sm">
                    Вид оплаты
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700 w-16 text-sm">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody>
                {dayShipments.map((shipment, index) => (
                  <tr
                    key={shipment.id}
                    className={`border-b border-gray-100 hover:bg-blue-50/50 hover:shadow-sm transition-all duration-200 ease-in-out h-14 ${
                      index % 2 === 0 ? "bg-white" : "bg-blue-25"
                    }`}
                  >
                    <td className="py-3 px-4 text-gray-600 w-20 text-sm">
                      <EditableCell
                        value={shipment.date}
                        onSave={(value) =>
                          onUpdateField(shipment.id, "date", value)
                        }
                        className="text-gray-600 text-sm"
                      />
                    </td>
                    <td className="py-3 px-4 font-medium text-blue-600 w-24 text-sm">
                      <EditableCell
                        value={shipment.id}
                        onSave={(value) =>
                          onUpdateField(shipment.id, "id", value)
                        }
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
                        value={shipment.organization}
                        onSave={(value) =>
                          onUpdateField(shipment.id, "organization", value)
                        }
                        className="text-gray-700 text-sm"
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
                    <td className="py-3 px-4 text-gray-900 w-20 text-sm">
                      <EditableCell
                        value={shipment.quantity}
                        onSave={(value) =>
                          onUpdateField(shipment.id, "quantity", value)
                        }
                        type="number"
                        className="text-gray-900 text-sm"
                      />
                    </td>
                    <td className="py-3 px-4 text-gray-900 w-32 text-sm">
                      <EditableCell
                        value={shipment.operator}
                        onSave={(value) =>
                          onUpdateField(shipment.id, "operator", value)
                        }
                        className="text-gray-900 text-sm"
                      />
                    </td>
                    <td className="py-3 px-4 text-gray-900 w-24 text-sm">
                      <EditableCell
                        value={shipment.cost}
                        onSave={(value) =>
                          onUpdateField(shipment.id, "cost", value)
                        }
                        type="number"
                        className="text-gray-900 text-sm"
                      />
                    </td>
                    <td className="py-3 px-4 text-gray-900 w-32 text-sm">
                      <EditableCell
                        value={shipment.paymentType}
                        onSave={(value) =>
                          onUpdateField(shipment.id, "paymentType", value)
                        }
                        className="text-gray-900 text-sm"
                      />
                    </td>
                    <td className="py-3 px-4 w-16">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEditShipment(shipment)}
                        className="h-8 w-8 p-0 hover:bg-blue-100/60 hover:scale-105 transition-all duration-200 ease-in-out"
                      >
                        <Icon name="Edit" className="h-4 w-4 text-gray-500" />
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
