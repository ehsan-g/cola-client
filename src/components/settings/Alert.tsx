import {
  Grid,
  Stack,
  Button,
  IconButton,
  Collapse,
  Typography,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import BaseCard from "../../components/base-card/BaseCard";
import PageContainer from "../../components/container/PageContainer";


const ExAlert = () => {

  const [open, setOpen] = useState(true);

  return (
    <PageContainer title="Alert" description="this is Alert page">
      <Grid container spacing={0}>
        <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
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
        <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
          <BaseCard title="Action Alert">
            <Stack spacing={1}>
              <Alert variant="filled" severity="warning" onClose={() => {}}>
                success!
              </Alert>
              <Alert
                variant="filled"
                severity="info"
                action={
                  <Button color="inherit" size="small">
                    UNDO
                  </Button>
                }
              >
                success!
              </Alert>
            </Stack>
          </BaseCard>
        </Grid>
        <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
          <BaseCard title="Transition Alert">
            <Stack spacing={1}>
              <Collapse in={open}>
                <Alert
                  variant="filled"
                  severity="info"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <Typography color="primary">Hi</Typography>
                    </IconButton>
                  }
                >
                  Close me!
                </Alert>
              </Collapse>
  
            </Stack>
          </BaseCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ExAlert;
