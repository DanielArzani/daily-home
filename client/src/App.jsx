import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Home, Login, Signup } from './pages/';
import theme from './themes/theme';

function App() {
  //TODO: Perhaps, I should use useContext in order to get this state to persist so I don't have to keep logging in everytime?
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //TODO: Remove all un-needed props
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          {/* Default */}
          <Route
            path='/'
            element={
              loggedIn ? (
                <Home
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  setUser={setUser}
                  user={user}
                  loading={loading}
                  setLoading={setLoading}
                />
              ) : (
                <Login
                  setLoggedIn={setLoggedIn}
                  loggedIn={loggedIn}
                  setUser={setUser}
                  user={user}
                />
              )
            }
          ></Route>
          <Route path='/signup' element={<Signup />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
