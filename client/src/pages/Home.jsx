import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';

import { Header, SearchBar, Shortcut, ShortcutBar } from '../components';

function Home() {
  /**-------------------------
   **         HOOKS
   *------------------------**/
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ prop1: 'a' });
  // Random Background Image
  useEffect(() => {
    async function getUserAndBackground() {
      try {
        // const responseImage = await fetch(
        //   'https://api.unsplash.com/photos/random',
        //   {
        //     method: 'get',
        //     headers: {
        //       'Accept-Version': 'v1',
        //       Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_API_ACCESS_KEY}`,
        //     },
        //   }
        // );

        // used so I don't use up the limit for unsplash api calls
        const responseImage = fetch(
          'https://jsonplaceholder.typicode.com/todos/1'
        );

        //TODO: Add this into login component and replace with random bible verse api call
        const responseLogin = fetch('/api/v1/users/login', {
          method: 'post',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'daniel@gmail.com',
            password: 'password',
          }),
        });

        //! Testing if context works
        const responseGetUsers = fetch('/api/v1/users');

        const result = await Promise.all([
          responseLogin,
          responseImage,
          responseGetUsers,
        ]).then((values) => Promise.all(values.map((r) => r.json())));

        const {
          data: { user },
        } = result[0];

        setUser(user);
        console.log(result[2]);
        setLoading(false);
      } catch (error) {
        if (error) console.log(error);
      }
    }
    getUserAndBackground();
  }, []);

  /**-------------------------
   **       FUNCTIONS
   *------------------------**/
  if (loading) {
    return <div>loading...</div>;
  }

  /**-------------------------
   **         STYLES
   *------------------------**/
  const styles = {};

  return (
    <>
      <Container maxWidth='lg'>
        <Typography component='h1' variant='h2' gutterBottom>
          Welcome {user.username}
        </Typography>
      </Container>
    </>
  );
}

export default Home;
