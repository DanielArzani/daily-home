import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  React.useEffect(() => {
    fetch('https://api.unsplash.com/photos/random', {
      method: 'get',
      headers: {
        'Accept-Version': 'v1',
        Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_API_ACCESS_KEY}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        if (err) console.log(err);
      });
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
