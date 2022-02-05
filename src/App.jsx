import React from 'react';
import { Header } from '@components';
import { UserProvider } from '@contexts';
import Router from './routes/Router';

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Header />
        <Router />
      </div>
    </UserProvider>
  );
}

export default App;
