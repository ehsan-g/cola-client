import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import {} from "react-router-dom";
import BuildingCard from "../components/buildings/BuildingCard";

export default function Buildings() {
  return (
    <Box sx={{ pb: 7 }}>
      <CssBaseline />
      <BuildingCard />
    </Box>
  );
}
