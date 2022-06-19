import { Grid, Stack } from "@mui/material";
import Alert from "@mui/material/Alert";
import BaseCard from "../../components/base-card/BaseCard";
import PageContainer from "../../components/container/PageContainer";

const ExAlert = () => {
  return (
    <PageContainer title="Alert" description="this is Alert page">
      <Grid container spacing={0} sx={{ margin: "auto" }}>
        <Grid
          item
          xs={12}
          lg={6}
          sm={6}
          display="flex"
          alignItems="stretch"
          sx={{ margin: "auto" }}
        >
          <BaseCard title="Filled Alert">
            <Stack spacing={1}>
              {/* <h3>{data.species.name}</h3> */}
              {/* <img src={data.sprites.front_shiny} alt={data.species.name} /> */}
              <Alert variant="filled" severity="error">
                error!
              </Alert>
              <Alert variant="filled" severity="warning">
                warning!
              </Alert>
              <Alert variant="filled" severity="info">
                info!
              </Alert>
              <Alert variant="filled" severity="success">
                success!
              </Alert>
            </Stack>
          </BaseCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ExAlert;
