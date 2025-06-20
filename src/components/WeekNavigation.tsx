import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface WeekNavigationProps {
  selectedWeek: number;
  onWeekChange: (week: number) => void;
  currentWeekData: [string, any[]] | [null, []];
  totalWeeks: number;
}

const WeekNavigation = ({
  selectedWeek,
  onWeekChange,
  currentWeekData,
  totalWeeks,
}: WeekNavigationProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onWeekChange(Math.max(0, selectedWeek - 1))}
        disabled={selectedWeek === 0}
      >
        <Icon name="ChevronLeft" className="h-4 w-4" />
      </Button>
      <span className="text-sm font-medium min-w-[200px] text-center">
        {currentWeekData[0] ? (
          <>
            Неделя с {currentWeekData[0]}
            <span className="text-gray-500 ml-2">
              ({currentWeekData[1].length} заявок)
            </span>
          </>
        ) : (
          "Нет данных"
        )}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onWeekChange(Math.min(totalWeeks - 1, selectedWeek + 1))}
        disabled={selectedWeek >= totalWeeks - 1}
      >
        <Icon name="ChevronRight" className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default WeekNavigation;
