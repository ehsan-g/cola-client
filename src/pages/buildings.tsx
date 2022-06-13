import  {useRef, useState}from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import {
  } from 'react-router-dom';
import BuildingCard from "../components/buildings/BuildingCard";

  
export default function Buildings() {

  const ref = useRef<HTMLDivElement>(null);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <BuildingCard />
    </Box>
  );
}
