import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-8 rounded-full bg-secondary border border-border overflow-hidden group"
      aria-label="Toggle theme"
    >
      <div
        className="absolute inset-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center transition-transform duration-300 ease-out"
        style={{
          transform: theme === 'dark' ? 'translateX(22px)' : 'translateX(0)',
        }}
      >
        {theme === 'dark' ? (
          <Moon className="w-3.5 h-3.5 text-primary-foreground" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-primary-foreground" />
        )}
      </div>
    </button>
  );
};
