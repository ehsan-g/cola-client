import {
  Alert,
  Button,
  Card,
  CardMedia,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#8338ec",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: 20,
    },
    "&.Mui-focused fieldset": {
      borderColor: "#8338ec",
    },
  },
});

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    console.log("hi");
  };

  return (
    <form>
      <Card
        sx={{
          position: "relative",
          height: "100vh",
          p: 0,
        }}
      >
        <Typography variant="h5" color="secondary" sx={{ textAlign: "center" }}>
          Sign In
        </Typography>
        <CardMedia
          component="img"
          sx={{ width: 100 }}
          image="/images/logo.png"
          alt="logo"
        />
        <Card
          style={{
            position: "absolute",
            color: "black",
            bottom: "10px",
            height: "80vh",
            backgroundColor: "#a09bab",
            margin: 0,
            width: "100%",
          }}
        >
          <Grid container direction="column" alignItems="center">
            <Grid item xs sx={{ marginTop: 0 }}>
              <Typography variant="subtitle2">Login</Typography>
            </Grid>
            <Grid item sx={{ marginTop: 1, width: "90%" }}>
              <CssTextField
                id="username-login"
                type="email"
                value={username}
                onChange={(e: any) => setUsername(e.target.value)}
                label="username"
                variant="outlined"
                fullWidth
                sx={{ borderRadius: "10px" }}
                required
              />
            </Grid>
            <Grid item xs={12} sx={{ marginTop: 1, width: "90%" }}>
              <TextField
                color="secondary"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                variant="outlined"
                fullWidth
                required
              />
              <Typography sx={{ direction: "rtl" }}>
                ?Forgot Password
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ marginTop: 1 }}>
              <Button variant="outlined" onClick={handleClick}>
                Login
              </Button>
            </Grid>
            {/* {error && (
                <Grid sx={{ marginTop: 2 }}>
                  <Alert variant="" severity="error">
                    {error}
                  </Alert>
                </Grid>
              )} */}
          </Grid>
          <Divider sx={{ marginTop: 4, marginBottom: 4 }}>
            <Typography variant="subtitle1"> OR </Typography>
          </Divider>
          <Grid container direction="column" alignItems="center">
            <Grid item xs={12} sx={{ width: "100%" }}>
              <Button variant="outlined" sx={{ width: "100%" }}>
                Connect Wallet
              </Button>
            </Grid>
            <Grid item xs={12} sx={{ marginTop: 10 }}>
              <Typography>
                Don&apos;t have an account? <Link to="/register">Register</Link>
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </Card>
    </form>
  );
}

export default Login;
