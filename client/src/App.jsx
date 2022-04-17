import React from 'react';
import { ThemeProvider } from '@mui/material/styles';

import Home from './pages/Home';
import theme from './themes/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
}

export default App;
