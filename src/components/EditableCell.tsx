import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditableCellProps {
  value: string;
  onSave: (newValue: string) => void;
  type?: "text" | "number" | "status";
  className?: string;
}

const EditableCell: React.FC<EditableCellProps> = ({
  value,
  onSave,
  type = "text",
  className = "",
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (editValue.trim() !== value) {
      onSave(editValue.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setEditValue(value);
      setIsEditing(false);
    }
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

  if (type === "status") {
    return (
      <div className={`w-full ${className}`}>
        {isEditing ? (
          <Select
            value={editValue}
            onValueChange={(newValue) => {
              setEditValue(newValue);
              onSave(newValue);
              setIsEditing(false);
            }}
            open={isEditing}
            onOpenChange={setIsEditing}
          >
            <SelectTrigger className="w-32 h-8 min-h-[2rem]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Планируется">Планируется</SelectItem>
              <SelectItem value="В пути">В пути</SelectItem>
              <SelectItem value="Доставлено">Доставлено</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <Badge
            className={`${getStatusColor(value)} cursor-pointer hover:opacity-80 min-h-[2rem] flex items-center justify-center`}
            onClick={() => setIsEditing(true)}
          >
            {value}
          </Badge>
        )}
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {isEditing ? (
        <Input
          ref={inputRef}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          type={type === "number" ? "number" : "text"}
          step={type === "number" ? "0.1" : undefined}
          className="h-8 min-h-[2rem] text-sm border-0 bg-transparent p-2 focus:bg-white focus:border focus:border-blue-300"
        />
      ) : (
        <div
          className="cursor-pointer hover:bg-gray-100 rounded px-2 py-1 min-h-[2rem] flex items-center w-full"
          onClick={() => setIsEditing(true)}
        >
          {value}
        </div>
      )}
    </div>
  );
};

export default EditableCell;
