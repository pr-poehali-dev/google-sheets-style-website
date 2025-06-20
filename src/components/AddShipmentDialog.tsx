import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";

interface AddShipmentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (formData: FormData) => void;
}

const AddShipmentDialog = ({
  isOpen,
  onOpenChange,
  onSubmit,
}: AddShipmentDialogProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Icon name="Plus" className="h-4 w-4 mr-2" />
          Добавить заявку
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Новая заявка на перевозку</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="origin">Откуда</Label>
              <Input id="origin" name="origin" required />
            </div>
            <div>
              <Label htmlFor="destination">Куда</Label>
              <Input id="destination" name="destination" required />
            </div>
          </div>
          <div>
            <Label htmlFor="cargo">Груз</Label>
            <Input id="cargo" name="cargo" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="weight">Вес (тонн)</Label>
              <Input
                id="weight"
                name="weight"
                type="number"
                step="0.1"
                required
              />
            </div>
            <div>
              <Label htmlFor="driver">Водитель</Label>
              <Input id="driver" name="driver" required />
            </div>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Отмена
            </Button>
            <Button type="submit">Создать заявку</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddShipmentDialog;
