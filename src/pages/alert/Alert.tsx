import React from "react";
import {
  Grid,
  Stack,
  Button,
  IconButton,
  Collapse,
   Card,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import BaseCard from "../../components/base-card/BaseCard";
import PageContainer from "../../components/container/PageContainer";
import CustomCard from "../../components/CustomCard";
import { changeTheme } from "../../redux/features/customizerSlice";
import {
  ThemeType
} from "../../redux/types/custumizerConstant";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";

const ExAlert = () => {
  const dispatch = useAppDispatch()

  const customize = useAppSelector((state) => state.custumize)
  
  const [open, setOpen] = React.useState(true);


  const handleThemeChange = () => {
    if (!customize) return;
    if (customize.activeTheme === ThemeType.PEPSI_THEME) {
      dispatch(changeTheme(ThemeType.COKE_THEME));
    } else if (customize.activeTheme === ThemeType.COKE_THEME) {
      dispatch(changeTheme(ThemeType.PEPSI_THEME));
    }
  };

  return (
    <PageContainer title="Alert" description="this is Alert page">
      <Grid container spacing={0}>
        <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
          <BaseCard title="Filled Alert">
            <Stack spacing={1}>
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
                      hi
                    </IconButton>
                  }
                >
                  Close me!
                </Alert>
              </Collapse>
              <Button variant="outlined" onClick={handleThemeChange}>
                Change Theme
              </Button>
              <Card elevation={10}>
                  <CustomCard name={customize.activeTheme} />
              </Card>
            </Stack>
          </BaseCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ExAlert;
