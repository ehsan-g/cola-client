import { useEffect } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import {} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { fetchBuildings } from "../redux/features/buildings/buildingsSlice";
import BuildingCard from "../components/buildings/BuildingCard";
import { Building } from "../redux/types/types";
import { fetchProfile } from "../redux/features/auth/userSlice";

export default function Buildings() {
  const dispatch = useAppDispatch();

  const { status: buildingStatus, buildings } = useAppSelector(
    (state) => state.buildings
  );
  const { profile, status: userStatus } = useAppSelector((state) => state.user);

  useEffect(() => {
    console.log(buildingStatus, profile);
    if (buildingStatus !== "succeeded" && profile) {
      dispatch(fetchBuildings());
    } else if (!profile) {
      dispatch(fetchProfile());
    }
  }, [profile, userStatus]);

  return (
    <Box sx={{ pb: 7 }}>
      <CssBaseline />
      {buildings.map((building: Building, index: number) => (
        <BuildingCard key={index} building={building} />
      ))}
    </Box>
  );
}
