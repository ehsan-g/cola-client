import { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { FormControlLabel, FormGroup, IconButton } from "@mui/material";
import { changeMode, changeTheme } from "../redux/features/customizerSlice";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import ExAlert from "../components/settings/Alert";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import CustomSwitch from "../components/CustomSwitch";

export default function Settings() {
  const dispatch = useAppDispatch();

  const [checked, setChecked] = useState(true);

  const customize = useAppSelector((state) => state.custumize);
  const handleThemeChange = () => {
    if (!customize) return;
    dispatch(changeMode());
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
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
        <IconButton sx={{ ml: 1 }} onClick={handleThemeChange} color="inherit">
          {customize.activeMode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </Box>
      <FormGroup>
        <FormControlLabel
          control={<CustomSwitch checked={checked} onChange={handleChange} />}
          label={customize.activeTheme}
        />
      </FormGroup>
      <CustomSwitch checked={checked} onChange={handleChange} />
      <ExAlert />
    </Box>
  );
}
