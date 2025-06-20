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
    <div className="flex items-center justify-between mb-4">
      <div className="text-sm text-gray-600">
        Показано заявок: {filteredCount}
      </div>
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Поиск..."
          className="w-80"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все статусы</SelectItem>
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
