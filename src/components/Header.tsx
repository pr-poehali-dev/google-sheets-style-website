import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useTheme } from "@/contexts/ThemeContext";
import Icon from "@/components/ui/icon";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 z-50">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon
              name="Truck"
              className="h-8 w-8 text-blue-600 dark:text-blue-400"
            />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              ТрансЛогистика
            </h1>
          </div>
        </div>

        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Icon
              name="Search"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500"
            />
            <Input
              placeholder="Поиск по заявкам, водителям..."
              className="pl-10 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button variant="ghost" size="icon">
            <Icon name="Bell" className="h-5 w-5 dark:text-gray-300" />
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="dark:bg-gray-700 dark:text-white">
              АД
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      <Icon
        name={theme === "light" ? "Moon" : "Sun"}
        className="h-5 w-5 dark:text-gray-300"
      />
    </Button>
  );
};

export default Header;
