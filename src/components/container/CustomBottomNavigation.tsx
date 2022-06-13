import  {useRef, useState,  forwardRef}from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import SettingsIcon from '@mui/icons-material/Settings';
import BusinessIcon from '@mui/icons-material/Business';
import Paper from "@mui/material/Paper";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import {
  matchPath,
  useLocation,
  Route,
  Routes,
  Link,
} from 'react-router-dom';
import { Typography } from "@mui/material";


  function useRouteMatch(patterns: readonly string[]) {
    const { pathname } = useLocation();
  
    for (let i = 0; i < patterns.length; i += 1) {
      const pattern = patterns[i];
      const possibleMatch = matchPath(pattern, pathname);
      if (possibleMatch !== null) {
        return possibleMatch;
      }
    }
  
    return null;
  }
  

function CurrentRoute() {
  const location = useLocation();

  return (
    <Typography variant="body2" sx={{ pb: 2 }} color="text.secondary">
      Current route: {location.pathname}
    </Typography>
  );
}

export default function CustomBottomNavigation() {
  const ref = useRef<HTMLDivElement>(null);

  const routeMatch = useRouteMatch(['/inbox/:id', '/buildings', '/settings']);
  const currentTab = routeMatch?.pattern?.path;
  console.log(currentTab)

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <Routes>
          <Route path="*" element={<CurrentRoute />} />
        </Routes>
        <BottomNavigation
          showLabels
          value={currentTab=== '/buildings' ? 0: 1}
          onChange={(event, newValue) => {
            console.log(event,newValue)
          }}
        >
          <BottomNavigationAction component={Link} to="/buildings" label="Buildings" icon={<BusinessIcon />} />
          <BottomNavigationAction component={Link } to="/settings" label="Settings" icon={<SettingsIcon />} />
        </BottomNavigation>
      </Paper>
      </Box>
  );
}
