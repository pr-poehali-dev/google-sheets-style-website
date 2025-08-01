import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import Icon from "@/components/ui/icon";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Главная", href: "/main", icon: "Home" },
    { name: "Данные", href: "/", icon: "Database" },
    { name: "Расписание", href: "/schedule", icon: "Calendar" },
    { name: "Договоры", href: "/templates", icon: "FileText" },
    { name: "Водители", href: "/drivers", icon: "Users" },
    { name: "Организации", href: "/legal-entities", icon: "Building2" },
    { name: "Склады", href: "/warehouses", icon: "Warehouse" },
    { name: "Тарифы", href: "/tariffs", icon: "Calculator" },
    { name: "Помощь", href: "/help", icon: "HelpCircle" },
  ];

  return (
    <aside className="fixed left-0 top-16 h-full w-44 bg-white border-r border-gray-200 z-40">
      <nav className="p-3 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center space-x-2 px-2 py-2 rounded-lg text-sm transition-colors",
              location.pathname === item.href
                ? "bg-blue-50 text-blue-700 font-medium"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
            )}
          >
            <Icon name={item.icon} className="h-4 w-4" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
