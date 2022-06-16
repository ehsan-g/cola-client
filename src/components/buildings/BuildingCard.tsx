import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { Building } from "../../redux/types/types";

export default function BuildingCard({ building }: { building: Building }) {
  return (
    <Grid container>
      <Card sx={{ display: "flex" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {building.building_name}
            </Typography>
            <Typography color="text.secondary" component="div">
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
    </Grid>
  );
}
