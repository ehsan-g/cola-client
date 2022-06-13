import { BuildTheme } from "./ThemeBuilder";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/app/store";

const ColaTheme = () => {
  const customize = useSelector((state: RootState) => state.custumize);

  const theme = BuildTheme({
    theme: customize.activeTheme,
  });

  return theme;
};
export default ColaTheme;
