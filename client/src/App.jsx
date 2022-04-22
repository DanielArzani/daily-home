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
          <Route path='/' element={<Login setLoggedIn={setLoggedIn} />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          {/* <Route path="/" element={<About/>}></Route>
          {loggedIn ? <Home /> : <Login />}
          <Login /> */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
