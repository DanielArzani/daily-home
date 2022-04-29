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

import signup from '../utils/Signup';

function Signup() {
  /**-------------------------
   **         HOOKS
   *------------------------**/
  const [values, setValues] = useState({
    username: '',
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
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    signup(values.username, values.email, values.password);
  };

  /**-------------------------
   **         STYLES
   *------------------------**/
  const STYLES = {
    'section__form--signup': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
    },
    'form--signup': {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',

      margin: '1rem 0',
    },
  };
  return (
    <>
      <Container sx={STYLES['section__form--signup']} maxWidth='md'>
        <Typography component='h1' variant='h1'>
          Signup
        </Typography>
        <Box
          component='form'
          sx={STYLES['form--signup']}
          onSubmit={handleSubmit}
        >
          {/* Username */}
          <TextField
            autoComplete='off'
            id='signup__input--username'
            label='Username'
            variant='outlined'
            type='text'
            required
            value={values.username}
            onChange={handleChange('username')}
          ></TextField>
          {/* Email */}
          <TextField
            required
            id='signup__input--email'
            label='Email'
            variant='outlined'
            type='email'
            value={values.email}
            onChange={handleChange('email')}
          ></TextField>
          {/* Password */}
          <FormControl required variant='outlined'>
            <InputLabel htmlFor='signup__input--password'>Password</InputLabel>
            <OutlinedInput
              id='signup__input--password'
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
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
            Signup
          </Button>
        </Box>
        {/* Link to signup component */}
        <Link component={RouterLink} to='/'>
          Already have an account? Login!
        </Link>
      </Container>
    </>
  );
}

export default Signup;
