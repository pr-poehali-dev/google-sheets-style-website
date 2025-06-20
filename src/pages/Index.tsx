import React from "react";
import StatsCard from "@/components/StatsCard";
import RecentOrders from "@/components/RecentOrders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Index = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Панель управления
          </h1>
          <p className="text-gray-600 mt-1">Обзор операций и показателей</p>
        </div>
        <Button size="lg">
          <Icon name="Plus" className="h-5 w-5 mr-2" />
          Новая заявка
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Активные перевозки"
          value="23"
          change="+12%"
          icon="Truck"
          trend="up"
        />
        <StatsCard
          title="Выполнено за месяц"
          value="156"
          change="+8%"
          icon="CheckCircle"
          trend="up"
        />
        <StatsCard
          title="Средняя загрузка"
          value="87%"
          change="+2%"
          icon="BarChart"
          trend="up"
        />
        <StatsCard
          title="Выручка месяца"
          value="2.4М ₽"
          change="+15%"
          icon="Ruble"
          trend="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentOrders />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Icon name="Users" className="h-5 w-5" />
                <span>Водители</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">На маршруте</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Свободны</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">На отдыхе</span>
                  <span className="font-medium">3</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Icon name="FileText" className="h-5 w-5" />
                <span>Быстрые действия</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Icon name="Plus" className="h-4 w-4 mr-2" />
                Создать договор
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Icon name="Calendar" className="h-4 w-4 mr-2" />
                Планировать маршрут
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Icon name="Calculator" className="h-4 w-4 mr-2" />
                Рассчитать стоимость
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
