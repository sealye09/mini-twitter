import { create } from "zustand";
import { persist } from "zustand/middleware";

export type LightTheme = "light" | "cupcake" | "bumblebee" | "fantasy" | "autumn";
export type DarkTheme = "dark" | "business" | "coffee" | "night" | "halloween";
export type Theme = LightTheme | DarkTheme;

export type ThemeMode = "auto" | "manual";

export type ThemeState = {
  theme: Theme;
  defaultLightTheme: LightTheme;
  defaultDarkTheme: DarkTheme;
  mode: ThemeMode;
};

export const darkThemes: DarkTheme[] = ["dark", "business", "coffee", "night", "halloween"];
export const lightThemes: LightTheme[] = ["light", "cupcake", "bumblebee", "fantasy", "autumn"];

export const useTheme = create<ThemeState>()(
  persist(
    (): ThemeState => ({
      theme: "bumblebee",
      defaultLightTheme: "bumblebee",
      defaultDarkTheme: "dark",
      mode: "auto",
    }),
    {
      name: "theme-storage",
    }
  )
);

export const changeThemeMode = (mode: ThemeMode) => {
  const defaultDarkTheme = useTheme.getState().defaultDarkTheme;
  const defaultLightTheme = useTheme.getState().defaultLightTheme;

  if (mode === "auto") {
    const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? defaultDarkTheme
      : defaultLightTheme;
    useTheme.setState({ mode: mode });
    changeTheme(theme);
  } else {
    useTheme.setState({ mode: mode });
  }
};

const isDarkTheme = (theme: Theme): theme is DarkTheme => {
  return darkThemes.includes(theme as DarkTheme);
};

const isLightTheme = (theme: Theme): theme is LightTheme => {
  return lightThemes.includes(theme as LightTheme);
};

const changeDefaultLightTheme = (theme: LightTheme) => {
  useTheme.setState({ defaultLightTheme: theme });
};

const changeDefaultDarkTheme = (theme: DarkTheme) => {
  useTheme.setState({ defaultDarkTheme: theme });
};

// 更改主题
export const changeTheme = (theme: Theme) => {
  useTheme.setState({ theme });

  // 更改默认主题
  if (isDarkTheme(theme)) {
    changeDefaultDarkTheme(theme);
  } else if (isLightTheme(theme)) {
    changeDefaultLightTheme(theme);
  }
  changeHtmlTheme(useTheme.getState().theme);
};

// 初始化主题
export const themeInit = () => {
  changeTheme(useTheme.getState().theme);

  const handleSystemThemeChange = (event: MediaQueryListEvent) => {
    if (useTheme.getState().mode === "auto") {
      const theme = event.matches
        ? useTheme.getState().defaultDarkTheme
        : useTheme.getState().defaultLightTheme;
      changeTheme(theme);
    }
  };

  // 监听系统主题变化
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", handleSystemThemeChange);
};

// 更改 html 标签的 data-theme 属性
const changeHtmlTheme = (theme: Theme) => {
  // <html data-theme="light"> ... </html>
  document.documentElement.dataset.theme = theme;
};
