import { useState, useEffect, useCallback } from "react";

interface ColumnSizes {
  [key: string]: number;
}

const DEFAULT_COLUMN_SIZES: ColumnSizes = {
  id: 80,
  origin: 112,
  destination: 112,
  organization: 144,
  driver: 160,
  quantity: 72,
  operator: 112,
  cost: 80,
  paymentType: 112,
  actions: 48,
};

export const useColumnResize = (
  storageKey: string = "shipment-table-columns",
) => {
  const [columnSizes, setColumnSizes] = useState<ColumnSizes>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved
        ? { ...DEFAULT_COLUMN_SIZES, ...JSON.parse(saved) }
        : DEFAULT_COLUMN_SIZES;
    } catch {
      return DEFAULT_COLUMN_SIZES;
    }
  });

  const [isResizing, setIsResizing] = useState(false);
  const [resizingColumn, setResizingColumn] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(columnSizes));
    } catch (error) {
      console.warn("Failed to save column sizes:", error);
    }
  }, [columnSizes, storageKey]);

  const startResize = useCallback(
    (columnKey: string, startX: number) => {
      setIsResizing(true);
      setResizingColumn(columnKey);

      const startWidth = columnSizes[columnKey];

      const handleMouseMove = (e: MouseEvent) => {
        const diff = e.clientX - startX;
        const newWidth = Math.max(50, startWidth + diff);

        setColumnSizes((prev) => ({
          ...prev,
          [columnKey]: newWidth,
        }));
      };

      const handleMouseUp = () => {
        setIsResizing(false);
        setResizingColumn(null);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    },
    [columnSizes],
  );

  const resetColumnSizes = useCallback(() => {
    setColumnSizes(DEFAULT_COLUMN_SIZES);
  }, []);

  return {
    columnSizes,
    isResizing,
    resizingColumn,
    startResize,
    resetColumnSizes,
  };
};
