import Header from "@/components/Header";
import {
  DarkTheme,
  LightTheme,
  Theme,
  changeTheme,
  changeThemeMode,
  darkThemes,
  lightThemes,
  useTheme,
} from "@/hooks/useTheme";
import { cn } from "@/libs/utils";
import { useEffect, useState } from "react";

const ThemesView = () => {
  const themeMode = useTheme((state) => state.mode);
  const defaultLightTheme = useTheme((state) => state.defaultLightTheme);
  const defaultDarkTheme = useTheme((state) => state.defaultDarkTheme);


  // 为什么要用 useState
  // 使用 zustand 和 persist 时，会出现 Prop className did not match 的错误
  const [darkTheme, setDarkTheme] = useState<DarkTheme>();
  const [lightTheme, setLightTheme] = useState<LightTheme>();

  const handleThemeChange = (theme: Theme) => {
    // 判断theme的类型
    changeTheme(theme);
    changeThemeMode("manual");
  };

  useEffect(() => {
    setDarkTheme(defaultDarkTheme);
    setLightTheme(defaultLightTheme);
  }, [defaultDarkTheme, defaultLightTheme]);

  return (
    <div className="themes min-h-screen">
      <Header
        label="Themes"
        showBackArrow
      />
      <div className="p-4 flex flex-col justify-start items-start gap-4">
        <div>
          <label className="label cursor-pointer p-0 flex gap-2">
            <span className="label-text">Change with system</span>
            <input
              type="checkbox"
              className="toggle toggle-primary rounded-full"
              checked={themeMode === "auto"}
              onChange={(e) => changeThemeMode(e.target.checked ? "auto" : "manual")}
            />
          </label>
        </div>
        <div className="flex flex-col gap-1">
          <h2>Dark Themes</h2>
          <div className="flex flex-wrap gap-2">
            {darkThemes.map((theme) => (
              <button
                key={theme}
                className={cn(
                  "btn capitalize rounded-full min-w-fit shadow-xl",
                  darkTheme === theme ? "btn-primary" : "btn-outline"
                )}
                onClick={() => handleThemeChange(theme)}
              >
                {theme}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h2>Light Themes</h2>
          <div className="flex flex-wrap gap-2">
            {lightThemes.map((theme) => (
              <button
                key={theme}
                className={cn(
                  "btn capitalize rounded-full min-w-fit shadow-xl",
                  lightTheme === theme ? "btn-primary" : "btn-outline"
                )}
                onClick={() => handleThemeChange(theme)}
              >
                {theme}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemesView;
