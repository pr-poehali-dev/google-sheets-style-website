import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Shipment } from "@/hooks/useShipments";

interface EditShipmentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  shipment: Shipment | null;
  onSubmit: (formData: FormData) => void;
}

const EditShipmentDialog = ({
  isOpen,
  onOpenChange,
  shipment,
  onSubmit,
}: EditShipmentDialogProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
  };

  if (!shipment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Редактировать перевозку</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="edit-id">Номер заявки</Label>
            <Input id="edit-id" name="id" defaultValue={shipment.id} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-origin">Откуда</Label>
              <Input
                id="edit-origin"
                name="origin"
                defaultValue={shipment.origin}
                required
              />
            </div>
            <div>
              <Label htmlFor="edit-destination">Куда</Label>
              <Input
                id="edit-destination"
                name="destination"
                defaultValue={shipment.destination}
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="edit-cargo">Груз</Label>
            <Input
              id="edit-cargo"
              name="cargo"
              defaultValue={shipment.cargo}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-weight">Вес (тонн)</Label>
              <Input
                id="edit-weight"
                name="weight"
                type="number"
                step="0.1"
                defaultValue={shipment.weight}
                required
              />
            </div>
            <div>
              <Label htmlFor="edit-driver">Водитель</Label>
              <Input
                id="edit-driver"
                name="driver"
                defaultValue={shipment.driver}
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="edit-status">Статус</Label>
            <Select name="status" defaultValue={shipment.status}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Планируется">Планируется</SelectItem>
                <SelectItem value="В пути">В пути</SelectItem>
                <SelectItem value="Доставлено">Доставлено</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Отмена
            </Button>
            <Button type="submit">Сохранить</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditShipmentDialog;
