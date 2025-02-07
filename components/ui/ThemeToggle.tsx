import { Toggle } from "@/components/ui/toggle";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Toggle
      pressed={theme === "dark"}
      onPressedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-full p-2 dark:bg-gray-900 bg-gray-200"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-orange-300" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </Toggle>
  );
}
