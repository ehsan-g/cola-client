import  {useRef}from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Button } from "@mui/material";
import { changeTheme } from "../redux/features/customizerSlice";
import { ThemeType } from "../redux/types/types";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import ExAlert from "../components/settings/Alert";

  
export default function Settings() {
  const dispatch = useAppDispatch();

  const ref = useRef<HTMLDivElement>(null);

  const customize = useAppSelector((state) => state.custumize);

  const handleThemeChange = () => {
    if (!customize) return;
    if (customize.activeTheme === ThemeType.PEPSI_THEME) {
      dispatch(
        changeTheme({
          activeTheme: ThemeType.COKE_THEME,
          activeMode: "dark",
        })
      );
    } else if (customize.activeTheme === ThemeType.COKE_THEME) {
      dispatch(
        changeTheme({ activeTheme: ThemeType.PEPSI_THEME, activeMode: "light" })
      );
    }
  };
  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <Button variant="outlined" onClick={handleThemeChange}>
        Change Theme
      </Button>
      <ExAlert />
    </Box>
  );
}
