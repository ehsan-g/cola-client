import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid } from "@mui/material";
import { Building } from "../../redux/types/types";
import { useNavigate } from "react-router-dom";

export default function BuildingCard({ building }: { building: Building }) {
  const navigate = useNavigate();

  return (
    <Grid container>
      <Card
        sx={{
          width: "100%",
        }}
      >
        <CardActionArea onClick={() => navigate(`/buildings/${building.id}`)}>
          <Grid container>
            <Grid item>
              <CardMedia
                component="img"
                sx={{
                  maxWidth: 80,
                  borderRadius: 4,
                  border: "1px solid black",
                }}
                image={building.image?.image}
                alt="building"
              />
            </Grid>
            <Grid item>
              <CardContent>
                <Typography component="div" variant="h5">
                  {building.building_name}
                </Typography>
                <Typography color="text.secondary" component="div">
                  {building.address?.address}
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
