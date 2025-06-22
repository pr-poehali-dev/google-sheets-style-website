import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import EditableCell from "@/components/EditableCell";
import ResizableHeader from "@/components/ResizableHeader";
import { Shipment } from "@/hooks/useShipments";
import { useColumnResize } from "@/hooks/useColumnResize";
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
  const sortedShipments = useMemo(() => {
    return [...shipments].sort((a, b) => {
      const dateA = new Date(a.date.split(".").reverse().join("-"));
      const dateB = new Date(b.date.split(".").reverse().join("-"));
      return dateA.getTime() - dateB.getTime();
    });
  }, [shipments]);

  const {
    columnSizes,
    isResizing,
    resizingColumn,
    startResize,
    resetColumnSizes,
  } = useColumnResize();

  if (shipments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Icon name="Package" className="h-12 w-12 mx-auto mb-4 text-gray-300" />
        <p>Перевозки не найдены</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="overflow-x-auto">
        <div className="flex justify-end p-2 border-b border-gray-100">
          <Button
            variant="ghost"
            size="sm"
            onClick={resetColumnSizes}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            <Icon name="RotateCcw" className="h-3 w-3 mr-1" />
            Сбросить размеры
          </Button>
        </div>
        <table className="w-full" style={{ tableLayout: "fixed" }}>
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <ResizableHeader
                columnKey="date"
                width={columnSizes.date || 100}
                onStartResize={startResize}
                isResizing={isResizing}
                resizingColumn={resizingColumn}
              >
                Дата
              </ResizableHeader>
              <ResizableHeader
                columnKey="id"
                width={columnSizes.id}
                onStartResize={startResize}
                isResizing={isResizing}
                resizingColumn={resizingColumn}
              >
                Номер
              </ResizableHeader>
              <ResizableHeader
                columnKey="origin"
                width={columnSizes.origin}
                onStartResize={startResize}
                isResizing={isResizing}
                resizingColumn={resizingColumn}
              >
                Откуда
              </ResizableHeader>
              <ResizableHeader
                columnKey="destination"
                width={columnSizes.destination}
                onStartResize={startResize}
                isResizing={isResizing}
                resizingColumn={resizingColumn}
              >
                Куда
              </ResizableHeader>
              <ResizableHeader
                columnKey="organization"
                width={columnSizes.organization}
                onStartResize={startResize}
                isResizing={isResizing}
                resizingColumn={resizingColumn}
              >
                Организация
              </ResizableHeader>
              <ResizableHeader
                columnKey="driver"
                width={columnSizes.driver}
                onStartResize={startResize}
                isResizing={isResizing}
                resizingColumn={resizingColumn}
              >
                Водитель
              </ResizableHeader>
              <ResizableHeader
                columnKey="quantity"
                width={columnSizes.quantity}
                onStartResize={startResize}
                isResizing={isResizing}
                resizingColumn={resizingColumn}
              >
                Кол-во
              </ResizableHeader>
              <ResizableHeader
                columnKey="operator"
                width={columnSizes.operator}
                onStartResize={startResize}
                isResizing={isResizing}
                resizingColumn={resizingColumn}
              >
                Оператор
              </ResizableHeader>
              <ResizableHeader
                columnKey="cost"
                width={columnSizes.cost}
                onStartResize={startResize}
                isResizing={isResizing}
                resizingColumn={resizingColumn}
              >
                Стоимость
              </ResizableHeader>
              <ResizableHeader
                columnKey="paymentType"
                width={columnSizes.paymentType}
                onStartResize={startResize}
                isResizing={isResizing}
                resizingColumn={resizingColumn}
              >
                Вид оплаты
              </ResizableHeader>
              <th
                className="text-left py-2 px-3 font-semibold text-gray-700 text-xs"
                style={{
                  width: `${columnSizes.actions}px`,
                  minWidth: "48px",
                }}
              ></th>
            </tr>
          </thead>
          <tbody>
            {sortedShipments.map((shipment, index) => (
              <tr
                key={shipment.id}
                className={`border-b border-gray-100 hover:bg-blue-50/50 hover:shadow-sm transition-all duration-200 ease-in-out h-10 ${
                  index % 2 === 0 ? "bg-white" : "bg-blue-25"
                }`}
              >
                <td
                  className="py-2 px-3 text-gray-700 text-xs whitespace-nowrap truncate"
                  style={{ width: `${columnSizes.date || 100}px` }}
                >
                  <EditableCell
                    value={shipment.date}
                    onSave={(value) =>
                      onUpdateField(shipment.id, "date", value)
                    }
                    className="text-gray-700 text-xs whitespace-nowrap truncate"
                  />
                </td>
                <td
                  className="py-2 px-3 font-medium text-blue-600 text-xs whitespace-nowrap truncate"
                  style={{ width: `${columnSizes.id}px` }}
                >
                  <EditableCell
                    value={shipment.id}
                    onSave={(value) => onUpdateField(shipment.id, "id", value)}
                    className="font-medium text-blue-600 text-xs whitespace-nowrap truncate"
                  />
                </td>
                <td
                  className="py-2 px-3 text-gray-900 text-xs whitespace-nowrap truncate"
                  style={{ width: `${columnSizes.origin}px` }}
                >
                  <EditableCell
                    value={shipment.origin}
                    onSave={(value) =>
                      onUpdateField(shipment.id, "origin", value)
                    }
                    className="text-gray-900 text-xs whitespace-nowrap truncate"
                  />
                </td>
                <td
                  className="py-2 px-3 text-gray-900 text-xs whitespace-nowrap truncate"
                  style={{ width: `${columnSizes.destination}px` }}
                >
                  <EditableCell
                    value={shipment.destination}
                    onSave={(value) =>
                      onUpdateField(shipment.id, "destination", value)
                    }
                    className="text-gray-900 text-xs whitespace-nowrap truncate"
                  />
                </td>
                <td
                  className="py-2 px-3 text-gray-700 text-xs whitespace-nowrap truncate"
                  style={{ width: `${columnSizes.organization}px` }}
                >
                  <EditableCell
                    value={shipment.organization}
                    onSave={(value) =>
                      onUpdateField(shipment.id, "organization", value)
                    }
                    className="text-gray-700 text-xs whitespace-nowrap truncate"
                  />
                </td>
                <td
                  className="py-2 px-3 text-gray-900 text-xs"
                  style={{ width: `${columnSizes.driver}px` }}
                >
                  <EditableCell
                    value={`${shipment.driver.surname} ${shipment.driver.firstName} ${shipment.driver.middleName}`}
                    onSave={(value) =>
                      onUpdateField(shipment.id, "driver", value)
                    }
                    className="text-gray-900 text-xs break-words"
                  />
                </td>
                <td
                  className="py-2 px-3 text-gray-900 text-xs whitespace-nowrap truncate"
                  style={{ width: `${columnSizes.quantity}px` }}
                >
                  <EditableCell
                    value={shipment.quantity}
                    onSave={(value) =>
                      onUpdateField(shipment.id, "quantity", value)
                    }
                    type="number"
                    className="text-gray-900 text-xs whitespace-nowrap truncate"
                  />
                </td>
                <td
                  className="py-2 px-3 text-gray-900 text-xs whitespace-nowrap truncate"
                  style={{ width: `${columnSizes.operator}px` }}
                >
                  <EditableCell
                    value={shipment.operator}
                    onSave={(value) =>
                      onUpdateField(shipment.id, "operator", value)
                    }
                    className="text-gray-900 text-xs whitespace-nowrap truncate"
                  />
                </td>
                <td
                  className="py-2 px-3 text-gray-900 text-xs whitespace-nowrap truncate"
                  style={{ width: `${columnSizes.cost}px` }}
                >
                  <EditableCell
                    value={shipment.cost}
                    onSave={(value) =>
                      onUpdateField(shipment.id, "cost", value)
                    }
                    type="number"
                    className="text-gray-900 text-xs whitespace-nowrap truncate"
                  />
                </td>
                <td
                  className="py-2 px-3 text-gray-900 text-xs whitespace-nowrap truncate"
                  style={{ width: `${columnSizes.paymentType}px` }}
                >
                  <EditableCell
                    value={shipment.paymentType}
                    onSave={(value) =>
                      onUpdateField(shipment.id, "paymentType", value)
                    }
                    className="text-gray-900 text-xs whitespace-nowrap truncate"
                  />
                </td>
                <td
                  className="py-2 px-3"
                  style={{ width: `${columnSizes.actions}px` }}
                >
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
  );
};

export default ShipmentTable;
