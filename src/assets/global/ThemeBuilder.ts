import _ from "lodash";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import components from "./Override";
import type { RootState } from "../../redux/app/store";
import { Config, ThemeType } from "../../redux/types/types";

const baseTheme = {
  palette: {
    primary: {
      main: "#1a97f5",
      light: "#e6f4ff",
      dark: "#16g82d4",
    },
    secondary: {
      main: "#1e4db7",
      light: "#ddebff",
      dark: "#173f98",
    },
    success: {
      main: "#00c292",
      light: "#ebfaf2",
      dark: "#00964b",
      contrastText: "#ffffff",
    },
    danger: {
      main: "#e46a76",
      light: "#fdf3f5",
    },
    info: {
      main: "#0bb2fb",
      light: "#a7e3f4",
    },
    error: {
      main: "#e46a76",
      light: "#fdf3f5",
      dark: "#e45a68",
    },
    warning: {
      main: "#fec90f",
      light: "#fff4e5",
      dark: "#dcb014",
      contrastText: "#ffffff",
    },
    action: {
      disabledBackground: "rgba(73,82,88,0.12)",
      hoverOpacity: 0.1,
      hover: "rgba(0, 0, 0, 0.03)",
    },
  },

  components,
};

const themesOptions = [
  {
    name: ThemeType.PEPSI,
    palette: {
      primary: {
        main: "#1a97f5",
        light: "#e6f4ff",
        dark: "#16g82d4",
      },
      secondary: {
        main: "#1e4db7",
        light: "#ddebff",
        dark: "#173f98",
      },
    },
  },
  {
    name: ThemeType.COKE,
    palette: {
      primary: {
        main: "#ff5c8e",
        light: "#fce6ed",
        dark: "#d43653",
      },
      secondary: {
        main: "#5e244d",
      },
    },
  },
];

export const BuildTheme = (config: Config) => {
  let themeOptions = themesOptions.find((theme) => theme.name === config.theme);
  const customize = useSelector((state: RootState) => state.custumize);
  const baseMode = {
    palette: {
      mode: customize.activeMode,
      background: {
        default: customize.activeMode === "dark" ? "#20232a" : "#fafbfb",
        paper: customize.activeMode === "dark" ? "#282C34" : "#ffffff",
      },
      text: {
        primary:
          customize.activeMode === "dark" ? "#e6e5e8" : "rgba(0, 0, 0, 0.87)",
        secondary: customize.activeMode === "dark" ? "#adb0bb" : "#777e89",
      },
    },
  };
  if (!themeOptions) {
    console.warn(new Error(`The theme ${config.theme} is not valid`));
    [themeOptions] = themesOptions;
  }

  console.log(config);

  const theme = createTheme(_.merge({}, baseTheme, baseMode, themeOptions, {}));
  return theme;
};
