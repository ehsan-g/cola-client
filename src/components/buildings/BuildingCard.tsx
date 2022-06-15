import { useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ColaTheme from "../../assets/global/ColaTheme";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { fetchBuildings } from "../../redux/features/buildings/buildingsSlice";
import { Grid } from "@mui/material";
import { Building, CompanyType } from "../../redux/types/types";

export default function BuildingCard() {
  const dispatch = useAppDispatch();

  const { buildings, error, status } = useAppSelector(
    (state) => state.buildings
  );
  const customize = useAppSelector((state) => state.custumize);

  useEffect(() => {
    if (!buildings[0]) {
      dispatch(fetchBuildings());
    }
  }, []);

  return (
    <Grid container>
      {buildings
        .filter((b: Building) => b.company === CompanyType.COKE)
        .map((building: Building, index: number) => (
          <Card key={index} sx={{ display: "flex" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="div" variant="h5">
                  {building.building_name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {building.address?.address}
                </Typography>
              </CardContent>
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
