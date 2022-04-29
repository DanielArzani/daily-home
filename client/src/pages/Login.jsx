import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import login from '../utils/Login';

function Login({ user, setUser, loggedIn, setLoggedIn }) {
  /**-------------------------
   **         HOOKS
   *------------------------**/
  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
  });

  /**-------------------------
   **    EVENT HANDLERS
   *------------------------**/
  function handleChange(prop) {
    return (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  }

  const handleClickShowPassword = () => {
    setValues(() => {
      return {
        ...values,
        showPassword: !values.showPassword,
      };
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = await login(values.email, values.password);

    if (userData.status !== 'fail') {
      setUser(userData.data.user);
      setLoggedIn(true);
    } else {
      setValues({
        //TODO: Find out why email doesn't disappear
        email: '',
        password: '',
        showPassword: false,
      });
      alert('Incorrect credentials');
    }
  };

  /**-------------------------
   **         STYLES
   *------------------------**/
  const STYLES = {
    'section__form--login': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
    },
    'form--login': {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',

      margin: '16px 0',
    },
  };

  return (
    <>
      <Container sx={STYLES['section__form--login']} maxWidth='md'>
        <Typography component='h1' variant='h1'>
          Login
        </Typography>
        <Box
          component='form'
          sx={STYLES['form--login']}
          onSubmit={handleSubmit}
        >
          {/* Email */}
          <TextField
            id='login__input--email'
            label='Email'
            variant='outlined'
            type='email'
            required
            onChange={handleChange('email')}
          ></TextField>
          {/* Password */}
          <FormControl variant='outlined'>
            <InputLabel htmlFor='login__input--password'>Password</InputLabel>
            <OutlinedInput
              id='login__input--password'
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              required
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label='Password'
            />
          </FormControl>
          {/* Button */}
          <Button type='submit' variant='contained'>
            Login
          </Button>
          {/* Link to signup component */}
        </Box>
        <Link component={RouterLink} to='/signup'>
          Don't have an account? Signup!
        </Link>
      </Container>
    </>
  );
}

export default Login;
