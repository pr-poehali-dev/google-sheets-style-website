import { ReactNode, MouseEvent } from "react";

interface ResizableHeaderProps {
  children: ReactNode;
  columnKey: string;
  width: number;
  onStartResize: (columnKey: string, startX: number) => void;
  isResizing: boolean;
  resizingColumn: string | null;
  className?: string;
}

const ResizableHeader = ({
  children,
  columnKey,
  width,
  onStartResize,
  isResizing,
  resizingColumn,
  className = "",
}: ResizableHeaderProps) => {
  const handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    onStartResize(columnKey, e.clientX);
  };

  const isCurrentlyResizing = resizingColumn === columnKey;

  return (
    <th
      className={`relative text-left py-2 px-3 font-semibold text-gray-700 text-xs ${className}`}
      style={{ width: `${width}px`, minWidth: "50px" }}
    >
      {children}
      <div
        className={`absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-blue-300 transition-colors ${
          isCurrentlyResizing ? "bg-blue-400" : ""
        } ${isResizing && !isCurrentlyResizing ? "pointer-events-none" : ""}`}
        onMouseDown={handleMouseDown}
        style={{
          opacity: isCurrentlyResizing ? 1 : 0.3,
          transition: "opacity 0.2s ease-in-out",
        }}
      />
    </th>
  );
};

export default ResizableHeader;
