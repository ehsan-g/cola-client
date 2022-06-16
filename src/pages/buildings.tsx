import { useEffect } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import {} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { fetchBuildings } from "../redux/features/buildings/buildingsSlice";
import BuildingCard from "../components/buildings/BuildingCard";
import { Building } from "../redux/types/types";

export default function Buildings() {
  const dispatch = useAppDispatch();

  const { buildings } = useAppSelector((state) => state.buildings);

  useEffect(() => {
    if (!buildings[0]) {
      dispatch(fetchBuildings());
    }
  }, []);

  return (
    <Box sx={{ pb: 7 }}>
      <CssBaseline />
      {buildings.map((building: Building, index: number) => (
        <BuildingCard key={index} building={building} />
      ))}
    </Box>
  );
}
