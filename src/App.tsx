import { useRoutes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import ThemeSettings from './layout/full-layout/customizer/ThemeSettings';
import Router from './routes/Router';



function App() {
  const routing = useRoutes(Router);
  const theme = ThemeSettings();
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        {routing}
    </ThemeProvider>
  );
}

export default App;
