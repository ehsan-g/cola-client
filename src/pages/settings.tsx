import { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { IconButton } from "@mui/material";
import {
  changeMode,
  changeTheme,
} from "../redux/features/themCustomization/customizerSlice";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import ExAlert from "../components/settings/Alert";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ThemeType } from "../redux/types/types";

export default function Settings() {
  const dispatch = useAppDispatch();

  const customize = useAppSelector((state) => state.custumize);

  const handleModeChange = () => {
    if (!customize) return;
    dispatch(changeMode());
  };

  const handleThemeChange = () => {
    if (!customize) return;
    dispatch(changeTheme());
  };

  return (
    <Box sx={{ pb: 7 }}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 1,
        }}
      >
        {customize.activeMode} mode
        <IconButton sx={{ ml: 1 }} onClick={handleModeChange} color="inherit">
          {customize.activeMode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 1,
        }}
      >
        {customize.activeTheme}
        <IconButton sx={{ ml: 1 }} onClick={handleThemeChange} color="inherit">
          {customize.activeTheme === ThemeType.PEPSI ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </Box>
      <ExAlert />
    </Box>
  );
}
