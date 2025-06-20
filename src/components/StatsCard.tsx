import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: string;
  trend: "up" | "down";
}

const StatsCard = ({ title, value, change, icon, trend }: StatsCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p
              className={`text-sm flex items-center space-x-1 ${
                trend === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              <Icon
                name={trend === "up" ? "TrendingUp" : "TrendingDown"}
                className="h-4 w-4"
              />
              <span>{change}</span>
            </p>
          </div>
          <div className="p-3 bg-blue-50 rounded-full">
            <Icon name={icon} className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
