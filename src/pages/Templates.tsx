import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const Templates = () => {
  const templates = [
    {
      id: 1,
      name: "Договор на автоперевозку",
      description: "Стандартный договор для грузовых перевозок",
      category: "Основные",
      uses: 45,
    },
    {
      id: 2,
      name: "Заявка на перевозку",
      description: "Бланк заявки на транспортные услуги",
      category: "Заявки",
      uses: 32,
    },
    {
      id: 3,
      name: "ТТН (товарно-транспортная накладная)",
      description: "Документ для сопровождения груза",
      category: "Накладные",
      uses: 28,
    },
    {
      id: 4,
      name: "Акт выполненных работ",
      description: "Подтверждение оказанных услуг",
      category: "Отчеты",
      uses: 19,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Шаблоны договоров</h1>
        <Button>
          <Icon name="Plus" className="h-4 w-4 mr-2" />
          Создать шаблон
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">
                    {template.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mb-3">
                    {template.description}
                  </p>
                  <Badge variant="outline">{template.category}</Badge>
                </div>
                <Button variant="ghost" size="sm">
                  <Icon name="MoreVertical" className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Использован {template.uses} раз
                </span>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Icon name="Eye" className="h-4 w-4 mr-1" />
                    Просмотр
                  </Button>
                  <Button size="sm">
                    <Icon name="FileText" className="h-4 w-4 mr-1" />
                    Создать
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Генератор договоров</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Быстрое создание</h3>
              <p className="text-sm text-gray-600">
                Выберите тип документа и заполните основные поля
              </p>
              <Button className="w-full">
                <Icon name="Zap" className="h-4 w-4 mr-2" />
                Создать договор-заявку
              </Button>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Конструктор</h3>
              <p className="text-sm text-gray-600">
                Создайте собственный шаблон с нужными полями
              </p>
              <Button variant="outline" className="w-full">
                <Icon name="Settings" className="h-4 w-4 mr-2" />
                Открыть конструктор
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Templates;
