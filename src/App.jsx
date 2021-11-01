import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '@pages/HomePage';
import NotFoundPage from '@pages/NotFoundPage';
import LoginPage from '@pages/LoginPage';
import SignUpPage from '@pages/SignUpPage';
import { Header } from '@components';
import { UserProvider } from '@contexts';

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/card" component={HomePage} />
          <Route path="/cards" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/my-page" />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </UserProvider>
  );
}

export default App;
