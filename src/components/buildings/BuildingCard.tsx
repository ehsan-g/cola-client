import { useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import ColaTheme from "../../assets/global/ColaTheme";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { fetchBuildings } from "../../redux/features/buildings/buildingsSlice";
import { CircularProgress, Grid } from "@mui/material";
import { Building } from "../../redux/types/types";

export default function BuildingCard() {
  const theme = ColaTheme();
  const dispatch = useAppDispatch();

  const { buildings, error, status } = useAppSelector(
    (state) => state.buildings
  );

  useEffect(() => {
    if (!buildings[0]) {
      dispatch(fetchBuildings());
    }
  }, []);

  return (
    <Grid container>
      {buildings.map((building: Building, index: number) => (
        <Card key={index} sx={{ display: "flex" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                {/* {building.building_name} */}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                Mac Millers Mac Millers
              </Typography>
            </CardContent>
            <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
              <IconButton aria-label="previous">
                {theme.direction === "rtl" ? (
                  <SkipNextIcon />
                ) : (
                  <SkipPreviousIcon />
                )}
              </IconButton>
              <IconButton aria-label="play/pause">
                <PlayArrowIcon sx={{ height: 38, width: 38 }} />
              </IconButton>
              <IconButton aria-label="next">
                {theme.direction === "rtl" ? (
                  <SkipPreviousIcon />
                ) : (
                  <SkipNextIcon />
                )}
              </IconButton>
            </Box>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={building.image?.image}
            alt="Live from space album cover"
          />
        </Card>
      ))}
    </Grid>
  );
}
