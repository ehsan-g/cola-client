import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Avatar,
  Badge,
  Button,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import {
  changeMode,
  changeTheme,
} from "../redux/features/themeCustomization/customizerSlice";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import ExAlert from "../components/settings/Alert";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ThemeType } from "../redux/types/types";
import KeyIcon from "@mui/icons-material/Key";
import { logOut } from "../redux/features/auth/userSlice";

export default function Settings() {
  const dispatch = useAppDispatch();

  const customize = useAppSelector((state) => state.custumize);
  const { profile } = useAppSelector((state) => state.user);

  const handleModeChange = () => {
    if (!customize) return;
    dispatch(changeMode());
  };

  const handleThemeChange = () => {
    if (!customize) return;
    dispatch(changeTheme());
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="flex-end"
    >
      <Grid item sx={{ width: "100%", textAlign: "center" }}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              sx={{
                width: "60px",
                border:
                  customize.activeMode === "dark"
                    ? "1px solid white"
                    : "1px solid black",
                borderRadius: 50,
                backgroundColor:
                  customize.activeMode === "dark" ? "black" : "white",
              }}
            >
              <Grid item xs={4}>
                <Typography variant="caption" sx={{ margin: "auto" }}>
                  {profile?.permission_level}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <KeyIcon />
              </Grid>
            </Grid>
          }
          sx={{ margin: "auto" }}
        >
          <Avatar
            alt="Remy Sharp"
            src={profile?.profile_picture}
            sx={{
              width: 100,
              height: 100,
              margin: "auto",
              boxShadow: 10,
            }}
          />
        </Badge>
      </Grid>
      <Grid item>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
          }}
        >
          {customize.activeMode} mode
          <IconButton sx={{ ml: 1 }} onClick={handleModeChange} color="inherit">
            {customize.activeMode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Box>
      </Grid>
      <Grid item>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
          }}
        >
          {customize.activeTheme}
          <IconButton
            sx={{ ml: 1 }}
            onClick={handleThemeChange}
            color="inherit"
          >
            {customize.activeTheme === ThemeType.PEPSI ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Box>
        <Button onClick={() => dispatch(logOut())}>LogOut</Button>
        <ExAlert />
      </Grid>
    </Grid>
  );
}
