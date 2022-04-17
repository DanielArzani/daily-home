import React from 'react';
import { Container, Typography } from '@mui/material';

import { Header, SearchBar, Shortcut, ShortcutBar } from '../components';

function Home() {
  /**-------------------------
   **         HOOKS
   *------------------------**/
  // Random Background Image
  //   React.useEffect(() => {
  //     fetch('https://api.unsplash.com/photos/random', {
  //       method: 'get',
  //       headers: {
  //         'Accept-Version': 'v1',
  //         Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_API_ACCESS_KEY}`,
  //       },
  //     })
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then((data) => {
  //         console.log(data);
  //       })
  //       .catch((err) => {
  //         if (err) console.log(err);
  //       });
  //   }, []);

  /**-------------------------
   **         STYLES
   *------------------------**/
  const styles = {};

  return (
    <>
      <Container maxWidth='lg'>
        <Typography component='h1' variant='h2' gutterBottom>
          Welcome USER
        </Typography>
      </Container>
    </>
  );
}

export default Home;
