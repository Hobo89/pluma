import {
  createContext,
  useContext,
  useEffect,
  type ReactNode,
} from "react";

/**
 * Launch theme lock: warm ivory light only. Stored/system dark preference is
 * not applied so lower sections cannot flip to dark-green under the ivory hero.
 * Dark-theme UI is deferred; privacy copy about theme storage is an H05 item.
 */
type Theme = "light";

type ThemeContextValue = {
  theme: Theme;
  isDark: false;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyLightTheme() {
  document.documentElement.classList.remove("dark");
  document.documentElement.style.colorScheme = "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    applyLightTheme();
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme: "light",
        isDark: false,
        toggleTheme: () => {
          /* Dark theme deferred for launch. */
        },
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
