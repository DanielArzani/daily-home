import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Home, Login, Signup } from './pages/';
import theme from './themes/theme';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route
            path='/login'
            element={<Login setLoggedIn={setLoggedIn} />}
          ></Route>
          <Route path='/signup' element={<Signup />}></Route>
          {/* Default */}
          <Route path='*' element={loggedIn ? <Home /> : <Login />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
