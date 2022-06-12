import { BuildTheme } from "../../../assets/global/Theme-variable";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/app/store";

const ThemeSettings = () => {
  const customize = useSelector((state: RootState) => state.custumize);

  const theme = BuildTheme({
    theme: customize.activeTheme,
  });

  return theme;
};
export default ThemeSettings;
