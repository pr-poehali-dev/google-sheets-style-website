import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ShipmentFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  filteredCount: number;
}

const ShipmentFilters = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  filteredCount,
}: ShipmentFiltersProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="text-xs text-gray-500">Показано: {filteredCount}</div>
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Поиск..."
          className="w-64 h-8"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
          <SelectTrigger className="w-32 h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все</SelectItem>
            <SelectItem value="В пути">В пути</SelectItem>
            <SelectItem value="Доставлено">Доставлено</SelectItem>
            <SelectItem value="Планируется">Планируется</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ShipmentFilters;
