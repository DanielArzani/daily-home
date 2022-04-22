import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
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

function Signup() {
  /**-------------------------
   **         HOOKS
   *------------------------**/
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });

  /**-------------------------
   **    EVENT HANDLERS
   *------------------------**/
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
    'signup__input-wrapper': {
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
        <Box sx={STYLES['signup__input-wrapper']}>
          {/* Username */}
          <TextField
            id='signup__input--username'
            label='Username'
            variant='outlined'
          ></TextField>
          {/* Email */}
          <TextField
            id='signup__input--email'
            label='Email'
            variant='outlined'
          ></TextField>
          {/* Password */}
          <FormControl variant='outlined'>
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
          {/* Link to signup component */}
        </Box>
        <Link component={RouterLink} to='/login'>
          Already have an account? Login!
        </Link>
      </Container>
    </>
  );
}

export default Signup;
