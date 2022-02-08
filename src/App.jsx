import React from 'react';
import { Header } from '@components';
import { UserProvider, ModalsProvider } from '@contexts';
import Router from './routes/Router';

function App() {
  return (
    <UserProvider>
      <ModalsProvider>
        <Header />
        <Router />
      </ModalsProvider>
    </UserProvider>
  );
}

export default App;
